import React, { useState, useEffect } from "react";
import { Member } from "../types";

interface MemberModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (member: Member) => void;
	initialMember?: Member;
}

const MemberModal: React.FC<MemberModalProps> = ({
	isOpen,
	onClose,
	onSave,
	initialMember,
}) => {
	const [formData, setFormData] = useState<Omit<Member, "id">>({
		name: "",
		department: "",
		role: "",
		email: "",
		avatar: "👤",
	});

	useEffect(() => {
		if (initialMember) {
			setFormData(initialMember);
		} else {
			setFormData({
				name: "",
				department: "",
				role: "",
				email: "",
				avatar: "👤",
			});
		}
	}, [initialMember, isOpen]);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({
			...formData,
			id: initialMember?.id || Math.random().toString(36).substr(2, 9),
		});
		onClose();
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 overflow-y-auto">
			<div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300 my-auto">
				<div className="px-10 py-8 bg-[#0F172A] text-white flex justify-between items-center">
					<h3 className="text-2xl font-black tracking-tight">
						{initialMember ? "プロフ編集" : "新規メンバー"}
					</h3>
					<button
						onClick={onClose}
						className="text-slate-400 hover:text-white p-2"
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
								d="M6 18L18 6M6 6l12 12"
							></path>
						</svg>
					</button>
				</div>

				<form onSubmit={handleSubmit} className="p-10 space-y-6">
					<div className="flex flex-col items-center gap-4 mb-8">
						<div className="w-24 h-24 rounded-[2rem] bg-slate-100 flex items-center justify-center text-4xl shadow-inner border border-slate-200">
							{formData.avatar.startsWith("http") ? (
								<img
									src={formData.avatar}
									alt=""
									className="w-full h-full object-cover rounded-[2rem]"
								/>
							) : (
								formData.avatar || "👤"
							)}
						</div>
						<div className="w-full">
							<label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest text-center">
								プロフィール絵文字
							</label>
							<input
								type="text"
								className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-2xl text-center"
								value={formData.avatar}
								onChange={(e) =>
									setFormData({
										...formData,
										avatar: e.target.value,
									})
								}
								placeholder="😊"
								maxLength={100}
							/>
							<p className="text-[10px] text-slate-400 text-center mt-2 font-bold uppercase tracking-tight">
								お好きな絵文字を入力してください
							</p>
						</div>
					</div>

					<div className="space-y-4">
						<div>
							<label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">
								氏名
							</label>
							<input
								type="text"
								required
								className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								placeholder="山田 太郎"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">
									所属
								</label>
								<input
									type="text"
									required
									className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold"
									value={formData.department}
									onChange={(e) =>
										setFormData({
											...formData,
											department: e.target.value,
										})
									}
									placeholder="開発"
								/>
							</div>
							<div>
								<label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">
									役割
								</label>
								<input
									type="text"
									className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-slate-800 font-bold"
									value={formData.role}
									onChange={(e) =>
										setFormData({
											...formData,
											role: e.target.value,
										})
									}
									placeholder="担当"
								/>
							</div>
						</div>
					</div>

					<div className="pt-8 flex gap-4">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-5 text-slate-400 font-black uppercase tracking-widest hover:text-slate-600"
						>
							閉じる
						</button>
						<button
							type="submit"
							className="flex-1 py-5 bg-amber-500 text-white font-black uppercase tracking-widest rounded-[1.5rem] hover:bg-amber-600 shadow-lg shadow-amber-200 transition-all active:scale-95"
						>
							保存
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MemberModal;
