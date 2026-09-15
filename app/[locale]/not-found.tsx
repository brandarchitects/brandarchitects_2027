import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Arrow } from "@/components/ui/Arrow";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="site py-[var(--spacing-section)]">
      <span className="index text-muted" aria-hidden="true">404</span>
      <h1 className="h1 mt-6 max-w-[16ch]">{t("title")}</h1>
      <p className="lead mt-6 max-w-[var(--max-width-measure)] text-muted">{t("text")}</p>
      <Link href="/" className="btn mt-10">{t("home")}<Arrow /></Link>
    </section>
  );
}
