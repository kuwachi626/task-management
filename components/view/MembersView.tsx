import React from "react";
import { Avatar } from "../Avatar";

// 必要に応じて既存の型定義からインポートしてください
interface Member {
	id: string;
	name: string;
	role: string;
	affiliation: string;
	avatar: string;
}

interface Task {
	assignedTo: string;
	status: string;
	priority: string;
}

interface MemberGridProps {
	members: Member[];
	tasks: Task[];
	onEdit: (member: Member) => void;
	onAdd: () => void;
}

// 個別のメンバーカードコンポーネント
const MemberCard = ({
	member,
	tasks,
	onEdit,
}: {
	member: Member;
	tasks: Task[];
	onEdit: (m: Member) => void;
}) => {
	// メンバーごとのタスク集計ロジックをここに集約
	const memberTasks = tasks.filter(
		(t) => t.assignedTo === member.id && t.status !== "DONE",
	);

	const loadLevel =
		memberTasks.length > 4
			? "high"
			: memberTasks.length > 2
				? "medium"
				: "low";

	const statusColor = {
		high: "bg-rose-500",
		medium: "bg-amber-500",
		low: "bg-emerald-500",
	}[loadLevel];

	return (
		<div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all group">
			<div className="p-6">
				<div className="flex items-start justify-between mb-6">
					<div className="relative">
						{/* Avatarコンポーネントは既存のものを使用 */}
						<Avatar avatar={member.avatar} className="w-20 h-20" />
						<div
							className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${statusColor}`}
						></div>
					</div>
					<button
						onClick={() => onEdit(member)}
						className="p-3 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition-all"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							/>
						</svg>
					</button>
				</div>

				<h3 className="text-xl font-bold text-slate-800">
					{member.name}
				</h3>
				<p className="text-xs text-slate-400 font-bold mb-6 tracking-wide uppercase">
					{member.role} ・ {member.affiliation}
				</p>

				<div className="space-y-4">
					<div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
						<span>進行中タスク</span>
						<span
							className={
								loadLevel === "high"
									? "text-rose-500"
									: "text-slate-600"
							}
						>
							{memberTasks.length}件
						</span>
					</div>
					<div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
						<div
							className={`h-full rounded-full transition-all duration-1000 ${statusColor}`}
							style={{
								width: `${Math.min(memberTasks.length * 20, 100)}%`,
							}}
						></div>
					</div>
				</div>
			</div>
		</div>
	);
};

// メインのグリッドコンポーネント
export const MembersView = ({
	members,
	tasks,
	onEdit,
	onAdd,
}: MemberGridProps) => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{members.map((member) => (
				<MemberCard
					key={member.id}
					member={member}
					tasks={tasks}
					onEdit={onEdit}
				/>
			))}

			{/* 追加ボタン */}
			<button
				onClick={onAdd}
				className="border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center p-12 text-slate-400 hover:border-amber-400 hover:bg-amber-50/30 hover:text-amber-500 transition-all gap-4 group"
			>
				<div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 4v16m8-8H4"
						/>
					</svg>
				</div>
				<p className="font-bold">メンバー追加</p>
			</button>
		</div>
	);
};
