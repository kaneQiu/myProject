import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 路由保护：拦截 /admin 下的未登录访问（乐观检查）。
// 真正的鉴权在页面和 Server Action 内通过 supabase.auth.getUser() 完成。
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin/login 公开，其余 /admin/* 需要登录
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Supabase 的 session cookie 命名格式：sb-<project_ref>-auth-token
    const hasSession = request.cookies
      .getAll()
      .some(
        (c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"),
      );

    if (!hasSession) {
      const url = new URL("/admin/login", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
