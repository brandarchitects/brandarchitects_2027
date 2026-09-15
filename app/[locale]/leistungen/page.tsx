import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getServices, getSiteSettings } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { ServiceModule } from "@/components/modules/ServiceModule";

/** Leistungsübersicht: drei Bereiche + KI-Zeile + Standortbestimmung (Briefing Kap. 8.2). */
export async function generateMetadata({ params }: PageProps<"/[locale]/leistungen">): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings(locale as Locale);
  return buildMetadata({ locale: locale as Locale, path: "/leistungen/", title: `Markenstrategie, Design und digitale Auftritte – ${settings.brandName}`, settings });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/leistungen">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [services, t, tf] = await Promise.all([getServices(locale as Locale), getTranslations("nav"), getTranslations("footer")]);
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="text-4xl font-semibold">{t("services")}</h1>
      <div className="mt-12 grid gap-10 md:grid-cols-2">{services.map((s) => <ServiceModule key={s._id} title={s.title} text={s.teaser} href={`/leistungen/${s.slug}/`} />)}</div>
      <p className="mt-16"><Link href="/standortbestimmung/" className="underline">{tf("assessment")}</Link></p>
    </section>
  );
}
