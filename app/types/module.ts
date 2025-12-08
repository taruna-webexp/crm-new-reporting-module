export type ModuleFormValues = {
  projectName: string;
  moduleName: string;
  authType: string;
  priority: string;
  status: string;
};

export interface ModuleTableData {
  id: number;
  projectName: string;
  moduleName: string;
  authType: string;
  priority: string;
  status: string;
}
