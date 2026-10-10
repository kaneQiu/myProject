"use client";

import { useRef, useState } from "react";
import { uploadImage } from "@/app/admin/actions";

export function ImageUpload({
  onUploaded,
}: {
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadImage(formData);
      if (result?.url) {
        onUploaded(result.url);
      } else {
        setError(result?.error || "上传失败");
      }
    } catch {
      setError("上传失败");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex shrink-0 items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg border border-zinc-300 px-3 py-2 text-sm transition hover:border-zinc-500 disabled:opacity-60 dark:border-zinc-700"
      >
        {uploading ? "上传中..." : "上传"}
      </button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
