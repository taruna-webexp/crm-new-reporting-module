"use client";

import { useEffect, useState } from "react";
import { Paper, TextField } from "@mui/material";
import { searchProducts } from "@/app/utils/api/product";
import DataTable from "@/app/components/Table";
import type { Product } from "@/app/types/ui";
import { columns } from "@/app/utils/productTableData";

const RemoteSearchTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => fetchData(page), 400);
    return () => clearTimeout(delay);
  }, [searchQuery, page]);

  const fetchData = async (pageNum: number) => {
    setLoading(true);
    try {
      const { products, total } = await searchProducts(searchQuery, pageNum);
      setProducts(products);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="p-4 space-y-4">
      <TextField
        label="Search Products"
        fullWidth
        size="small"
        value={searchQuery}
        onChange={(e) => {
          setPage(1);
          setSearchQuery(e.target.value);
        }}
      />

      <DataTable
        data={products}
        loading={loading}
        columns={columns}
        totalRecord={total}
        page={page}
        showActions={true}
        setPage={setPage}
        length={10}
        onEdit={(row) => {
         console.log("Edit", row);
        }}
        onDelete={async (row) => {
         console.log("Delete", row);
        }}
      />
    </Paper>
  );
};

export default RemoteSearchTable;
