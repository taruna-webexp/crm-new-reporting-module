"use client";

import React from "react";
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import Label from "../typography/Label";

type Option = {
  value: string | number;
  label: string;
};

type UIRadioProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  options: Option[];
  row?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "radio" | "checkbox";
};

const RadioController = <T extends FieldValues>({
  name,
  label,
  options,
  row = false,
  disabled = false,
  className,
  type = "radio",
}: UIRadioProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleCheckboxChange = (
          e: React.ChangeEvent<HTMLInputElement>,
          checkedValue: string | number
        ) => {
          const current = (field.value ?? []) as (string | number)[];

          const newValue = e.target.checked
            ? [...current, checkedValue]
            : current.filter((v) => v !== checkedValue);

          field.onChange(newValue as PathValue<T, Path<T>>);
        };

        const isChecked = (optValue: string | number) => {
          return Array.isArray(field.value) && field.value.includes(optValue);
        };

        return (
          <FormControl component="fieldset" className={className} error={!!errors[name]}>
            {label && <FormLabel component="legend">{label}</FormLabel>}

            {type === "radio" ? (
              <RadioGroup row={row} value={field.value ?? ""} onChange={(e) => field.onChange(e.target.value)}>
                {options.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    value={opt.value}
                    control={<Radio disabled={disabled} />}
                    label={opt.label}
                    disabled={disabled}
                  />
                ))}
              </RadioGroup>
            ) : (
              <div className={row ? "flex flex-wrap gap-4" : ""}>
                {options.map((opt) => (
                  <FormControlLabel
                    key={opt.value}
                    control={
                      <Checkbox
                        checked={isChecked(opt.value)}
                        onChange={(e) => handleCheckboxChange(e, opt.value)}
                        disabled={disabled}
                      />
                    }
                    label={opt.label}
                  />
                ))}
              </div>
            )}

            {errors[name]?.message && (
              <Label labelText={String(errors[name]?.message)} size="sm" color="error" />
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default RadioController;