export type ProjectsFormValues = {
  projectName: string;
  projectCode: string;
  projectType: string;
  clientName: string;
  projectCategory: string;
  projectOwner: string;
  techStack: (string | undefined)[];
  startDate: string;
  endDate: string;
};

interface TechStack {
  key: string;
  label: string;
}

export interface ProjectsTableData {
  id: number;
  projectName: string;
  projectCode: string;
  projectType: string;
  clientName: string;
  projectCategory: string;
  projectOwner: string;
  techStack: TechStack[];
  startDate: string;
  endDate: string;
  billingModel: string;
  description: string;
  status: string;
}
