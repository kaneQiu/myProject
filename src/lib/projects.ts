import { createAdminClient } from "@/lib/supabase/admin";
import type { Project } from "@/lib/types";

// 获取所有项目，精选项目在前，其余按创建时间倒序
export async function getProjects(): Promise<Project[]> {
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
