// app/tasks/page.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { Paper, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "@/app/components/Table";
import ConfirmationModal from "@/app/components/controllers/ConfirmationModal";
import { useRouter } from "next/navigation";
import { Task } from "@/app/types/task";
import { taskColumnsCompact } from "@/app/utils/task/taskTableData";
import { getTasks, deleteTask } from "@/app/lib/task-store";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const router = useRouter();

  // Load tasks once
  useEffect(() => {
    const loadedTasks = getTasks();
    setTasks(loadedTasks);
    setLoading(false);
  }, []);

  // Optimized filtering with useMemo
  const filteredTasks = useMemo(() => {
    if (!searchQuery) return tasks;

    const query = searchQuery.toLowerCase();
    return tasks.filter(
      task =>
        task.taskTitle.toLowerCase().includes(query) ||
        task.id.toLowerCase().includes(query) ||
        task.taskDescription.toLowerCase().includes(query) ||
        task.assignedDeveloper.toLowerCase().includes(query) ||
        task.module.toLowerCase().includes(query) ||
        task.tag?.toLowerCase().includes(query),
    );
  }, [tasks, searchQuery]);

  // Reset page on search
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const handleDelete = (task: Task) => {
    setTaskToDelete(task);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTasks(prev => prev.filter(t => t.id !== taskToDelete.id));
    }
    setOpenModal(false);
    setTaskToDelete(null);
  };

  const handleEdit = (task: Task) => {
    router.push(`/pages/task/edit-task/${task.id}`);
  };

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <Typography variant="h4" className="font-bold text-gray-900">
            Tasks
          </Typography>
          <Typography variant="body2" className="text-gray-600 mt-1">
            Manage and track all project tasks in one place
          </Typography>
        </div>

        <Paper className="shadow-sm border border-gray-200">
          {/* Toolbar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <TextField
                label="Search Tasks"
                placeholder="Search by title, ID, developer, module..."
                size="small"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:max-w-sm"
                variant="outlined"
              />

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => router.push("/pages/task/add-task")}
                className="bg-blue-600 hover:bg-blue-700 normal-case font-medium"
              >
                New Task
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {filteredTasks.length === 0 ? (
              <Box className="p-16 text-center">
                <Typography variant="h6" color="text.secondary" className="mb-2">
                  {searchQuery ? "No tasks found matching your search" : "No tasks yet"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Create your first task to get started!"}
                </Typography>
              </Box>
            ) : (
              <DataTable
                data={filteredTasks}
                columns={taskColumnsCompact}
                loading={loading}
                totalRecord={filteredTasks.length}
                page={page}
                setPage={setPage}
                length={10}
                showActions={true}
                actionsPosition="last"
                onEdit={row => handleEdit(row as Task)}
                onDelete={row => handleDelete(row as Task)}
              />
            )}
          </div>
        </Paper>

        {/* Delete Confirmation */}
        <ConfirmationModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onConfirm={confirmDelete}
          confirmationHeading="Delete Task"
          message="Are you sure you want to delete this task?"
        />
      </div>
    </>
  );
}
