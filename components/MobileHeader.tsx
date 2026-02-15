export const MobileHeader = () => {
	return (
		<header className="md:hidden bg-[#0F172A] text-white p-4 flex items-center justify-between sticky top-0 z-50">
			<div className="flex items-center gap-2">
				<div className="w-5 h-5 bg-amber-400 rounded-full blur-[1px]"></div>
				<h1 className="text-xl font-bold tracking-wide">HOTARU</h1>
			</div>
			<div className="text-[10px] text-amber-400 font-black px-2 py-1 bg-white/10 rounded-full">
				ASTRAIS
			</div>
		</header>
	);
};
