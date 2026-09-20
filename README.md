# 哈人的博客

个人站点，使用 [Shirone](https://shirone.mysqil.com/) 主题的 npm 包模式（[`shirones`](https://www.npmjs.com/package/shirones)）。文章、配置和静态资源在本仓库；主题代码在 `node_modules` 里，不必 fork 主题源码仓。

文档：<https://docs.shirone.mysqil.com/>  
主题演示：<https://shirone.mysqil.com/>

## 环境

- Node.js `>= 22.12`
- pnpm：本仓库按 `shirones` 发布包锁定 `packageManager: pnpm@12.4.2`。首次安装前执行 `corepack enable`，会按该字段启用对应 pnpm。

## 本地开发

```bash
corepack enable
pnpm install
pnpm dev
```

默认开发地址是 `http://localhost:4321`。

生产构建（静态站点输出到 `dist/`）：

```bash
pnpm build
pnpm preview   # 本地预览构建结果
```

## 写新文章

在 `shirones/content/posts/` 新建 Markdown（或 MDX）文件，例如 `shirones/content/posts/a-note.md`：

```yaml
---
title: 一篇新笔记
published: 2026-09-20
description: 列表和社交卡片里会用到的摘要。
tags: [随笔]
category: 日常
draft: false
---
```

把 `draft` 设为 `true` 时，`pnpm build` 不会发布该文。瞬间（moments）写在 `shirones/content/moments/`，关于页在 `shirones/content/spec/about.md`。站点标题、语言、资料和导航在 `shirones/config/`。

## 更新主题

继续使用 npm 包模式，不要改成 fork 主题仓库：

```bash
pnpm add shirones@latest
npx shirones init            # 只报告配置/脚手架漂移，不改文件
npx shirones init --update   # 补齐缺失文件，保留你改过的内容
```

## 部署到 Cloudflare Pages

规范站点地址在 `shirones/config/siteConfig.ts`：`site` 为 `https://unowen.top/`，`base` 为 `/`。生产构建会按这个地址生成 canonical、sitemap 和 RSS。仓库里的 `wrangler.toml` 把 Pages 输出目录定为 `dist/`，`.nvmrc` 指定 Node 22。

托管目标是 **Cloudflare Pages**，自定义域名 **unowen.top**。域名解析和 Pages 项目仍需你在 Cloudflare 控制台接上；接好之前本地继续用 `pnpm dev` / `pnpm preview`。

### 构建设置（与本地一致）

| 项 | 值 |
| --- | --- |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| 根目录 | `/`（仓库根） |
| Node.js | `>= 22.12`（建议环境变量 `NODE_VERSION=22`，或沿用 `.nvmrc`） |
| 包管理器 | pnpm（仓库有 `pnpm-lock.yaml` 与 `packageManager: pnpm@12.4.2`） |

建议在 Pages 项目环境变量里再钉一次（生产 + 预览都加上）：

- `NODE_VERSION` = `22`
- `PNPM_VERSION` = `12.4.2`

不要在仓库或环境变量里放 Cloudflare API Token。

### 控制台步骤

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages**。
2. 若本仓库已在 GitHub / GitLab：选 **Connect to Git**，授权后选中仓库，生产分支用 `main`。填写上面的构建命令和输出目录，保存并部署。
3. 若仓库不在 GitHub / GitLab：不要为了托管专门镜像一份 GitHub。本地 `pnpm build` 之后，在控制台用 **Direct Upload** 上传 `dist/`；或本机登录自己的 Cloudflare 账号后执行 `npx wrangler pages deploy dist --project-name unowen`（凭据留在本机，不要提交）。
4. 部署成功后打开 `https://<项目名>.pages.dev` 确认首页、文章和静态资源。
5. **Custom domains**：添加 `unowen.top`。域名已在 Cloudflare DNS 时按提示接上即可；DNS 在别处时，把根域指到 Pages 给出的 CNAME / 目标。需要 `www.unowen.top` 时再加一条并按需做跳转。
6. 之后推送到已连接的 Git 分支会自动构建；Direct Upload 则每次构建后再传 `dist/`。

本仓库不加需要 Token 的 GitHub Action。主题说明见 [Shirone 文档](https://docs.shirone.mysqil.com/)。

把 `shirones/config/profileConfig.ts` 里的社交链接换成你自己的主页。不要提交评论服务 ID、统计 ID、API Key 或 B 站 SESSDATA。
