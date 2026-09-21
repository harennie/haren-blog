/**
 * 项目页数据源（纯内容）。
 * 页面展示与筛选规则由 src/config/projectsConfig.ts 控制。
 */
import type { ProjectItem } from "@/types/projectsConfig";

export const projectsData: ProjectItem[] = [
	{
		key: "cf-server-monitor",
		title: "服务器探针",
		summary:
			"用 CF-Server-Monitor 给 VPS 做状态面板；Agent 装在机器上，面板跑在 Cloudflare Workers 上。",
		category: "ops",
		phase: "shipped",
		technologies: ["Cloudflare Workers", "D1", "Durable Objects"],
		icon: "material-symbols:monitor-heart-outline-rounded",
		featured: true,
		website: "https://tz.unowen.top",
		repository: "https://github.com/huilang-me/CF-Server-Monitor",
		year: "2026",
	},
];

/** 获取所有项目数据列表 */
export function getProjectsList(): ProjectItem[] {
	return projectsData;
}
