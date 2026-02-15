import { DashboardStats, ViewType } from "../types";

export const TopSummary = ({
	view,
	stats,
}: {
	view: ViewType;
	stats: DashboardStats;
}) => {
	return (
		<div className="px-4 md:px-8 py-4 bg-white border-b border-slate-200 relative z-10 shadow-sm">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<h2 className="text-xl font-bold text-slate-800">
					{view === "DASHBOARD" && "プロジェクト概要"}
					{view === "BOARD" && "進行状況ボード"}
					{view === "LIST" && "タスク・リスト"}
					{view === "MEMBERS" && "メンバー管理"}
				</h2>
				<div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
					<div className="bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100 flex items-center gap-2 whitespace-nowrap">
						<span className="w-2 h-2 bg-amber-500 rounded-full"></span>
						<span className="text-xs font-bold text-amber-800">
							進行中: {stats.active}
						</span>
					</div>
					<div className="bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 flex items-center gap-2 whitespace-nowrap">
						<span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
						<span className="text-xs font-bold text-rose-800">
							至急: {stats.urgent}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
