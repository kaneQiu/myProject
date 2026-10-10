import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// 获取当前登录用户，未登录返回 null
export async function getUser() {
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
