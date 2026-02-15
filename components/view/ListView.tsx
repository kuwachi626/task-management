import { Task, Member } from "../../types";
import { STATUS_LABELS, PRIORITY_LABELS } from "../../constants";
import { Avatar } from "../Avatar";

interface ListViewProps {
	tasks: Task[];
	getMemberById: (id: string) => Member | undefined;
	onEditTask: (task: Task) => void;
}

export const ListView = ({
	tasks,
	getMemberById,
	onEditTask,
}: ListViewProps) => {
	return (
		<div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden max-w-6xl mx-auto">
			<div className="overflow-x-auto">
				<table className="w-full text-left">
					<thead>
						<tr className="bg-slate-50/50 border-b border-slate-100">
							<th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
								タスク名
							</th>
							<th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
								状況
							</th>
							<th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
								担当
							</th>
							<th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
								期限
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-50">
						{tasks.map((task) => {
							const assignee = getMemberById(task.assignedTo);
							return (
								<tr
									key={task.id}
									className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
									onClick={() => onEditTask(task)}
								>
									<td className="px-8 py-5">
										<div className="font-bold text-slate-800">
											{task.title}
										</div>
										<div className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest">
											{
												PRIORITY_LABELS[task.priority]
													.label
											}{" "}
											優先
										</div>
									</td>
									<td className="px-8 py-5">
										<span
											className={`px-3 py-1.5 rounded-xl text-[10px] font-black border border-current ${
												STATUS_LABELS[task.status].color
											}`}
										>
											{STATUS_LABELS[task.status].label}
										</span>
									</td>
									<td className="px-8 py-5">
										{assignee ? (
											<div className="flex items-center gap-3">
												<Avatar
													avatar={assignee.avatar}
													className="w-7 h-7 !text-xs"
												/>
												<span className="text-xs font-bold text-slate-600">
													{assignee.name}
												</span>
											</div>
										) : (
											<span className="text-xs text-slate-300 italic">
												未割り当て
											</span>
										)}
									</td>
									<td className="px-8 py-5 text-xs font-bold text-slate-500">
										{task.dueDate.replace(/-/g, "/")}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{tasks.length === 0 && (
					<div className="py-20 text-center text-slate-400 font-bold text-sm">
						タスクが見つかりませんでした
					</div>
				)}
			</div>
		</div>
	);
};
