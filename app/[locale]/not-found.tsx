import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="mx-auto max-w-7xl px-6 py-section">
      <h1 className="text-4xl font-semibold">{t("title")}</h1>
      <p className="mt-4 text-muted">{t("text")}</p>
      <Link href="/" className="mt-8 inline-block underline">{t("home")}</Link>
    </section>
  );
}
