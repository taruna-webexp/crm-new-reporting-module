"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export interface DynamicTabItem {
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface DynamicTabsProps {
  tabs: DynamicTabItem[];
  value: number; // controlled
  onChange: (index: number) => void;
  className?: string;
}

export default function DataTabs({ tabs, value, onChange, className }: DynamicTabsProps) {
  return (
    <Box className={className}>
      <Tabs
        value={value}
        onChange={(_e, newIndex) => onChange(newIndex)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, i) => (
          <Tab key={i} label={tab.label} disabled={tab.disabled} />
        ))}
      </Tabs>

      <Box mt={2}>{tabs[value].content}</Box>
    </Box>
  );
}
