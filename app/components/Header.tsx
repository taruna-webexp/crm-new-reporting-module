"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import type { HeaderProps } from "../types/components";

const Header: React.FC<HeaderProps> = ({
  title = "Dashboard",
  onToggleSidebar,
}) => {
  const [search, setSearch] = useState("");

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: "#fff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", px: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton onClick={onToggleSidebar} sx={{ color: "inherit" }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ fontWeight: 600 }} color="primary">
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ width: 250, display: { xs: "none", sm: "block" } }}>
            <TextField
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              fullWidth
              slotProps={{
                input: {
                  startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                },
              }}
            />
          </Box>


          <IconButton sx={{ color: "#757575" }}>
            <NotificationsIcon />
          </IconButton>

          <Avatar
            sx={{ bgcolor: "primary.main", cursor: "pointer", width: 34, height: 34 }}
          >
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
