// 项目经验的数据模型
export type Project = {
  id: string;
  title: string;
  description: string;
  content: string;
  tech_stack: string[];
  cover_image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  images: string[];
  featured: boolean;
  created_at: string;
  updated_at: string;
};

// 新建/编辑项目时提交的字段
export type ProjectInput = {
  title: string;
  description: string;
  content: string;
  tech_stack: string[];
  cover_image_url: string | null;
  project_url: string | null;
  github_url: string | null;
  images: string[];
  featured: boolean;
};
