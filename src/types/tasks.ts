export type Status = "todo" | "in-progress" | "done";
export type Priority = "low" | "medium" | "high";
export type PriorityFilter = Priority | "all";

export interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
}
export interface Member {
  id: string;
  name: string;
  color: string; 
}