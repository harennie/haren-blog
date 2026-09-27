---
title: 把代理收成一键脚本，NAT 模式也跑通了
published: 2026-09-27
description: 手写的 Xray 和 Hysteria2 收成了脚本。26 日在俄亥俄的 AWS 上用脚本装了一遍，修了测速 bug；香港那只 NAT 小鸡测完也销毁了。
tags: [代理, VPS, 脚本, Xray]
category: 日常
series: notes
draft: false
lang: zh_CN
---

## 9 月 25 日

Xray 和 Hysteria2 原先都是我手写的配置。Xray 走 VLESS + Reality + Vision，带 ML-DSA-65，旁边再挂一条 Hysteria2。25 号把这两套收成一个一键脚本，开源了，仓库是 [harennie/oneclick-proxy](https://github.com/harennie/oneclick-proxy)。

## 9 月 26 日

26 号在俄亥俄那台 AWS 上，用自己的脚本装了一遍。装的时候测速有 bug：Cloudflare 的测速接口现在对 100MB 以上的下载直接返回 403，脚本却把它当成成功。这个判断我修掉了。

同一天加了 NAT 模式，v1.1.0。拿去香港东涌一台 NAT 小鸡上实测。这台是 Alpine，内存只有 128MB，只能映射 5 个端口，也没有防火墙工具。Reality 和 Hy2 只能共用一个端口，端口跳跃也用不了。最后跑通了，速度大约 4 到 5 MB/s。128MB 的 NAT，我也没辙，能通就算了。

## 9 月 27 日

凌晨给香港节点重新挑伪装站。脚本内置的香港候选网站全都不合格，大多藏在 CDN 后面。原先选中的新加坡国立大学网站，其实也走了 Imperva。最后扫出来的是港科大的学生门户 [my.hkust.edu.hk](https://my.hkust.edu.hk)。

顺手出了 v1.1.1。能识别更多 CDN，抗量子密钥交换改成优先条件，不再当硬性要求。装完会自动测一次能不能连上。另外修了一个隐藏 bug：伪装站的证书链太短时，开着 ML-DSA-65，所有客户端都连不上。

那台 NAT 机实在太拉胯，直接销毁了。

脚本开源在 [harennie/oneclick-proxy](https://github.com/harennie/oneclick-proxy)。
