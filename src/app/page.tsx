import Link from "next/link";
import { getProjects } from "@/lib/projects";

// 经典模式：确保每次请求动态渲染，读取最新数据
export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await getProjects();

  return (
    <div className="flex-1 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold">
          我的作品集
        </Link>
        <Link
          href="/admin"
          className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          管理后台
        </Link>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {/* 个人介绍区 */}
        <section className="py-20">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            你好，我是 <span className="text-zinc-400">你的名字</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            这里是一段简短的自我介绍，介绍你的背景、技能方向，以及你正在做的事情。编辑
            src/app/page.tsx 即可修改。
          </p>
        </section>

        {/* 项目列表 */}
        <section>
          <h2 className="mb-8 text-2xl font-semibold">项目经验</h2>
          {projects.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
              还没有项目，登录后台添加第一个吧。
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  {project.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.cover_image_url}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-48 w-full items-center justify-center bg-zinc-100 text-zinc-400 dark:bg-zinc-800">
                      暂无封面
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold group-hover:underline">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>
                    {project.tech_stack.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} 我的作品集
      </footer>
    </div>
  );
}
