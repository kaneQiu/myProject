# 我的作品集

一个可供他人参观的个人作品集网站，支持后台登录后上传、编辑、删除自己的项目经验。

- **前台**：访客浏览项目列表与详情，无需登录
- **后台**：只有你自己（管理员）登录后能增删改项目
- **技术栈**：Next.js 16（App Router + TypeScript）+ Supabase（数据库 + 鉴权）+ Tailwind CSS v4
- **部署**：免费托管于 Vercel，数据存于 Supabase（均有免费额度）

## 目录结构

```
src/
├── app/
│   ├── page.tsx                  # 前台首页（项目列表）
│   ├── projects/[id]/page.tsx    # 项目详情页
│   └── admin/
│       ├── actions.ts            # 登录 / 增删改（Server Actions）
│       ├── login/page.tsx        # 登录页
│       └── (dashboard)/          # 后台：项目列表 / 新建 / 编辑
├── components/                   # 表单、按钮等组件
├── lib/
│   ├── supabase/                 # 浏览器 / 服务端 / 管理员客户端
│   ├── auth.ts                   # 鉴权工具
│   ├── projects.ts               # 项目读取
│   └── types.ts                  # 类型定义
├── proxy.ts                      # 路由保护（未登录跳转登录页）
└── supabase/schema.sql           # 建表 SQL（在 Supabase 执行）
```

---

## 一、准备账号（两个，都免费）

上线只需要下面两个免费账号，**不需要自己买服务器**：

1. **Supabase**（数据库 + 登录鉴权）：https://supabase.com
2. **Vercel**（网站托管）：https://vercel.com

> 建议都用 GitHub 账号登录，两边都能一键关联 GitHub 仓库。

---

## 二、配置 Supabase（先做这步）

### 1. 新建项目
登录 Supabase → 点击 **New project** → 填名字、设置数据库密码（自己记住即可）、选择离你近的区域（如 Singapore / Tokyo）→ 创建，等待初始化完成（约 1 分钟）。

### 2. 建表
进入项目 → 左侧 **SQL Editor** → 新建查询 → 把本仓库 [supabase/schema.sql](./supabase/schema.sql) 的**全部内容**粘贴进去 → 点击 **Run**。

这一步会创建 `projects` 表，并开启「公开可读、仅服务端可写」的权限（RLS）。

### 3. 创建管理员账号（你的登录账号）
左侧 **Authentication** → **Users** → **Add user**：

- 填你的邮箱和密码（这就是后台登录的账号）
- 勾选 **Auto Confirm User**（勾上才能直接登录，不用邮件验证）

### 4. 获取密钥
左侧 **Project Settings** → **API**，记下三个值：

| 名称 | 说明 |
| --- | --- |
| `Project URL` | 形如 `https://xxxx.supabase.co` | 
| `anon public` key | 公开密钥（会暴露给浏览器） |
| `service_role` key | 管理员密钥（**绝不能公开**） |

---

## 三、本地运行（可选，验证用）

1. 复制环境变量模板：

```bash
cp .env.example .env.local
```

2. 用上面拿到的三个值填进 `.env.local`：

```
NEXT_PUBLIC_SUPABASE_URL=你的 Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的 anon key
SUPABASE_SERVICE_ROLE_KEY=你的 service_role key
```

3. 安装依赖并启动：

```bash
npm install
npm run dev
```

打开 http://localhost:3000 即可查看；后台入口 http://localhost:3000/admin 。

---

## 四、部署到 Vercel（上线）

1. 把代码推送到 GitHub 仓库（或直接在 Vercel 用 Git 导入）。
2. 登录 Vercel → **Add New → Project** → 选择这个仓库。
3. 框架会自动识别为 Next.js，无需改动构建设置。
4. 在 **Environment Variables** 中填入和上面 `.env.local` 相同的三个环境变量。
5. 点击 **Deploy**。

部署完成后，Vercel 会给你一个 `https://xxx.vercel.app` 的网址，任何人都能访问你的作品集了。

> 之后每次 `git push`，Vercel 都会自动重新部署。

---

## 五、日常使用

- 访问 `https://你的域名/admin` → 用第「二-3」步设置的邮箱密码登录
- 进入后台可 **新建 / 编辑 / 删除** 项目，勾选「置顶」可让该项目排在首页最前
- 首页会自动实时刷新，无需重启

---

## 环境变量说明

| 变量 | 是否公开 | 用途 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | 是 | 项目地址 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 是 | 浏览器端读数据 |
| `SUPABASE_SERVICE_ROLE_KEY` | **否** | 服务端写数据（绕过 RLS） |
