"use client";

import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        py: 3,
        borderTop: "1px solid",
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
        mt: "auto",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center", // ✅ Center Entire Content
          alignItems: "center", // ✅ Vertical Center
          flexDirection: "column", // Stack in center
          textAlign: "center", // Text center
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight="600">
            ERP System
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
