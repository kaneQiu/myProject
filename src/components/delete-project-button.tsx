"use client";

import { deleteProject } from "@/app/admin/actions";

export function DeleteProjectButton({ id }: { id: string }) {
  return (
    <form action={deleteProject.bind(null, id)}>
      <button
        type="submit"
        onClick={(e) => {
          if (!confirm("确定删除这个项目吗？此操作不可恢复。")) {
            e.preventDefault();
          }
        }}
        className="text-sm text-red-600 transition hover:text-red-700"
      >
        删除
      </button>
    </form>
  );
}
