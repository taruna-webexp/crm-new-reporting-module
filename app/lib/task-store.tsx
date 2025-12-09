// lib/taskStore.ts
import { Task, TaskFormValues } from "@/app/types/task";
import { dummyTasks } from "../utils/task/taskTableData";

const TASKS_KEY = "aceflow_tasks";

export const getTasks = (): Task[] => {
  if (typeof window === "undefined") return dummyTasks;
  const saved = localStorage.getItem(TASKS_KEY);
  return saved ? JSON.parse(saved) : dummyTasks;
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const addTask = (data: TaskFormValues): Task => {
  const tasks = getTasks();
  const newTask: Task = { ...data, id: Date.now().toString() };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id: string, data: Partial<TaskFormValues>): Task | undefined => {
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return undefined;
  tasks[index] = { ...tasks[index], ...data };
  saveTasks(tasks);
  return tasks[index];
};

export const deleteTask = (id: string): void => {
  saveTasks(getTasks().filter(t => t.id !== id));
};

export const getTaskById = (id: string): Task | undefined => {
  return getTasks().find(t => t.id === id);
};
