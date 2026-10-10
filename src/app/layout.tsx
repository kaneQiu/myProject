import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的作品集",
  description: "展示我的项目经验与作品",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
