import createMiddleware from "next-intl/middleware";
import { locales } from "./navigation";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, UserProfile } from "./typing/api";
import { base_url } from "./config";

const handleI18nRouting = createMiddleware({
  defaultLocale: "en",
  locales,
  localePrefix: "as-needed",
});

export default async function getUserProfile(
  req: NextRequest
): Promise<ApiResponse<UserProfile>> {
  try {
    const res = await fetch(`${base_url}/user/profile`, {
      credentials: "include",
      headers: req.headers,
      cache: "no-store",
    });
    const resJson = (await res.json()) as ApiResponse<UserProfile>;
    return resJson;
  } catch (error) {
    return {
      succeed: false,
      code: "CLIENT_ERROR",
    };
  }
}

const publicRoutes = [
  "/login",
  "/register",
  "/create-new-password",
  "/email-verified",
  "/reset-password",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { data: user, succeed } = await getUserProfile(request);

  if (succeed && user) {
    if (pathname.includes("/login") || pathname.includes("/register")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  const isPublicPath = publicRoutes.some((route) => pathname.includes(route));
  if ((!succeed || !user) && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const response = handleI18nRouting(request);
  return response;
}

export const config = {
  // matcher: ["/", "/(it|en)/:path*"],
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
