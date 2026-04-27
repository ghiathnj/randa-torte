import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!expected || provided !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/", "layout");
  revalidatePath("/galerie");
  revalidatePath("/en/gallery");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}

export const runtime = "nodejs";
