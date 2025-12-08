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
  { value: "department1", label: "Department 1" },
  { value: "department2", label: "Department 2" },
  { value: "department3", label: "Department 3" },
  { value: "department4", label: "Department 4" },
];