import React from "react";
import { ViewType } from "../types";

interface NavItem {
	id: ViewType;
	label: string;
	icon: string;
}

interface MobileNavProps {
	view: ViewType;
	setView: (view: ViewType) => void;
}

const NAV_ITEMS: NavItem[] = [
	{
		id: "DASHBOARD",
		label: "概要",
		icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
	},
	{
		id: "BOARD",
		label: "進行",
		icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h2a2 2 0 00-2 2",
	},
	{
		id: "LIST",
		label: "タスク",
		icon: "M4 6h16M4 10h16M4 14h16M4 18h16",
	},
	{
		id: "MEMBERS",
		label: "チーム",
		icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
	},
];

export const MobileNav = ({ view, setView }: MobileNavProps) => {
	return (
		<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center px-4 py-4 z-50 safe-area-bottom">
			{NAV_ITEMS.map((item) => (
				<button
					key={item.id}
					onClick={() => setView(item.id)}
					className={`flex flex-col items-center gap-1 transition-all ${
						view === item.id
							? "text-amber-500 scale-110"
							: "text-slate-300"
					}`}
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={item.icon}
						></path>
					</svg>
					<span className="text-[10px] font-black uppercase tracking-widest">
						{item.label}
					</span>
				</button>
			))}
		</nav>
	);
};
