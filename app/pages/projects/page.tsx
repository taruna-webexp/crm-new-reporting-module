"use client";

import { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import DataTable from "@/app/components/Table";
import ConfirmationModal from "@/app/components/controllers/ConfirmationModal";
import { useRouter } from "next/navigation";
import { ProjectsTableData } from "@/app/types/projects";
import { projectColumns, projectsData } from "@/app/utils/projects/projectTableData";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(projectsData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(projectsData.length);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectsTableData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => fetchData(page), 400);
    return () => clearTimeout(delay);
  }, [searchQuery, page]);

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const filtered = projectsData.filter(project =>
        project.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filtered);
      setTotal(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (project: any) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    setProducts(prevState => prevState.filter(project => project.id !== selectedProject?.id));
    setOpenModal(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedProject(null);
  };

  const handleEdit = (project: ProjectsTableData) => {
    localStorage.setItem("selectedProject", JSON.stringify(project));
    router.push(`/pages/projects/edit-project/${project.id}`);
  };

  return (
    <Paper className="p-4 space-y-4">
      <TextField
        label="Search Projects"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={e => {
          setPage(1);
          setSearchQuery(e.target.value);
        }}
      />

      <DataTable
        data={products}
        loading={loading}
        columns={projectColumns}
        totalRecord={total}
        actionsPosition="first"
        page={page}
        showActions={true}
        setPage={setPage}
        length={10}
        onEdit={row => {
          console.log("Edit", row);
          handleEdit(row);
        }}
        onDelete={row => handleDelete(row)}
      />

      <ConfirmationModal
        open={openModal}
        onClose={handleModalClose}
        onConfirm={confirmDelete}
        confirmationHeading="Delete Project"
        message="Are you sure you want to delete this project?"
      />
    </Paper>
  );
};

export default Projects;
