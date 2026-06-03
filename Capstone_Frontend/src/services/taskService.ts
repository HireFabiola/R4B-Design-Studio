import apiClient from "../api/apiClients";
import type { Task } from "../types/Tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>("/tasks");
  return response.data;
};