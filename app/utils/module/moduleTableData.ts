import { ModuleTableData } from "@/app/types/module";

export const moduleColumns = [
  { key: "projectName", label: "Project Name" },
  { key: "moduleName", label: "Module Name" },
  { key: "authType", label: "Authentication Type" },
  { key: "priority", label: "Prioriry" },
  { key: "status", label: "Status" },
];

export const moduleData: ModuleTableData[] = [
  {
    id: 1,
    projectName: "Project Type 1",
    moduleName: "WR-123",
    authType: "Auth 1",
    priority: "Priority Type 1",
    status: "In Progress",
  },
  {
    id: 2,
    projectName: "Project Type 2",
    moduleName: "WR-1234",
    authType: "Auth 2",
    priority: "Priority Type 2",
    status: "In Progress",
  },
  {
    id: 3,
    projectName: "Project Type 3",
    moduleName: "WR-12345",
    authType: "Auth 3",
    priority: "Priority Type 3",
    status: "In Progress",
  },
  {
    id: 4,
    projectName: "Project Type 4",
    moduleName: "WR-123456",
    authType: "Auth 4",
    priority: "Priority Type 4",
    status: "In Progress",
  },
];
