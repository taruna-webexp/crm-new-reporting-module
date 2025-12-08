"use client";

import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DateRange } from "react-date-range";
import TextField from "@mui/material/TextField";
import { Label } from "../typography";
import type { DateRangeValue } from "../../types/components";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Props = {
  name: string;
  label: string;
  validationSchema?: any;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

const DateRangeController: React.FC<Props> = ({
  name,
  label,
  className,
  disabled,
  required,
}) => {
  const { control, formState: { errors } } = useFormContext();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const { value, onChange } = field;

          const selectedRange = [
            {
              startDate: value?.startDate ? new Date(value.startDate) : new Date(),
              endDate: value?.endDate ? new Date(value.endDate) : new Date(),
              key: "selection",
            },
          ];

          const displayValue =
            value?.startDate && value?.endDate
              ? `${value.startDate} - ${value.endDate}`
              : "";

          const handleSelect = (ranges: any) => {
            const selection = ranges.selection;
            if (!selection) return;

            const newValue: DateRangeValue = {
              startDate: selection.startDate?.toISOString().split("T")[0],
              endDate: selection.endDate?.toISOString().split("T")[0],
            };

            onChange(newValue);
          };

          return (
            <>
              <TextField
                label={label}
                value={displayValue}
                placeholder="Select date range"
                onClick={() => setOpen((prev) => !prev)}
                fullWidth
                size="small"
                disabled={disabled}
                required={required}
                error={!!errors[name]}
                InputProps={{
                  readOnly: true,
                }}
              />

              {errors[name]?.message && (
                <Label
                  labelText={errors[name]?.message as string}
                  size="sm"
                  color="error"
                  className="mt-1"
                />
              )}

              {open && (
                <div
                  className="absolute z-50 mt-2 shadow-lg border rounded bg-white"
                  onMouseLeave={() => setOpen(false)}
                >
                  <DateRange
                    ranges={selectedRange}
                    onChange={handleSelect}
                    moveRangeOnFirstSelection={false}
                    showMonthAndYearPickers={true}
                    months={2}
                    direction="horizontal"
                  />
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default DateRangeController;
