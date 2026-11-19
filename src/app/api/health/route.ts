import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { status: "error", error: "Supabase environment variables are not configured." },
      { status: 503 },
    );
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase
      .from("events")
      .select("id", { head: true, count: "planned" })
      .limit(1);

    if (error) {
      return NextResponse.json(
        { status: "error", error: "Supabase is not responding." },
        { status: 503 },
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { status: "error", error: "Supabase health check failed." },
      { status: 503 },
    );
  }
}
