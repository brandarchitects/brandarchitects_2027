import { defineQuery } from "next-sanity";

/**
 * GROQ-Abfragen. Jede Abfrage filtert nach Sprache ($locale) – Voraussetzung für Sprache 2.
 * Fragmente halten die Projektionen konsistent.
 */
const figure = `{ image { asset->{ _ref, url, metadata { lqip, dimensions } }, hotspot, crop }, alt, caption }`;
const seo = `seo { title, description, "ogImage": ogImage, noIndex }`;
const caseSummary = `{
  _id, title, client, task, contribution, featured, order, origin, formerAgency, year,
  "slug": slug.current,
  heroImage ${figure},
  "services": services[]->{ title, "slug": slug.current }
}`;
const faq = `{ _id, question, answer }`;

export const homeQuery = defineQuery(`*[_type == "home" && language == $locale][0]{
  heroKicker, heroHeadline, heroText, heroImage ${figure},
  workTitle, stats[]{ value, suffix, label }, situationsTitle, situations[]{ title, text }, servicesTitle, aiLine,
  assessmentTitle, assessmentText, assessmentNote, collaborationTitle, collaborationText,
  steps[]{ title, text, clientInvolvement }, timeframe, agencyTitle, agencyText, contactTitle, contactText, ${seo}
}`);

export const featuredCasesQuery = defineQuery(`*[_type == "case" && language == $locale && featured == true && materialCleared == true] | order(order asc)[0...2] ${caseSummary}`);

export const allCasesQuery = defineQuery(`*[_type == "case" && language == $locale && materialCleared == true] | order(order asc) ${caseSummary}`);

export const caseBySlugQuery = defineQuery(`*[_type == "case" && language == $locale && slug.current == $slug && materialCleared == true][0]{
  ...${caseSummary},
  situation, question, assignment, decision, preserved, application, result,
  quote { text, name, role, company },
  origin, formerAgency, year, role, partners, contactTopic,
  relatedCase->${caseSummary},
  ${seo}
}`);

export const caseSlugsQuery = defineQuery(`*[_type == "case" && language == $locale && materialCleared == true].slug.current`);

export const allServicesQuery = defineQuery(`*[_type == "service" && language == $locale] | order(order asc){
  _id, title, teaser, contactTopic, "slug": slug.current
}`);

export const serviceBySlugQuery = defineQuery(`*[_type == "service" && language == $locale && slug.current == $slug][0]{
  _id, title, headline, teaser, forWhom, triggers, youGet, whatItTakes, ctaLabel, contactTopic,
  "slug": slug.current,
  "questions": questions[]->${faq},
  "cases": cases[]->${caseSummary},
  ${seo}
}`);

export const serviceSlugsQuery = defineQuery(`*[_type == "service" && language == $locale].slug.current`);

export const pageBySlugQuery = defineQuery(`*[_type == "page" && language == $locale && slug.current == $slug][0]{
  _id, title, intro, body, steps[]{ title, text, clientInvolvement }, ctaTitle, ctaLabel, contactTopic,
  "slug": slug.current,
  "faqs": faqs[]->${faq},
  ${seo}
}`);

export const allFaqsQuery = defineQuery(`*[_type == "faq" && language == $locale] | order(order asc) ${faq}`);

export const siteSettingsQuery = defineQuery(`*[_type == "siteSettings" && language == $locale][0]{
  companyName, brandName, tagline, street, zip, city, email, phone, contactPerson, linkedin, areaServed, llmSummary,
  "defaultSeo": defaultSeo { title, description, "ogImage": ogImage }
}`);
