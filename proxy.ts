import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname === "/admin/login";
  const isResetPasswordRoute = pathname === "/admin/reset-password";

  if (!isAdminRoute) {
    return response;
  }

  if (!user) {
    if (isLoginRoute || isResetPasswordRoute) {
      return response;
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("singleton", true)
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    if (isLoginRoute) {
      await supabase.auth.signOut();
      return response;
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginRoute) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
