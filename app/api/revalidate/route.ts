import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity-Webhook: Nach jedem Publish/Unpublish invalidiert Next.js die betroffenen Inhalte.
 * Einrichtung: Sanity → Manage → API → Webhooks → URL https://brandarchitects.ch/api/revalidate,
 * Trigger create/update/delete, Secret = SANITY_REVALIDATE_SECRET (Vercel-Umgebungsvariable).
 * Projection: { "_type": _type }
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type: string }>(req, process.env.SANITY_REVALIDATE_SECRET);
    if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    if (!body?._type) return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: err instanceof Error ? err.message : "Error" }, { status: 500 });
  }
}
