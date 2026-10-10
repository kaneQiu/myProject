"use client";

import { useEffect, useRef, useState } from "react";

export function ImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // 内容不足一屏时不拦截，交给页面默认的垂直滚动
      if (el.scrollWidth <= el.clientWidth) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY + e.deltaX;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <>
      <div
        ref={scrollerRef}
        className="no-scrollbar mt-4 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory"
      >
        {images.map((url, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={url}
            alt={`${title} 截图 ${index + 1}`}
            onClick={() => setLightbox(url)}
            className="h-56 w-auto shrink-0 cursor-zoom-in snap-center rounded-xl border border-zinc-200 object-contain transition hover:opacity-90 dark:border-zinc-800"
          />
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="关闭"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt={title}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </>
  );
}
