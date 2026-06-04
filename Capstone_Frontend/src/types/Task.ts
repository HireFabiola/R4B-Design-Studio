import type { Project } from "./Project";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "complete";
  dueDate?: string;
  projectId: string | Project;
  createdAt: string;
  updatedAt: string;
}