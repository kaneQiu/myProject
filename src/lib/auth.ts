import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

// 获取当前登录用户，未登录返回 null
export async function getUser(): Promise<User | null> {
  // 本地 mock 调试：不连接 Supabase，返回假用户以绕过登录
  if (process.env.USE_MOCK_DATA === "true") {
    return { id: "mock-user-id", email: "mock@example.com" } as unknown as User;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// 要求已登录，否则重定向到登录页
export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}
