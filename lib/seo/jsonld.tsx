import type { Faq, SiteSettings } from "@/lib/content/types";

/**
 * Strukturierte Daten (Schema.org, JSON-LD). Vorgaben: docs/SEO.md und Briefing Kap. 8.10.
 * - Organization + ProfessionalService global (Layout)
 * - FAQPage nur dort, wo FAQ sichtbar auf der Seite stehen
 * - Article/CreativeWork pro Case
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brandarchitects.ch";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrganizationJsonLd({ settings }: { settings: SiteSettings }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: settings.brandName,
        legalName: settings.companyName,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        email: settings.email || undefined,
        telephone: settings.phone || undefined,
        sameAs: settings.linkedin ? [settings.linkedin] : undefined,
        founder: { "@type": "Person", name: settings.contactPerson },
        address: { "@type": "PostalAddress", streetAddress: settings.street, postalCode: settings.zip, addressLocality: settings.city, addressCountry: "CH" },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: settings.brandName,
        description: settings.tagline,
        url: SITE_URL,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        areaServed: settings.areaServed.map((name) => ({ "@type": "AdministrativeArea", name })),
        address: { "@type": "PostalAddress", postalCode: settings.zip, addressLocality: settings.city, addressCountry: "CH" },
        knowsAbout: ["Markenstrategie", "Positionierung", "Corporate Design", "Rebranding", "Digital Branding", "Webdesign", "KI für Branding und Marketing"],
      },
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: settings.brandName, publisher: { "@id": `${SITE_URL}/#organization` }, inLanguage: "de-CH" },
    ],
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  if (!faqs.length) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      }}
    />
  );
}

export function CaseJsonLd({ title, client, url, description, image, year }: { title: string; client: string; url: string; description: string; image?: string; year: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: title,
        about: client,
        url,
        description,
        image,
        dateCreated: year,
        creator: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "de-CH",
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: item.url })),
      }}
    />
  );
}
