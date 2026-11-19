import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }

  const { email, password } = payload as Record<string, unknown>;
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || "Invalid login credentials." },
        { status: 401 },
      );
    }

    const { data: profile } = await supabase
      .from("admin_profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .maybeSingle();

    if (!profile?.is_admin) {
      await supabase.auth.signOut();
      return NextResponse.json(
        { error: "This account does not have admin access." },
        { status: 403 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { error: "Login could not be completed. Please try again." },
      { status: 500 },
    );
  }
}
