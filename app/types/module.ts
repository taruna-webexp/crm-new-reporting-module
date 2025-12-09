export type ModuleFormValues = {
  projectName: string;
  projectType?: string;
  authType: string;
  priority: string;
  moduleName?: string;
  status: string;
};

export interface ModuleTableData {
  id?: string | number;
  projectName: string;
  moduleName?: string;
  authType?: string;
  priority?: string;
  status?: string;
  projectType?: string;
}
