import { DashboardStats } from "@/types";

export const DashboardView = ({ stats }: { stats: DashboardStats }) => {
	return (
		<div className="space-y-6 max-w-6xl mx-auto">
			<div className="bg-gradient-to-br from-indigo-900 to-[#0F172A] p-8 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden">
				<div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
				<div className="relative z-10">
					<h3 className="text-2xl font-bold mb-2">
						HOTARU モバイル導入手順
					</h3>
					<p className="text-slate-400 text-sm mb-6 max-w-md">
						ブラウザのメニューから「ホーム画面に追加」を選択することで、アプリとしてホーム画面から起動できます。
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
							<p className="text-amber-400 font-black text-xs mb-1 uppercase tracking-widest">
								iOS (Safari)
							</p>
							<p className="text-sm">
								共有ボタン [↑] ＞ <b>ホーム画面に追加</b>
							</p>
						</div>
						<div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
							<p className="text-amber-400 font-black text-xs mb-1 uppercase tracking-widest">
								Android (Chrome)
							</p>
							<p className="text-sm">
								設定メニュー [︙] ＞ <b>アプリをインストール</b>
							</p>
						</div>
					</div>
				</div>
			</div>

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
