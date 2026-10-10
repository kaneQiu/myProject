import { requireUser } from "@/lib/auth";
import { ProjectForm } from "@/components/project-form";

export default async function NewProjectPage() {
  await requireUser();

  return (
    <div>
      <h1 className="text-2xl font-semibold">新建项目</h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
