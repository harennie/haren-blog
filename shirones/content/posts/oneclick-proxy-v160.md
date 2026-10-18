---
title: 一键脚本升到 v1.6.0
published: 2026-10-18
description: 源码拆成模块再拼回 proxy.sh。防火墙同步 ufw 和 firewalld，配置能导出，Vision 和 XHTTP 可以共用 443。
tags: [代理, VPS, 脚本, Xray]
category: 日常
series: notes
draft: false
lang: zh_CN
---

## 10 月 18 日

仓库这边 [pull/20](https://github.com/harennie/oneclick-proxy/pull/20) 已经合并，版本是 1.6.0。仓库还是 [harennie/oneclick-proxy](https://github.com/harennie/oneclick-proxy)。

16 号先把 `proxy.sh` 拆成 `src/` 里的模块，用 `build.sh` 按固定顺序拼回根目录的 `proxy.sh`。装机用的还是这一个文件。这版拼接时写上模块行号，出错会显示 `src/<文件>.sh:<行>`，`curl | bash` 也能对上。

只放行的时候，或者严格模式还留着 ufw / firewalld，会把当前代理端口写进正在跑的那一个，Hysteria2 的端口跳跃也算。注释是 `proxy-oneclick`，记在 `/root/.proxy-oneclick/fw-host.list`。改端口、关协议、切换模式和卸载，只按这份清单删。已经有的放行不改注释，SSH 不进清单，清理时也不删。本机没有这两种防火墙就不做。`proxy firewall off` 时，要是 ufw 或 firewalld 还开着，会警告对方的默认拒绝可能挡住代理端口。`--auto` 重装沿用已经保存的防火墙模式。

`proxy export` 带走密钥、证书和自签证书，文件权限 600。加上 `--password` 时用 OpenSSL 的 AES-256-CBC 加密。公网地址、网卡、NAT 映射不放进去。`proxy import` 之后重新检测 IP、NAT、SNI 和防火墙。要加密又没有终端、也没有 `PROXY_EXPORT_PASS` 时，直接退出。主菜单第 19 项是导出，第 20 项是导入。

Vision 和 XHTTP 可以共用一个 TCP 端口。`--xhttp-on-443`，或者 `proxy proto xhttp-443 on`。443 上的 Reality 用 fallbacks 把非 Vision 流量交给本机 XHTTP，优先走 `/dev/shm/xray-xhttp.sock`，没有就用本机回环。默认仍是分开的 8443，`mode` 还是 `stream-one`。单独改这个端口用 `proxy port --xhttp-port`，主机防火墙同步会跟着换。NAT 只剩一条 TCP 映射时，安装会建议共用；带 `--auto` 就直接共用。不肯共用、又没有第二条映射，XHTTP 仍会跳过。

`proxy doctor` 只读查时间、服务、防火墙、SNI、回环自检和证书到期。`--fix` 只做拉起服务、对时、按清单同步 ufw / firewalld、把 `state.env` 改成 600。复查都通过就退出 0，并列出修好的项；还有失败则退出 1。主菜单第 21 项是健康检查。

换 Xray、Hysteria2、sing-box 之前，把当前程序复制成同目录的 `.bak`。剩下的空间不足 50MB 就跳过并警告，不盖掉已有备份。直接下载的新程序先放在临时路径，检查通过才替换：Xray 跑 `version` 和当前配置的 `xray run -test`，sing-box 跑 `version` 和 `sing-box check`，Hysteria2 只跑 `version`。`--xray-ver` 不走官方安装脚本，先把该标签的 zip 下到临时目录，校验通过才替换程序和 `geoip.dat` / `geosite.dat`。没过就不改正在用的文件，也不拿一份和当前程序相同的副本盖掉已有的 `.bak`。回滚或启动失败自动换回时，地理数据文件一起恢复。

`proxy update --rollback` 换回 `.bak` 并重启对应服务，systemd 和 OpenRC 都走这一套。目标是 `xray`、`hy2`、`singbox` 或 `all`。不写或写 `all` 时，没有备份的跳过并警告；点名某一个却没有 `.bak` 就失败退出。`--xray-ver`、`--hy2-ver`、`--singbox-ver` 在安装和 `proxy update` 里都能用，版本号得是 GitHub 上已有的发布标签。回滚和指定版本不能一起写。

默认三个协议还是 Vision、XHTTP、Hysteria2。Trojan、TUIC、AnyTLS 继续关着。主菜单第 16 项还是「协议开关」。
