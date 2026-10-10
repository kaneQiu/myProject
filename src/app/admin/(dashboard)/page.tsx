import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { getProjects } from "@/lib/projects";
import { DeleteProjectButton } from "@/components/delete-project-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireUser();
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">项目列表</h1>
        <Link
          href="/admin/new"
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          + 新建项目
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
          还没有项目，点击右上角「新建项目」添加第一个吧。
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800">
          {projects.map((project) => (
            <li
              key={project.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium">{project.title}</span>
                  {project.featured && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                      精选
                    </span>
                  )}
                </div>
                <p className="mt-1 truncate text-sm text-zinc-500">
                  {project.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link
                  href={`/admin/${project.id}/edit`}
                  className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  编辑
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
