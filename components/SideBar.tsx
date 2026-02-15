import { ViewType } from "@/types";

interface SidebarProps {
	view: ViewType;
	setView: (view: ViewType) => void;
}

const NAV_ITEMS = [
	{
		id: "DASHBOARD" as const,
		label: "ダッシュボード",
		icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
	},
	{
		id: "BOARD" as const,
		label: "進行状況",
		icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h2a2 2 0 00-2 2",
	},
	{
		id: "LIST" as const,
		label: "全タスク",
		icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
	},
	{
		id: "MEMBERS" as const,
		label: "メンバー",
		icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
	},
];

// 普通の関数として定義し、Propsに型を当てる
export const Sidebar = ({ view, setView }: SidebarProps) => {
	return (
		<nav className="hidden md:flex w-64 bg-[#0F172A] text-white p-6 min-h-screen flex-col sticky top-0 z-40">
			<div className="flex flex-col gap-1 mb-10">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-amber-400 rounded-full blur-[2px] animate-pulse"></div>
					<h1 className="text-2xl font-bold tracking-wider text-amber-50">
						HOTARU
					</h1>
				</div>
				<p className="text-[10px] text-amber-400/60 font-bold uppercase tracking-widest pl-11">
					ASTRAIS Group
				</p>
			</div>

			<div className="space-y-1 flex-1">
				{NAV_ITEMS.map((item) => (
					<button
						key={item.id}
						onClick={() => setView(item.id)}
						className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
							view === item.id
								? "bg-white/10 text-amber-400"
								: "hover:bg-white/5 opacity-70"
						}`}
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
								d={item.icon}
							/>
						</svg>
						{item.label}
					</button>
				))}
			</div>

			<div className="mt-auto pt-6 border-t border-white/10 text-center">
				<p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
					© 2024 ASTRAIS ADMIN
				</p>
			</div>
		</nav>
	);
};
