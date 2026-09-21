---
title: 给 VPS 挂上 Cloudflare 探针
published: 2026-09-21
description: 用 CF-Server-Monitor 给 VPS 做状态面板，面板跑在 Cloudflare 上，不必再单独养一台监控机。
tags: [运维, Cloudflare]
category: 日常
series: notes
draft: false
lang: zh_CN
---

VPS 想随手看一眼活着没有，又不想再单独养一台监控机。最近把 [CF-Server-Monitor](https://github.com/huilang-me/CF-Server-Monitor) 挂上了：Agent 装在机器上单向上报，面板和存储都跑在 Cloudflare 上。

栈是 Cloudflare Workers + D1 + Durable Objects。指标打到 Worker，D1 存历史，Durable Objects 负责实时推送。个人用量走免费档就够。

面板和博客同属 unowen.top 这一族，地址是 [https://tz.unowen.top](https://tz.unowen.top)。想看现在怎么样，打开就能看。

具体怎么装以项目 README 为准，这篇只记一下已经上线。
