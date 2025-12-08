"use client";

import { Stack, Button } from "@mui/material";
import { useNotify } from "@/app/utils/notify";

export default function ToasterDemo() {
  const notify = useNotify();

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        color="success"
        onClick={() =>
          notify.success({
            title: "Operation Successful 🎉",
            message: "Employee added successfully!",
          })
        }
      >
        Success Toast
      </Button>

      <Button
        variant="contained"
        color="warning"
        onClick={() =>
          notify.warn({
            title: "Heads Up",
            message: "Password is weak!",
          })
        }
      >
        Warn Toast
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={() =>
          notify.error({
            title: "Error!",
            message: "Unable to process the request ❌",
          })
        }
      >
        Error Toast
      </Button>
    </Stack>
  );
}
