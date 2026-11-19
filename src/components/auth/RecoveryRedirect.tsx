"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function RecoveryRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (
      !window.location.hash.includes("type=recovery") &&
      !window.location.hash.includes("access_token=")
    ) {
      return;
    }

    const supabase = createClient();

    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        router.replace("/admin/reset-password");
      }
    });

    void supabase.auth.getSession().then(({ data: sessionData }) => {
      if (sessionData.session) {
        window.history.replaceState(null, "", "/admin/reset-password");
        router.replace("/admin/reset-password");
      }
    });

    return () => data.subscription.unsubscribe();
  }, [router]);

  return null;
}
