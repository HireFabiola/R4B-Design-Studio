// Import the configured API client for making HTTP requests to the backend API
import apiClient from "../api/apiClients";
import type { Project } from "../types/Project";

// Function to fetch all projects from the API. It makes a GET request to the "/projects" endpoint and returns the data as an array of Project objects.
export const getProjects = async (): Promise<Project[]> => {
  const response = await apiClient.get<Project[]>("/projects");
  return response.data;
};