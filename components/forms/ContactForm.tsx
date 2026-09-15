"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { contactTopics } from "@/lib/schemas/contact";

/**
 * Modul 9b: Kontaktformular mit allen Zuständen (Struktur-Briefing Kap. 5).
 * Client-Komponente: Zustände (Senden, Erfolg, Fehler) und feldgenaue Fehlermeldungen.
 * Progressive Enhancement: Ohne JavaScript wird das Formular normal per POST an /api/contact
 * gesendet; die Route antwortet dann mit Redirect auf /kontakt/?status=ok|error.
 */
type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

export function ContactForm({ initialTopic, initialStatus }: { initialTopic?: string; initialStatus?: string }) {
  // Vorbelegung über ?thema= (Briefing Kap. 8.7): ein Interessenfeld ist angehakt, alle bleiben editierbar
  const preselected = contactTopics.includes(initialTopic as never) ? initialTopic : undefined;
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(initialStatus === "ok" ? "ok" : initialStatus === "error" ? "error" : "idle");
  const [errors, setErrors] = useState<Errors>({});
  // Zeitstempel nach dem Laden – Basis für die Zeitprüfung gegen Bots (ohne JS entfällt sie, Honeypot bleibt)
  const startedAt = useRef<number>(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrors({});
    const form = e.currentTarget;
    const fd = new FormData(form);
    // Interessenfelder sind Checkboxen mit gleichem Namen → alle Werte als Array übernehmen
    const data: Record<string, FormDataEntryValue | FormDataEntryValue[] | number> = { ...Object.fromEntries(fd.entries()), topics: fd.getAll("topics"), startedAt: startedAt.current };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
      const json = await res.json();
      if (res.ok && json.ok) {
        setStatus("ok");
        track("contact_submit_success", { topics: (data.topics as string[]).join(",") });
        form.reset();
      } else if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
      } else {
        setStatus("error");
        track("contact_submit_error");
      }
    } catch {
      setStatus("error");
      track("contact_submit_error");
    }
  }

  if (status === "ok") return <p role="status" className="max-w-measure text-lg">{t("success")}</p>;

  const field = "mt-2 w-full border border-line px-3 py-2";
  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-error`} className="mt-1 text-sm" role="alert">{t(`validation.${errors[k]}`)}</p>;

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} noValidate className="max-w-xl">
      <div className="grid gap-6">
        <label>{t("name")}<input name="name" required autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{err("name")}</label>
        <label>{t("email")}<input name="email" type="email" required autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{err("email")}</label>
        <label>{t("company")}<input name="company" required autoComplete="organization" className={field} aria-invalid={!!errors.company} aria-describedby={errors.company ? "company-error" : undefined} />{err("company")}</label>
        <fieldset>
          <legend>{t("topics_label")}</legend>
          <p id="topics-hint" className="mt-1 text-sm text-muted">{t("topics_hint")}</p>
          <div className="mt-3 grid gap-2" role="group" aria-describedby="topics-hint">
            {contactTopics.map((k) => (
              <label key={k} className="flex items-center gap-3">
                <input type="checkbox" name="topics" value={k} defaultChecked={k === preselected} className="h-4 w-4" />
                {t(`topics.${k}`)}
              </label>
            ))}
          </div>
        </fieldset>
        <label>{t("message")}<textarea name="message" required rows={6} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />{err("message")}</label>
        <label>{t("timeframe")}<input name="timeframe" className={field} /></label>
        {/* Honeypot: für Menschen unsichtbar, Bots füllen es aus */}
        <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="text-sm text-muted">{t("privacyNote")}</p>
        {status === "error" && <p role="alert">{t("error")}</p>}
        <button type="submit" disabled={status === "sending"} className="rounded-full bg-ink px-5 py-3 text-paper disabled:opacity-60">
          {status === "sending" ? t("submitting") : t("submit")}
        </button>
      </div>
    </form>
  );
}
