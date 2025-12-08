"use client";
import React, { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import { UISelectProps, UIOption } from "../../types/ui";
import ProgressLoader from "./ProgressLoader";

const MultiSelectChipController: React.FC<UISelectProps> = ({
  name,
  label,
  options = [],
  disabled,
  className,
  fetchOptions, // Accept fetchOptions as a prop for dynamic data fetching
}) => {
  const { control } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOptions, setRemoteOptions] = useState<UIOption[]>([]);
  const [loading, setLoading] = useState(false);

  const displayOptions = searchQuery ? remoteOptions : options;

  // Debounced Remote Search
  useEffect(() => {
    if (searchQuery && fetchOptions) {
      const delay = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await fetchOptions(searchQuery); // Use dynamic fetch function
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
      render={({ field, fieldState }) => {
        const safeValue = Array.isArray(field.value) ? field.value : [];

        return (
          <FormControl
            fullWidth
            size="small"
            className={className}
            error={!!fieldState.error}
          >
            <InputLabel>{label}</InputLabel>

            <Select
              multiple
              label={label}
              value={safeValue}
              onChange={field.onChange}
              onOpen={() => setSearchQuery("")}
              disabled={disabled}
              renderValue={(selected) => (
                <div className="flex gap-1 flex-wrap">
                  {selected.map((val) => {
                    const opt = [...options, ...remoteOptions].find(o => o.value === val);
                    return opt ? (
                      <Chip key={val} label={opt.label} size="small" variant="outlined" />
                    ) : null;
                  })}
                </div>
              )}
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              {/* Search Field */}
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

              {/* Loading State */}
              {loading && (
                <MenuItem disabled>
                  <ProgressLoader />
                </MenuItem>
              )}

              {/* Results */}
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
        );
      }}
    />
  );
};

export default MultiSelectChipController;
