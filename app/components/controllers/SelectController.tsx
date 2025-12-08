"use client";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import { UISelectProps, UIOption } from "../../types/ui";

const SelectController: React.FC<UISelectProps> = ({
  name,
  label,
  options = [],
  disabled,
  className,
  multiple,
  fetchOptions,
}) => {
  const { control } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOptions, setRemoteOptions] = useState<UIOption[]>([]);
  const [loading, setLoading] = useState(false);

  const displayOptions = searchQuery ? remoteOptions : options;

  useEffect(() => {
    if (searchQuery && fetchOptions) {
      const delay = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await fetchOptions(searchQuery);
          setRemoteOptions(results);
        } catch (error) {
          console.error("Error fetching options", error);
        } finally {
          setLoading(false);
        }
      }, 400);

      return () => clearTimeout(delay);
    }
  }, [searchQuery, fetchOptions]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className={className ?? "w-full mb-0"}>
          <FormControl
            fullWidth
            size="small"
            className={className}
            error={!!fieldState.error}
          >
            <InputLabel>{label}</InputLabel>

            <Select
              {...field}
              multiple={multiple}
              label={label}
              value={field.value ?? (multiple ? [] : "")}
              onChange={(e) => field.onChange(e.target.value)}
              onOpen={() => setSearchQuery("")}
              disabled={disabled}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              
              <MenuItem disableRipple disableTouchRipple>
                <TextField
                  autoFocus
                  placeholder="Search..."
                  size="small"
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </MenuItem>

              {/* Loader */}
              {loading && (
                <MenuItem disabled>
                  <CircularProgress size={20} />
                </MenuItem>
              )}

              {/* Options */}
              {!loading && displayOptions.length > 0 ? (
                displayOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))
              ) : (
                !loading && <MenuItem disabled>No results</MenuItem>
              )}
            </Select>

            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        </div>
      )}
    />
  );
};

export default SelectController;
