"use client";
import React from "react";
import Drawer from "@mui/material/Drawer";
import SidebarContent from "./SidebarContent";
import type { SidebarProps } from "../types/components";
import { useMediaQuery, useTheme } from "@mui/material";

const drawerWidth = 260;

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={isMobile ? onClose : undefined}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#1c1917",
          color: "white",
          ...(isMobile
            ? {}
            : {
                top: "67px",
                height: "calc(100% - 67px)",
                borderRight: "1px solid #e5e5e5",
              }),
        },
      }}
    >
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
