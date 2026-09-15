"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { contactTopics } from "@/lib/schemas/contact";
import { Arrow } from "@/components/ui/Arrow";

/**
 * Modul 9b: Kontaktformular mit allen Zuständen (Struktur-Briefing Kap. 5).
 * Client-Komponente: Zustände (Senden, Erfolg, Fehler) und feldgenaue Fehlermeldungen.
 * Progressive Enhancement: Ohne JavaScript wird das Formular normal per POST an /api/contact
 * gesendet; die Route antwortet dann mit Redirect auf /kontakt/?status=ok|error.
 * Gestaltung: Felder als Linien (Haarlinie unten), Fokus wandert zum Akzent; Interessenfelder als Kästchen.
 */
type Errors = Partial<Record<"name" | "email" | "company" | "message", string>>;

export function ContactForm({ initialTopic, initialStatus }: { initialTopic?: string; initialStatus?: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(initialStatus === "ok" ? "ok" : initialStatus === "error" ? "error" : "idle");
  const [errors, setErrors] = useState<Errors>({});
  // Vorbelegung über ?thema= (Briefing Kap. 8.7): ein Interessenfeld ist angehakt, alle bleiben editierbar
  const preselected = contactTopics.includes(initialTopic as never) ? initialTopic : undefined;
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

  if (status === "ok") return <p role="status" className="lead rule-strong max-w-[var(--max-width-measure)] pt-5">{t("success")}</p>;

  const labelCls = "block text-sm font-medium";
  const err = (k: keyof Errors) => errors[k] && <p id={`${k}-error`} className="mt-2 body-sm text-error" role="alert">{t(`validation.${errors[k]}`)}</p>;
  const input = (k: keyof Errors, extra: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input id={k} name={k} className="field" aria-invalid={!!errors[k]} aria-describedby={errors[k] ? `${k}-error` : undefined} {...extra} />
  );

  return (
    <form method="post" action="/api/contact" onSubmit={onSubmit} noValidate className="max-w-xl">
      <div className="grid gap-8">
        <div><label htmlFor="name" className={labelCls}>{t("name")}</label>{input("name", { required: true, autoComplete: "name" })}{err("name")}</div>
        <div><label htmlFor="email" className={labelCls}>{t("email")}</label>{input("email", { type: "email", required: true, autoComplete: "email" })}{err("email")}</div>
        <div><label htmlFor="company" className={labelCls}>{t("company")}</label>{input("company", { required: true, autoComplete: "organization" })}{err("company")}</div>
        <div>
          <label htmlFor="message" className={labelCls}>{t("message")}</label>
          <textarea id="message" name="message" required rows={5} className="field resize-y" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {err("message")}
        </div>
        <fieldset className="rule pt-5">
          <legend className="float-left mb-1 text-sm font-medium">{t("topics_label")}</legend>
          <p id="topics-hint" className="clear-left body-sm text-muted">{t("topics_hint")}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-describedby="topics-hint">
            {contactTopics.map((k) => (
              <label key={k} className="flex cursor-pointer items-center gap-3">
                <input type="checkbox" name="topics" value={k} defaultChecked={k === preselected} className="check" />
                <span>{t(`topics.${k}`)}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div><label htmlFor="timeframe" className={labelCls}>{t("timeframe")}</label><input id="timeframe" name="timeframe" className="field" /></div>
        {/* Honeypot: für Menschen unsichtbar, Bots füllen es aus */}
        <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <p className="body-sm text-muted">{t("privacyNote")}</p>
        {status === "error" && <p role="alert" className="rule-strong pt-4 text-error">{t("error")}</p>}
        <div>
          <button type="submit" disabled={status === "sending"} className="btn btn-ink">
            {status === "sending" ? t("submitting") : t("submit")}<Arrow />
          </button>
        </div>
      </div>
    </form>
  );
}
