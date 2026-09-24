---
title: 白嫖到一台 AWS 光帆，顺手把代理搭好了
published: 2026-09-24
description: 白嫖到一台俄亥俄的机子，让grok bot自己配置 Xray 和 Hysteria2（ai真是太好用了）。
tags: [VPS, 代理, AWS]
category: 日常
series: notes
draft: false
lang: zh_CN
---

今天白嫖到一台 AWS 光帆。落在俄亥俄，区域 us-east-2：2 vCPU、1G 内存、40GB 磁盘、2TB 双向流量，系统是 Debian 12，带 IPv6。

## 代理

代理是手搓（ai手搓也是手搓）的。主路用 Xray 26.3.27：VLESS + Reality + XTLS Vision，另外开了后量子的 ML-DSA-65 签名校验，指纹设成随机（randomized）。

Reality 的伪装站选了 [www.case.edu](https://www.case.edu)。这个是扫出来的，同一座城市里的一个 Fastly 节点，支持 TLS 1.3、H2 和 HSTS。

美东超高延迟无需多言，所以又加了 Hysteria2 v2.12.3。走 UDP 443，端口跳跃开在 20000-50000。证书是自签的，客户端按指纹锁定。没有认证的访客看到的是一个正常网站。

系统开了 BBR + fq，网络参数做了一组偏保守的调整，另外加了 1GB 交换分区（swap）。防火墙只放行 22、443，以及 Hysteria2 用到的 UDP 端口。SSH 用 fail2ban 挡暴力破解。

| 项 | 现状 |
| --- | --- |
| 机器 | us-east-2，2 核 CPU / 945MB / 40GB，Debian 12，带 IPv6 |
| Xray | 26.3.27，VLESS + Reality + XTLS Vision，ML-DSA-65，指纹随机（randomized） |
| 伪装站 | [www.case.edu](https://www.case.edu)（同城 Fastly，TLS 1.3、H2、HSTS） |
| Hysteria2 | v2.12.3，UDP 443，端口跳跃 20000-50000，自签证书，指纹锁定 |
| 系统 | BBR + fq，保守的网络参数，1GB 交换分区（swap） |
| 防火墙 | 只放行 22、443 和 Hysteria2 的 UDP 端口；SSH 有 fail2ban |

## 记几笔

Lightsail 默认给的是动态公网地址。重启之后地址就变了，最好绑一个静态地址。

从大陆走普通线路，延迟大概 200-270 毫秒，所以上面补了 Hysteria2。

速度还不错，vless能跑到45MB/s，不过udp限速高很多，最高大概是15MB/s。

