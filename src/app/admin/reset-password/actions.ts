"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function resetPasswordAction(_previousState: string | null, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (password.length < 8) {
    return "Password must contain at least 8 characters.";
  }

  if (password !== confirmation) {
    return "Passwords do not match.";
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return "The password recovery session has expired. Request a new recovery email.";
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return "Unable to update the password. Request a new recovery email.";
  }

  await supabase.auth.signOut();
  redirect("/admin/login");
}
