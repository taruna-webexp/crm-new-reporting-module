import { UsersTableData } from "../../types/ui";

export const userColumns = [
  { key: "name", label: "Name" },
  { key: "slackId", label: "Slack Id" },
  { key: "status", label: "Status" },
  { key: "department", label: "Department" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "file", label: "File" },
];

export const usersData: UsersTableData[] = [
  {
    id: 1,
    name: "Taylor Paul",
    status: "active",
    department: "Department 1",
    slackId: "9087",
    userFile: "",
    phone: "9876543210",
    email: "admin@example.com",
    password: "password"
  },
  {
    id: 2,
    name: "Maria Johnson",
    status: "pending",
    department: "Department 2",
    slackId: "9087",
    userFile: "",
    phone: "9876543210",
    email: "admin@example.com",
    password: "password"
  },
  {
    id: 3,
    name: "Ethan Walker",
    status: "inactive",
    department: "Department 3",
    slackId: "9087",
    userFile: "",
    phone: "9876543210",
    email: "admin@example.com",
    password: "password"
  },
  {
    id: 4,
    name: "Sophia Davis",
    status: "active",
    department: "Department 4",
    slackId: "9087",
    userFile: "",
    phone: "9876543210",
    email: "admin@example.com",
    password: "password"
  },
];