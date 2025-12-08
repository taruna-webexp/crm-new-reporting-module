"use client";

import { useEffect, useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import DataTable from "@/app/components/Table";
import { userColumns, usersData } from "@/app/utils/users/usersTableData";
import ConfirmationModal from "@/app/components/controllers/ConfirmationModal";
import { UsersTableData } from "@/app/types/ui";
import { useRouter } from "next/navigation";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(usersData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(usersData.length);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersTableData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => fetchData(page), 400);
    return () => clearTimeout(delay);
  }, [searchQuery, page]);

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const filtered = usersData.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filtered);
      setTotal(filtered.length);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user: any) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const confirmDelete = () => {
    setProducts(prevState => prevState.filter(user => user.id !== selectedUser?.id));
    setOpenModal(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleEdit = (user: UsersTableData) => {
    localStorage.setItem("selectedUser", JSON.stringify(user));
    router.push(`/pages/users/edit-user/${user.id}`);
  };

  return (
    <Paper className="p-4 space-y-4">
      <TextField
        label="Search Users"
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
        columns={userColumns}
        totalRecord={total}
        actionsPosition="first"
        page={page}
        showActions={true}
        setPage={setPage}
        length={10}
        onView={row => router.push(`/pages/users/edit-user/${row.id}/dashboard`)}
        onEdit={row => {
          console.log("Edit", row);
          handleEdit(row);
        }}
        onDelete={row => handleDelete(row)} // Trigger delete
      />

      <ConfirmationModal
        open={openModal}
        onClose={handleModalClose}
        onConfirm={confirmDelete}
        confirmationHeading="Delete User"
        message="Are you sure you want to delete this user?"
      />
    </Paper>
  );
};

export default Users;
