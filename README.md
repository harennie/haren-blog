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

## 部署

规范站点地址已写在 `shirones/config/siteConfig.ts`：`site` 为 `https://unowen.top/`，`base` 为 `/`。生产构建会按这个地址生成 canonical、sitemap 和 RSS。

域名 **unowen.top** 的 DNS 与静态托管还需要你自己接上（例如把 `dist/` 发布到 Pages / 对象存储 / Nginx）。接好之前，本地继续用 `pnpm dev` 或 `pnpm preview`。

把 `shirones/config/profileConfig.ts` 里的社交链接换成你自己的主页。不要提交评论服务 ID、统计 ID、API Key 或 B 站 SESSDATA。
