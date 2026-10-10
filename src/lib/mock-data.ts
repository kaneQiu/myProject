import type { Project } from "@/lib/types";

// 本地调试用的假数据：在 .env.local 设置 USE_MOCK_DATA=true 后生效，
// 用于不连接 Supabase 时预览页面样式与布局（上线时忽略此文件即可）。
export const mockProjects: Project[] = [
  {
    id: "mock-1",
    title: "示例项目：个人作品集网站",
    description: "基于 Next.js 全栈构建的个人作品集，支持后台管理项目经验。",
    content: "这是本地调试用的示例项目，方便你在不连接数据库时预览页面样式与布局。",
    tech_stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    cover_image_url: "https://tmp1qo190.hn-bkt.clouddn.com/tonghao1.png",
    project_url: "https://example.com",
    github_url: "https://github.com",
    images: [
      "https://tmp1qo190.hn-bkt.clouddn.com/tonghao1.png",
      "https://tmp1qo190.hn-bkt.clouddn.com/tonghao1.png",
      "https://tmp1qo190.hn-bkt.clouddn.com/tonghao1.png",
    ],
    featured: true,
    created_at: "2026-10-01T00:00:00.000Z",
    updated_at: "2026-10-01T00:00:00.000Z",
  },
  {
    id: "mock-2",
    title: "示例项目：跨端小程序",
    description: "一个基于 Taro 的跨端小程序项目。",
    content: "用于本地调试的第二个示例项目，可预览多个项目卡片的排版效果。",
    tech_stack: ["Taro", "React", "微信小程序"],
    cover_image_url: null,
    project_url: null,
    github_url: null,
    images: [],
    featured: false,
    created_at: "2026-09-15T00:00:00.000Z",
    updated_at: "2026-09-15T00:00:00.000Z",
  },
];
