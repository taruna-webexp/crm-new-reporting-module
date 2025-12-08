"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Label from "../typography/Label";
import { UICheckboxProps } from "../../types/ui";

const CheckboxController: React.FC<UICheckboxProps> = ({
  name,
  label,
  disabled,
  className,
}) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <div className={className}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  disabled={disabled}
                />
              }
              label={label}
              sx={{
                "& .MuiFormControlLabel-label": {
                  color: disabled ? "#9ca3af" : "#646465"
                }
              }}
            />

            {errors[name]?.message && (
              <Label
                labelText={String(errors[name]?.message)}
                size="sm"
                color="error"
                className="mt-1"
              />
            )}
          </>
        )}
      />
    </div>
  );
};

export default CheckboxController;
