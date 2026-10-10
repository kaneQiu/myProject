import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// 服务端 Supabase 客户端（使用 anon key，配合 session cookie 做鉴权）
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // 在 Server Component 中调用 setAll 会被忽略，
            // 这里捕获避免报错（session 由 Server Action 写入）。
          }
        },
      },
    },
  );
}
