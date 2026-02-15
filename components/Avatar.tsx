export const Avatar = ({
	avatar,
	className,
}: {
	avatar: string;
	className: string;
}) => (
	<div
		className={`${className} bg-slate-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-slate-100 overflow-hidden`}
	>
		{avatar.startsWith("http") ? (
			<img
				src={avatar}
				alt="avatar"
				className="w-full h-full object-cover"
			/>
		) : (
			<span>{avatar || "👤"}</span>
		)}
	</div>
);
