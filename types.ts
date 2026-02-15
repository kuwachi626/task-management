export type TaskStatus = "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type ViewType = "DASHBOARD" | "BOARD" | "LIST" | "MEMBERS";

export interface Member {
	id: string;
	name: string;
	affiliation: string; // 所属
	role: string; // 担当範囲・役割
	avatar: string;
	email: string;
}

export interface Task {
	id: string;
	title: string;
	description: string;
	status: TaskStatus;
	priority: Priority;
	assignedTo: string; // Member ID
	dueDate: string;
	createdAt: string;
}

export interface AppState {
	members: Member[];
	tasks: Task[];
}

export interface DashboardStats {
	total: number;
	active: number;
	done: number;
	urgent: number;
	membersCount: number;
}
