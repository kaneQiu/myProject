"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getUser } from "@/lib/auth";
import type { ProjectInput } from "@/lib/types";

export type ActionState = { error?: string } | undefined;

// 登录
export async function login(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get("email") as string) ?? "";
  const password = (formData.get("password") as string) ?? "";

  if (!email || !password) {
    return { error: "请输入邮箱和密码" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: `登录失败：${error.message}` };
  }

  redirect("/admin");
}

// 登出
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

// 从 FormData 解析项目输入
function parseProjectInput(formData: FormData): ProjectInput {
  const techStack = (formData.get("tech_stack") as string) ?? "";
  return {
    title: ((formData.get("title") as string) ?? "").trim(),
    description: ((formData.get("description") as string) ?? "").trim(),
    content: (formData.get("content") as string) ?? "",
    tech_stack: techStack
      .split(/[,，\n]/)
      .map((s) => s.trim())
      .filter(Boolean),
    cover_image_url:
      ((formData.get("cover_image_url") as string) ?? "").trim() || null,
    project_url:
      ((formData.get("project_url") as string) ?? "").trim() || null,
    github_url: ((formData.get("github_url") as string) ?? "").trim() || null,
    images: formData
      .getAll("images")
      .map((v) => (v as string).trim())
      .filter(Boolean),
    featured: formData.get("featured") === "on",
  };
}

// 新建项目
export async function createProject(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  const input = parseProjectInput(formData);
  if (!input.title) {
    return { error: "标题不能为空" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").insert(input);
  if (error) {
    return { error: "创建失败：" + error.message };
  }

  revalidatePath("/");
  redirect("/admin");
}

// 更新项目
export async function updateProject(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  const input = parseProjectInput(formData);
  if (!input.title) {
    return { error: "标题不能为空" };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").update(input).eq("id", id);
  if (error) {
    return { error: "更新失败：" + error.message };
  }

  revalidatePath("/");
  revalidatePath(`/projects/${id}`);
  redirect("/admin");
}

// 删除项目
export async function deleteProject(id: string) {
  const user = await getUser();
  if (!user) redirect("/admin/login");

  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) {
    throw new Error("删除失败：" + error.message);
  }

  revalidatePath("/");
  redirect("/admin");
}
