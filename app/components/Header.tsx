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
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import type { HeaderProps } from "../types/components";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Header: React.FC<HeaderProps> = ({ title = "Dashboard", onToggleSidebar }) => {
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  // Open dropdown
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close dropdown
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    signOut();
    router.push("/login");
    // Add your logout logic here
  };

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
          {/* Search bar */}
          <Box sx={{ width: 250, display: { xs: "none", sm: "block" } }}>
            <TextField
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
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

          {/* Avatar + Dropdown */}
          <Avatar
            sx={{ bgcolor: "primary.main", cursor: "pointer", width: 34, height: 34 }}
            onClick={handleOpenMenu}
          >
            U
          </Avatar>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>

            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
