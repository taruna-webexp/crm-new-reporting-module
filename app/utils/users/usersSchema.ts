import { UIOption } from "@/app/types/ui";

export const userRoleSchema: UIOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const userStatusSchema: UIOption[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

export const userDepartmentSchema: UIOption[] = [
  { value: "Department 1", label: "Department 1" },
  { value: "Department 2", label: "Department 2" },
  { value: "Department 3", label: "Department 3" },
  { value: "Department 4", label: "Department 4" },
];
