import React from "react";
import { TaskStatus, Priority } from "./types";

export const STATUS_LABELS: Record<
	TaskStatus,
	{ label: string; color: string; dot: string }
> = {
	TODO: {
		label: "未着手",
		color: "bg-slate-100 text-slate-600",
		dot: "bg-slate-400",
	},
	IN_PROGRESS: {
		label: "進行中",
		color: "bg-amber-100 text-amber-700",
		dot: "bg-amber-500",
	},
	REVIEW: {
		label: "確認待ち",
		color: "bg-indigo-100 text-indigo-700",
		dot: "bg-indigo-500",
	},
	DONE: {
		label: "完了",
		color: "bg-emerald-100 text-emerald-700",
		dot: "bg-emerald-500",
	},
};

export const PRIORITY_LABELS: Record<
	Priority,
	{ label: string; color: string; icon: string }
> = {
	LOW: { label: "低", color: "text-slate-400", icon: "○" },
	MEDIUM: { label: "中", color: "text-blue-500", icon: "●" },
	HIGH: { label: "高", color: "text-orange-500", icon: "▲" },
	URGENT: { label: "至急", color: "text-rose-600", icon: "⚠" },
};

export const INITIAL_MEMBERS = [
	{
		id: "1",
		name: "田中 太郎",
		department: "技術開発",
		role: "開発リード",
		avatar: "👨‍💻",
		email: "tanaka@astrais.jp",
	},
	{
		id: "2",
		name: "佐藤 花子",
		department: "広報・デザイン",
		role: "クリエイティブ",
		avatar: "🎨",
		email: "sato@astrais.jp",
	},
	{
		id: "3",
		name: "鈴木 一郎",
		department: "運営統括",
		role: "マネージャー",
		avatar: "☕",
		email: "suzuki@astrais.jp",
	},
];

export const INITIAL_TASKS = [
	{
		id: "t1",
		title: "プロジェクト周知用資料作成",
		description:
			"ASTRAIS新プロジェクトの概要をまとめた資料を全メンバーに共有する。",
		status: "IN_PROGRESS" as TaskStatus,
		priority: "HIGH" as Priority,
		assignedTo: "3",
		dueDate: "2024-07-01",
		createdAt: "2024-06-25",
	},
	{
		id: "t2",
		title: "モバイル版UI調整",
		description:
			"HOTARUアプリのスマートフォン表示におけるボタンサイズを調整する。",
		status: "TODO" as TaskStatus,
		priority: "MEDIUM" as Priority,
		assignedTo: "1",
		dueDate: "2024-07-05",
		createdAt: "2024-06-26",
	},
];
