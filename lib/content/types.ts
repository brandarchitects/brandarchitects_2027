import type { PortableTextBlock } from "@portabletext/types";

/**
 * TypeScript-Typen der Inhalte, wie sie aus lib/content/index.ts kommen.
 * Später durch `npm run typegen` (sanity typegen) ersetzbar; bis dahin von Hand gepflegt
 * und an die Schemas in sanity/schemaTypes gebunden.
 */
export type ContactTopic = "brand" | "web" | "ai" | "assessment" | "open";

export interface SanityImage {
  asset?: { _ref: string; url?: string; metadata?: { lqip?: string; dimensions?: { width: number; height: number } } };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface Figure {
  image: SanityImage;
  alt: string;
  caption: string;
}

export interface Quote {
  text: string;
  name: string;
  role?: string;
  company?: string;
}

export interface Seo {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface CaseSummary {
  _id: string;
  slug: string;
  title: string;
  client: string;
  task: string;
  contribution: string;
  heroImage: Figure;
  featured: boolean;
  order?: number;
  origin: "brand-architects" | "former-agency";
  formerAgency?: string;
  year: string;
  services: { title: string; slug: string }[];
}

export interface Case extends CaseSummary {
  situation: string;
  question: string;
  assignment: string;
  decision: string;
  preserved: string;
  application?: PortableTextBlock[];
  result?: string;
  quote?: Quote;
  role: string;
  partners?: string[];
  contactTopic: ContactTopic;
  relatedCase?: CaseSummary;
  seo?: Seo;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export interface Service {
  _id: string;
  slug: string;
  title: string;
  headline?: string;
  teaser: string;
  forWhom: string;
  triggers: string[];
  youGet: PortableTextBlock[];
  whatItTakes?: PortableTextBlock[];
  questions?: Faq[];
  cases?: CaseSummary[];
  ctaLabel?: string;
  contactTopic: ContactTopic;
  seo?: Seo;
}

export interface ProcessStep {
  title: string;
  text: string;
  clientInvolvement?: string;
}

export interface Page {
  _id: string;
  slug: string;
  title: string;
  intro?: string;
  body?: PortableTextBlock[];
  steps?: ProcessStep[];
  faqs?: Faq[];
  ctaTitle?: string;
  ctaLabel?: string;
  contactTopic?: ContactTopic;
  seo?: Seo;
}

export interface Home {
  heroKicker: string;
  heroHeadline: string;
  heroText: string;
  heroImage?: Figure;
  workTitle?: string;
  situationsTitle?: string;
  situations?: { title: string; text: string }[];
  servicesTitle?: string;
  aiLine?: string;
  assessmentTitle?: string;
  assessmentText?: string;
  assessmentNote?: string;
  collaborationTitle?: string;
  collaborationText?: string;
  steps?: ProcessStep[];
  timeframe?: string;
  agencyTitle?: string;
  agencyText?: string;
  contactTitle?: string;
  contactText?: string;
  seo?: Seo;
}

export interface SiteSettings {
  companyName: string;
  brandName: string;
  tagline: string;
  street?: string;
  zip: string;
  city: string;
  email: string;
  phone?: string;
  contactPerson: string;
  linkedin?: string;
  areaServed: string[];
  defaultSeo?: Seo;
  llmSummary?: string;
}
