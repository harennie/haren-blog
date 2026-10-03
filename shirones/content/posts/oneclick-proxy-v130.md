---
title: 一键脚本升到 v1.3.0，默认三个协议
published: 2026-10-03
description: 默认一次装好 Vision、XHTTP 和 Hysteria2。Trojan、TUIC、AnyTLS 先关着，装完再从菜单里开。
tags: [代理, VPS, 脚本, Xray]
category: 日常
series: notes
draft: false
lang: zh_CN
---

## 10 月 3 日

今天把脚本收到 v1.3.0。仓库还是 [harennie/oneclick-proxy](https://github.com/harennie/oneclick-proxy)，改动在 [pull/9](https://github.com/harennie/oneclick-proxy/pull/9)。

默认一键，带上 `--auto` 也一样，一次装三个协议，都不需要自己的域名。第一条还是 VLESS + Reality + Vision。第二条是 VLESS + XHTTP + Reality，和 Vision 共用同一把密钥和 SNI，自己占一个 TCP 端口，默认 8443，不填 flow。服务端和链接里的 mode 都是 `stream-one`。第三条还是 Hysteria2。

Trojan、TUIC v5、AnyTLS 默认关着，装的时候不会问。TUIC 和 AnyTLS 走 sing-box，证书用 Hysteria2 那张自签的。想开就进菜单第 16 项「协议开关」，或者跑 `proxy proto`。关掉只停监听，原来的 UUID 和密钥都留着，不能全关。

Shadowsocks 2022 还是只给落地机当出口。NaiveProxy 没加：要单独一个程序，还得有自己能签发证书的域名，离这套做法太远。

主菜单两列，原来的项目都在，第 16 项是「协议开关」。字符 Logo 还是「哈人」，正下面一行小字是 `oneclick proxy`。主菜单、落地机菜单、协议开关那个框，标题都是这句。

NAT 只有一条映射的时候，XHTTP 还要第二个 TCP 端口。放不下就跳过，整次安装照样成功，剩下 Reality 和 Hysteria2。以前的 `state.env` 里没有 XHTTP 这一项时，换 SNI 也不会突然把它打开。
