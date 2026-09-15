import { z } from "zod";

/** Validierung des Kontaktformulars – identisch für Client-Hinweise und Server (app/api/contact). */
export const contactTopics = ["brand", "web", "ai", "assessment", "open"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "nameRequired").max(120),
  email: z.string().trim().email("emailInvalid").max(200),
  company: z.string().trim().min(2, "companyRequired").max(160),
  topic: z.enum(contactTopics).optional(),
  message: z.string().trim().min(10, "messageRequired").max(4000),
  timeframe: z.string().trim().max(200).optional(),
  // Spam-Schutz: Honeypot muss leer bleiben, Formular darf nicht schneller als 3 s abgeschickt werden
  website: z.string().max(0).optional(),
  startedAt: z.coerce.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
