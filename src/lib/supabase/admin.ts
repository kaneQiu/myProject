import { createClient } from "@supabase/supabase-js";

// 服务端管理客户端（使用 service_role key，绕过 RLS，仅在服务端使用）
// 注意：该 key 绝不能暴露到浏览器端。
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
