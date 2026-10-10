-- ============================================
-- 作品集项目经验表
-- 在 Supabase Dashboard 的 SQL Editor 中执行本文件
-- ============================================

-- 项目经验表
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  content text not null default '',
  tech_stack text[] not null default '{}',
  cover_image_url text,
  project_url text,
  github_url text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 启用行级安全（RLS）
alter table public.projects enable row level security;

-- 公开可读：任何访客都能浏览项目
create policy "公开读取项目" on public.projects
  for select using (true);

-- 写操作（增删改）由服务端使用 service_role key 完成（service_role 绕过 RLS），
-- 并在应用层通过登录鉴权保护，因此这里不需要额外的写策略。

-- 自动更新 updated_at 字段
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();
