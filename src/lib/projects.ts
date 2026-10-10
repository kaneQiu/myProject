import { createAdminClient } from "@/lib/supabase/admin";
import { mockProjects } from "@/lib/mock-data";
import type { Project } from "@/lib/types";

// 本地调试开关：在 .env.local 设置 USE_MOCK_DATA=true 时，
// 返回本地假数据，避免本地开发时依赖 Supabase（国内直连需代理）。
const useMock = process.env.USE_MOCK_DATA === "true";

// 获取所有项目，精选项目在前，其余按创建时间倒序
export async function getProjects(): Promise<Project[]> {
  if (useMock) {
    return mockProjects;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("获取项目列表失败:", error.message);
    return [];
  }
  return (data as Project[]) ?? [];
}

// 获取单个项目
export async function getProject(id: string): Promise<Project | null> {
  if (useMock) {
    return mockProjects.find((p) => p.id === id) ?? null;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return null;
  }
  return data as Project;
}
