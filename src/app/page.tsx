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
        <section className="relative overflow-hidden py-20 sm:py-24">
          <div className="pointer-events-none absolute -right-20 -top-16 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
          <div className="pointer-events-none absolute -left-24 top-32 -z-10 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/20" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400">
            Portfolio
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
            您好，我是{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
              裘浩峰
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            这里将向您介绍我过往的项目经历，以及正在做的、也许有趣的东西。
          </p>
        </section>

        {/* 项目列表 */}
        <section>
          <h2 className="mb-8 flex items-center gap-4 text-2xl font-semibold">
            项目经验
            <span className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
          </h2>
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
                  className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-indigo-500/40"
                >
                  <div className="h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    {project.cover_image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.cover_image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-400">
                        暂无封面
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
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
