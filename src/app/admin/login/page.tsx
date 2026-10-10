"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <form
        action={action}
        className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h1 className="text-xl font-semibold">管理员登录</h1>
        <p className="mt-1 text-sm text-zinc-500">登录后可管理你的项目经验</p>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              邮箱
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
            />
          </div>
        </div>

        {state?.error && (
          <p className="mt-4 text-sm text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? "登录中..." : "登录"}
        </button>
      </form>
    </div>
  );
}
