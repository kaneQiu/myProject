import Link from "next/link";
import { LogoutButton } from "@/components/logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-semibold">
              管理后台
            </Link>
            <Link
              href="/admin/new"
              className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              新建项目
            </Link>
            <Link
              href="/"
              className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              查看前台
            </Link>
          </div>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-8">{children}</main>
    </div>
  );
}
