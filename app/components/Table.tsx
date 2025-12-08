"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./controllers/Table";
import {
  Paper,
  Pagination,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreIcon } from "@mui/icons-material";
import { EditIcon, DeleteIcon } from "./icons";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: string | number;
}

interface DataTableProps<T> {
  data: T[];
  loading?: boolean;
  columns: Column<T>[];
  totalRecord?: number;
  page?: number;
  setPage?: (page: number) => void;
  length?: number;
  className?: string;

  showActions?: boolean;
  actionsPosition?: "first" | "last";
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function DataTable<T>({
  data,
  loading = false,
  columns,
  totalRecord = 0,
  page = 1,
  setPage,
  length = 10,
  className,
  showActions = false,
  actionsPosition = "last",
  onEdit,
  onDelete,
}: DataTableProps<T>) {
  const pageCount = Math.ceil(totalRecord / length);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const ActionDropdown = (row: T) => (
    <>
      <IconButton
        size="small"
        onClick={(e) => handleOpenMenu(e, row)}
        aria-label="Actions"
      >
        <MoreIcon />
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        {onEdit && (
          <MenuItem
            onClick={() => {
              onEdit(selectedRow as T);
              handleCloseMenu();
            }}
          >
            <EditIcon style={{ fontSize: 18 }} className="mr-2" />
            Edit
          </MenuItem>
        )}
        {onDelete && (
          <MenuItem
            onClick={() => {
              onDelete(selectedRow as T);
              handleCloseMenu();
            }}
          >
            <DeleteIcon style={{ fontSize: 18 }} className="mr-2" />
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );

  return (
    <Paper className={`p-4 space-y-4 ${className || ""}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {showActions && actionsPosition === "first" && (
              <TableHead style={{ width: 80 }}>Actions</TableHead>
            )}

            {columns.map((col) => (
              <TableHead key={String(col.key)} style={{ width: col.width }}>
                {col.label}
              </TableHead>
            ))}

            {showActions && actionsPosition === "last" && (
              <TableHead style={{ width: 80 }}>Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={columns.length + (showActions ? 1 : 0)} className="text-center py-4">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          )}

          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length + (showActions ? 1 : 0)} className="text-center py-3">
                No results found
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            data.map((row, index) => (
              <TableRow key={index}>
                {showActions && actionsPosition === "first" && (
                  <TableCell>{ActionDropdown(row)}</TableCell>
                )}

                {columns.map((col) => (
                  <TableCell key={String(col.key)}>
                    {col.render ? (
                      col.render(row)
                    ) : (
                      (row as any)[col.key] instanceof Array && col.key === "techStack" ? (
                        (row as any)[col.key]
                          .map((tech: { label: string }) => tech.label) // Explicitly type 'tech'
                          .join(", ")
                      ) : (
                        (row as any)[col.key] ?? "-"
                      )
                    )}
                  </TableCell>
                ))}

                {showActions && actionsPosition === "last" && (
                  <TableCell>{ActionDropdown(row)}</TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>


      </Table>

      {pageCount > 1 && setPage && (
        <Pagination
          page={page}
          count={pageCount}
          onChange={(e, v) => setPage(v)}
          shape="rounded"
          color="primary"
        />
      )}
    </Paper>
  );
}
