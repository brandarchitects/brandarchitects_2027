import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas/contact";

/**
 * Kontaktformular-Endpunkt.
 * - Nimmt JSON (mit JavaScript) oder Formular-Daten (ohne JavaScript) entgegen
 * - Validiert serverseitig (Zod); Fehler feldgenau zurück
 * - Honeypot gefüllt oder < 3 s → antwortet "Erfolg", sendet aber nichts (Bots bekommen kein Signal)
 * - Versand über Resend; Erfolg erst nach Bestätigung
 * - Keine Inhalte in Logs. Nur Fehlercodes.
 * Umgebungsvariablen: RESEND_API_KEY, CONTACT_TO (Zielpostfach), CONTACT_FROM (verifizierte Absenderadresse)
 */
export const runtime = "nodejs";

const TOPIC_LABELS: Record<string, string> = { brand: "Markenprojekt", web: "Website und Digital Branding", ai: "KI und digitale Produkte", assessment: "Standortbestimmung", open: "Noch offen" };

export async function POST(req: Request) {
  const isJson = req.headers.get("content-type")?.includes("application/json");
  let raw: Record<string, unknown>;
  if (isJson) {
    raw = await req.json();
  } else {
    // Ohne JavaScript: Checkboxen «topics» kommen mehrfach → getAll statt fromEntries
    const fd = await req.formData();
    raw = { ...Object.fromEntries(fd.entries()), topics: fd.getAll("topics") };
  }
  const wantsJson = isJson || req.headers.get("accept")?.includes("application/json");

  const respond = (ok: boolean, status = ok ? 200 : 500, errors?: Record<string, string>) => {
    if (wantsJson) return NextResponse.json({ ok, errors }, { status });
    return NextResponse.redirect(new URL(`/kontakt/?status=${ok ? "ok" : "error"}`, req.url), 303);
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) errors[String(issue.path[0])] = issue.message;
    return wantsJson ? NextResponse.json({ ok: false, errors }, { status: 422 }) : respond(false);
  }
  const d = parsed.data;
  const topics = d.topics?.map((k) => TOPIC_LABELS[k]).join(", ");

  // Spam-Schutz (still): Honeypot oder zu schnell → Erfolg vortäuschen, nichts senden
  if (d.website || (d.startedAt && Date.now() - d.startedAt < 3000)) return respond(true);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM ?? "Brand Architects Website <website@brandarchitects.ch>";
  if (!apiKey || !to) {
    console.error("contact: RESEND_API_KEY oder CONTACT_TO fehlt");
    return respond(false);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `Anfrage: ${d.company}${topics ? ` – ${topics}` : ""}`,
      text: [
        `Name: ${d.name}`, `E-Mail: ${d.email}`, `Unternehmen: ${d.company}`,
        `Interessenfelder: ${topics || "–"}`, `Zeitraum: ${d.timeframe || "–"}`, "",
        "Was steht an:", d.message,
      ].join("\n"),
    });
    if (error) {
      console.error("contact: resend error", error.name);
      return respond(false);
    }
    return respond(true);
  } catch (e) {
    console.error("contact: send failed", e instanceof Error ? e.name : "unknown");
    return respond(false);
  }
}
