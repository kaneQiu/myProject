"use client";

import { logout } from "@/app/admin/actions";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="text-sm text-zinc-500 transition hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        退出登录
      </button>
    </form>
  );
}
