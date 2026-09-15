import { getCases, getFaqs, getServices, getSiteSettings } from "@/lib/content";
import { SITE_URL } from "@/lib/seo/jsonld";

/**
 * /llms.txt – kompakte, maschinenlesbare Zusammenfassung der Website für KI-Systeme (llmstxt.org).
 * Wird aus denselben Inhalten erzeugt wie die Seiten; nichts wird doppelt gepflegt.
 */
export const revalidate = 3600;

export async function GET() {
  const locale = "de";
  const [settings, services, cases, faqs] = await Promise.all([getSiteSettings(locale), getServices(locale), getCases(locale), getFaqs(locale)]);
  const lines = [
    `# ${settings.brandName}`, "",
    `> ${settings.llmSummary ?? settings.tagline}`, "",
    `Sitz: ${settings.zip} ${settings.city}, Schweiz. Einzugsgebiet: ${settings.areaServed.join(", ")}. Sprache: Deutsch (Schweiz).`, "",
    "## Leistungen", ...services.map((s) => `- [${s.title}](${SITE_URL}/leistungen/${s.slug}/): ${s.teaser}`), "",
    "## Arbeiten", ...cases.map((c) => `- [${c.client}](${SITE_URL}/arbeiten/${c.slug}/): ${c.task} – ${c.contribution}`), "",
    "## Weitere Seiten",
    `- [Standortbestimmung](${SITE_URL}/standortbestimmung/)`, `- [Zusammenarbeit](${SITE_URL}/zusammenarbeit/)`, `- [Über uns](${SITE_URL}/ueber-uns/)`, `- [Kontakt](${SITE_URL}/kontakt/)`, "",
    "## Häufige Fragen", ...faqs.map((f) => `- ${f.question} ${f.answer}`),
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
