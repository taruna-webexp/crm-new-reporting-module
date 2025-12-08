"use client";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

type DateTimeControllerProps = {
  name: string;
  label: string;
  type?: "date" | "time" | "datetime-local";
  className?: string;
};

export default function DateTimeController({
  name,
  label,
  type = "date",
  className = "",
}: DateTimeControllerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          className={className}
          InputLabelProps={{ shrink: true }}
          error={!!fieldError}
          helperText={fieldError}
          fullWidth
        />
      )}
    />
  );
}
