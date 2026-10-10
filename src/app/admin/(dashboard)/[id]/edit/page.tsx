import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { getProject } from "@/lib/projects";
import { ProjectForm } from "@/components/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireUser();
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold">编辑项目</h1>
      <div className="mt-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
