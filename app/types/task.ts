// app/types/task.ts

export interface TaskFormValues {
  // Basic
  taskTitle: string;
  taskDescription: string;
  acceptanceCriteria?: string; // NAYA ADDED
  project: string;
  module: string;
  taskType: "bug" | "feature" | "task" | "improvement";
  priority: "low" | "medium" | "high" | "critical";
  tag?: string; // NAYA ADDED (agar single tag chahiye)

  // Assignment
  assignedDeveloper: string;
  reviewer: string;
  qaOwner: string;

  // Dates & Points
  startDate?: string;
  dueDate?: string;
  storyPoints?: string;

  // Labels & Extra
  labels?: string;
  comments?: string;
  attachments?: string;

  // Estimation
  tlEstimate: string;
  allowDeveloperEstimate: boolean;
  developerEstimate: string;
  finalEstimate: string;

  // Control & Dependency
  blocked: boolean; // (checkbox ke liye)
  blockedReason?: string;
  dependsOnTasks?: string | string[]; //] bana do agar multiple
  createdAt: string;
  // Status (hidden ya default)
  status: "pending" | "in-progress" | "review" | "completed";
}

export interface Task extends TaskFormValues {
  id: string;
  createdAt: string;
}
