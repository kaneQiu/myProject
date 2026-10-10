import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import { ImageGallery } from "@/components/image-gallery";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-1 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-lg font-semibold">
          我的作品集
        </Link>
      </header>

      <main className="relative isolate mx-auto max-w-3xl px-6 py-12">
        <div className="pointer-events-none absolute -right-24 -top-10 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-500/20" />
        <Link
          href="/"
          className="block text-right text-sm font-medium text-zinc-600 transition hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400"
        >
          ← 返回首页
        </Link>

        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">{project.title}</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>

        {project.tech_stack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="mt-8 w-full rounded-2xl object-cover shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800"
          />
        )}

        {project.images.length > 0 && (
          <ImageGallery images={project.images} title={project.title} />
        )}

        {project.content && (
          <div className="mt-8 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
            {project.content}
          </div>
        )}

        {(project.project_url || project.github_url) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {project.project_url && (
              <a
                href={project.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg"
              >
                访问项目
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium transition hover:border-zinc-500 dark:border-zinc-700"
              >
                查看源码
              </a>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        © {new Date().getFullYear()} 我的作品集
      </footer>
    </div>
  );
}
