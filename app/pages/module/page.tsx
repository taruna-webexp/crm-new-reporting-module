"use client";

import { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import DataTable from "@/app/components/Table";
import ConfirmationModal from "@/app/components/controllers/ConfirmationModal";
import { useRouter } from "next/navigation";
import { ModuleTableData } from "@/app/types/module";
import { moduleColumns, moduleData } from "@/app/utils/module/moduleTableData";

const Modules = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(moduleData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(moduleData.length);
  const [openModal, setOpenModal] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleTableData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => fetchData(page), 400);
    return () => clearTimeout(delay);
  }, [searchQuery, page]);

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const filtered = moduleData.filter(module =>
        module.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filtered);
      setTotal(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (module: any) => {
    setSelectedModule(module);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    setProducts(prevState => prevState.filter(module => module.id !== selectedModule?.id));
    setOpenModal(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedModule(null);
  };

  const handleEdit = (module: ModuleTableData) => {
    localStorage.setItem("selectedModule", JSON.stringify(module));
    router.push(`/pages/module/edit-module/${module.id}`);
  };

  return (
    <Paper className="p-4 space-y-4">
      <TextField
        label="Search Modules"
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
        columns={moduleColumns}
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
        confirmationHeading="Delete Module"
        message="Are you sure you want to delete this module?"
      />
    </Paper>
  );
};

export default Modules;
