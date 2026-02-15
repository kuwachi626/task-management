import { Avatar } from "../Avatar";
import { Task, TaskStatus, Member } from "../../types";
import { STATUS_LABELS, PRIORITY_LABELS } from "../../constants";

interface BoardViewProps {
	tasksByStatus: Record<TaskStatus, Task[]>;
	getMemberById: (id: string) => Member | undefined;
	onEditTask: (task: Task) => void;
}

export const BoardView = ({
	tasksByStatus,
	getMemberById,
	onEditTask,
}: BoardViewProps) => {
	return (
		<div className="flex gap-4 min-h-full overflow-x-auto pb-4 scrollbar-hide">
			{(Object.keys(STATUS_LABELS) as TaskStatus[]).map((status) => (
				<div
					key={status}
					className="w-[85vw] md:w-[340px] shrink-0 flex flex-col h-full"
				>
					{/* ステータス見出し */}
					<div className="flex items-center gap-2 mb-6 px-3">
						<span
							className={`w-2.5 h-2.5 rounded-full ${STATUS_LABELS[status].dot}`}
						></span>
						<h4 className="text-sm font-black text-slate-700 uppercase tracking-widest">
							{STATUS_LABELS[status].label}
						</h4>
						<span className="text-xs text-slate-400 font-bold ml-auto">
							{tasksByStatus[status].length}
						</span>
					</div>

					{/* タスクカードリスト */}
					<div className="space-y-4 flex-1">
						{tasksByStatus[status].map((task) => {
							const assignee = getMemberById(task.assignedTo);
							return (
								<div
									key={task.id}
									className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl transition-all cursor-pointer active:scale-[0.98]"
									onClick={() => onEditTask(task)}
								>
									<div className="mb-3">
										<span
											className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-slate-50 rounded-lg ${
												PRIORITY_LABELS[task.priority]
													.color
											}`}
										>
											{
												PRIORITY_LABELS[task.priority]
													.label
											}
										</span>
									</div>
									<h4 className="font-bold text-slate-800 mb-4 leading-relaxed">
										{task.title}
									</h4>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
											<svg
												className="w-3.5 h-3.5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
												></path>
											</svg>
											{task.dueDate.replace(/-/g, "/")}
										</div>
										{assignee && (
											<Avatar
												avatar={assignee.avatar}
												className="w-8 h-8 rounded-xl !text-sm"
											/>
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
};
