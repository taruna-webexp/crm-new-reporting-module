// app/lib/project-store.ts
import { ProjectsFormValues } from "@/app/types/projects";

const STORAGE_KEY = "aceflow_projects";

export const getAllProjects = (): ProjectsFormValues[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getProjectById = (id: string): ProjectsFormValues | undefined => {
  return getAllProjects().find(p => p.id === id);
};

export const addProject = (project: Omit<ProjectsFormValues, "id">): ProjectsFormValues => {
  const projects = getAllProjects();
  const newProject = {
    ...project,
    id: Date.now().toString(),
  };
  projects.push(newProject);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return newProject;
};

export const updateProject = (
  id: string,
  updatedData: Partial<ProjectsFormValues>,
): ProjectsFormValues | null => {
  const projects = getAllProjects();
  const index = projects.findIndex(p => p.id === id);
  if (index === -1) return null;

  projects[index] = { ...projects[index], ...updatedData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return projects[index];
};

export const deleteProject = (id: string): boolean => {
  const projects = getAllProjects().filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  return true;
};
