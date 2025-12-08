"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";
import { UIInputProps } from "../../types/ui";

const InputController: React.FC<UIInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled,
  required,
  className,
  rows = 4
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={`${className ?? "w-full mb-0"}`}>
          <TextField
            {...field}
            label={label}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            error={!!fieldState.error}
            helperText={fieldState.error?.message || ""}
            fullWidth
            size="small"
            multiline={type === "textarea"}
            rows={type === "textarea" ? rows : undefined}
          />
        </div>
      )}
    />
  );
};

export default InputController;
