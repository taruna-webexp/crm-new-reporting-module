"use client";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ProgressLoader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      py={2}
      width="100%"
    >
      <CircularProgress enableTrackSlot size="3rem" />
    </Box>
  );
}
