import { DashboardStats } from "@/types";

export const DashboardView = ({ stats }: { stats: DashboardStats }) => {
	return (
		<div className="space-y-6 max-w-6xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
					<div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-widest">
						完了状況
					</div>
					<div className="flex items-end justify-between mb-4">
						<span className="text-4xl font-black text-slate-800">
							{Math.round((stats.done / stats.total) * 100) || 0}%
						</span>
						<span className="text-[10px] text-slate-400 font-bold">
							{stats.done}/{stats.total} 完了済
						</span>
					</div>
					<div className="h-2 bg-slate-100 rounded-full overflow-hidden">
						<div
							className="h-full bg-amber-500 rounded-full"
							style={{
								width: `${(stats.done / stats.total) * 100}%`,
							}}
						></div>
					</div>
				</div>
				<div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 md:col-span-2">
					<div className="text-slate-400 text-[10px] font-black uppercase mb-4 tracking-widest">
						最近のハイライト
					</div>
					<div className="space-y-3">
						<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
							<div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
							<p className="text-xs font-bold text-slate-700">
								プロジェクトが順調に進行しています。
							</p>
						</div>
						<div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl">
							<div className="w-1.5 h-1.5 bg-rose-500 rounded-full"></div>
							<p className="text-xs font-bold text-slate-700">
								至急タスクが {stats.urgent}{" "}
								件あります。確認してください。
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
