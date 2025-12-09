export type ProjectsFormValues = {
  id?: string;
  projectName?: string;
  projectCode?: string;
  projectType?: string;
  clientName?: string;
  projectCategory?: string;
  projectOwner?: string;
  techStack?: (string | undefined)[];
  startDate?: string;
  endDate?: string;
  owner?: string;
  billingModel?: string;
  description?: string;
  status?: string;
};

interface TechStack {
  key: string;
  label: string;
}

export interface ProjectsTableData {
  id: string;
  projectName: string;
  projectCode: string;
  projectType: string;
  clientName: string;
  projectCategory: string;
  projectOwner: string;
  techStack: string[];
  owner: string;
  startDate: string;
  endDate: string;
  billingModel: string;
  description: string;
  status: string;
}
