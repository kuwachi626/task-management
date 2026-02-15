import React, { useState, useMemo, useCallback } from "react";
import { DashboardStats, Member, Task, TaskStatus, ViewType } from "./types";
import { INITIAL_MEMBERS, INITIAL_TASKS } from "./constants";
import MemberModal from "./components/MemberModal";
import TaskModal from "./components/TaskModal";
import { Sidebar } from "./components/SideBar";
import { MobileHeader } from "./components/MobileHeader";
import { TopSummary } from "./components/TopSummary";
import { DashboardView } from "./components/view/DashboardView";
import { MembersView } from "./components/view/MembersView";
import { BoardView } from "./components/view/BoardView";
import { ListView } from "./components/view/ListView";
import { MobileNav } from "./components/MobileNav";

const App: React = () => {
	const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
	const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
	const [view, setView] = useState<ViewType>("DASHBOARD");
	const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
	const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
	const [editingMember, setEditingMember] = useState<Member | undefined>();
	const [editingTask, setEditingTask] = useState<Task | undefined>();
	const [searchQuery, setSearchQuery] = useState("");

	// メンバー管理ハンドラー
	const handleOpenMemberAdd = () => {
		setEditingMember(undefined);
		setIsMemberModalOpen(true);
	};

	const handleOpenMemberEdit = (member: Member) => {
		setEditingMember(member);
		setIsMemberModalOpen(true);
	};

	const handleSaveMember = useCallback((member: Member) => {
		setMembers((prev) => {
			const exists = prev.find((m) => m.id === member.id);
			if (exists)
				return prev.map((m) => (m.id === member.id ? member : m));
			return [...prev, member];
		});
		setEditingMember(undefined);
	}, []);

	// タスク管理ハンドラー
	const handleSaveTask = useCallback((task: Task) => {
		setTasks((prev) => {
			const exists = prev.find((t) => t.id === task.id);
			if (exists) return prev.map((t) => (t.id === task.id ? task : t));
			return [...prev, task];
		});
		setEditingTask(undefined);
	}, []);

	const filteredTasks = useMemo(() => {
		return tasks.filter(
			(t) =>
				t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				t.description.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [tasks, searchQuery]);

	const tasksByStatus = useMemo(() => {
		const map: Record<TaskStatus, Task[]> = {
			TODO: [],
			IN_PROGRESS: [],
			REVIEW: [],
			DONE: [],
		};
		filteredTasks.forEach((t) => map[t.status].push(t));
		return map;
	}, [filteredTasks]);

	const getMemberById = (id: string) => members.find((m) => m.id === id);

	const stats = useMemo((): DashboardStats => {
		return {
			total: tasks.length,
			active: tasks.filter((t) => t.status === "IN_PROGRESS").length,
			done: tasks.filter((t) => t.status === "DONE").length,
			urgent: tasks.filter(
				(t) => t.priority === "URGENT" && t.status !== "DONE",
			).length,
			membersCount: members.length,
		};
	}, [tasks, members]);

	return (
		<div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 pb-20 md:pb-0">
			<Sidebar view={view} setView={setView} />

			<MobileHeader />

			{/* Main Content */}
			<main className="flex-1 flex flex-col min-w-0 h-full md:h-screen overflow-hidden">
				<TopSummary view={view} stats={stats} />

				{/* Dynamic Content */}
				<div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50">
					{/* Dashboard View */}
					{view === "DASHBOARD" && <DashboardView stats={stats} />}

					{/* Members View */}
					{view === "MEMBERS" && (
						<MembersView
							members={members}
							tasks={tasks}
							onEdit={handleOpenMemberEdit}
							onAdd={handleOpenMemberAdd}
						/>
					)}

					{/* Progress View (Renamed Board) */}
					{view === "BOARD" && (
						<BoardView
							tasksByStatus={tasksByStatus}
							getMemberById={getMemberById}
							onEditTask={(task) => {
								setEditingTask(task);
								setIsTaskModalOpen(true);
							}}
						/>
					)}

					{/* List View */}
					{view === "LIST" && (
						<ListView
							tasks={filteredTasks}
							getMemberById={getMemberById}
							onEditTask={(task) => {
								setEditingTask(task);
								setIsTaskModalOpen(true);
							}}
						/>
					)}
				</div>

				{/* Floating Action Button */}
				<button
					onClick={() => {
						setEditingTask(undefined);
						setIsTaskModalOpen(true);
					}}
					className="md:hidden fixed bottom-24 right-6 w-16 h-16 bg-[#0F172A] text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 4v16m8-8H4"
						></path>
					</svg>
				</button>
			</main>

			<MobileNav view={view} setView={setView} />

			{/* Modals */}
			<MemberModal
				isOpen={isMemberModalOpen}
				onClose={() => {
					setIsMemberModalOpen(false);
					setEditingMember(undefined);
				}}
				onSave={handleSaveMember}
				initialMember={editingMember}
			/>
			<TaskModal
				isOpen={isTaskModalOpen}
				onClose={() => {
					setIsTaskModalOpen(false);
					setEditingTask(undefined);
				}}
				onSave={handleSaveTask}
				members={members}
				initialTask={editingTask}
			/>
		</div>
	);
};

export default App;
