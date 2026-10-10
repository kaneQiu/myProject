"use client";

import { useActionState, useState } from "react";
import type { Project } from "@/lib/types";
import { createProject, updateProject } from "@/app/admin/actions";
import { ImageUpload } from "@/components/image-upload";

const inputClass =
  "mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100";

export function ProjectForm({ project }: { project?: Project }) {
  const action = project ? updateProject.bind(null, project.id) : createProject;
  const [state, formAction, pending] = useActionState(action, undefined);
  const [images, setImages] = useState<string[]>(
    project?.images?.length ? project.images : [""],
  );
  const [cover, setCover] = useState(project?.cover_image_url ?? "");

  const addImage = () => setImages((prev) => [...prev, ""]);
  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));
  const updateImage = (index: number, value: string) =>
    setImages((prev) => prev.map((img, i) => (i === index ? value : img)));

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          标题 <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          defaultValue={project?.title}
          required
          className={inputClass}
          placeholder="例如：电商小程序"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          简介
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          rows={2}
          className={inputClass}
          placeholder="一句话概括这个项目"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium">
          详细内容
        </label>
        <textarea
          id="content"
          name="content"
          defaultValue={project?.content}
          rows={8}
          className={inputClass}
          placeholder="项目背景、你的职责、实现细节、成果等"
        />
      </div>

      <div>
        <label htmlFor="tech_stack" className="block text-sm font-medium">
          技术栈（用逗号或换行分隔）
        </label>
        <input
          id="tech_stack"
          name="tech_stack"
          defaultValue={project?.tech_stack.join(", ")}
          className={inputClass}
          placeholder="React, TypeScript, Node.js"
        />
      </div>

      <div>
        <label htmlFor="cover_image_url" className="block text-sm font-medium">
          封面图 URL
        </label>
        <input
          id="cover_image_url"
          name="cover_image_url"
          type="url"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          className={inputClass}
          placeholder="https://...（或点击下方上传）"
        />
        <div className="mt-2">
          <ImageUpload onUploaded={setCover} />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium">
            项目截图（可多张，横向滑动预览）
          </label>
          <button
            type="button"
            onClick={addImage}
            className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            + 添加图片
          </button>
        </div>
        <div className="mt-2 space-y-2">
          {images.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                name="images"
                type="url"
                value={url}
                onChange={(e) => updateImage(index, e.target.value)}
                className={inputClass}
                placeholder={`截图 ${index + 1} 的图片链接 https://...`}
              />
              <ImageUpload onUploaded={(url) => updateImage(index, url)} />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="shrink-0 px-2 text-lg text-zinc-400 transition hover:text-red-500"
                  aria-label="删除图片"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="project_url" className="block text-sm font-medium">
            项目链接
          </label>
          <input
            id="project_url"
            name="project_url"
            type="url"
            defaultValue={project?.project_url ?? ""}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
        <div>
          <label htmlFor="github_url" className="block text-sm font-medium">
            源码链接
          </label>
          <input
            id="github_url"
            name="github_url"
            type="url"
            defaultValue={project?.github_url ?? ""}
            className={inputClass}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 rounded border-zinc-300"
        />
        <span className="text-sm">置顶为精选项目</span>
      </label>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? "保存中..." : "保存"}
        </button>
        <a
          href="/admin"
          className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          取消
        </a>
      </div>
    </form>
  );
}
