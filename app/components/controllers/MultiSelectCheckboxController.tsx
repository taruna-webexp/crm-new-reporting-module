"use client";
import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import FormHelperText from "@mui/material/FormHelperText";
import { Controller, useFormContext } from "react-hook-form";
import type { UISelectProps, UIOption } from "../../types/ui";

const MultiSelectCheckboxController = ({
  name,
  label,
  options = [],
  disabled,
  className,
  fetchOptions, // Accept fetchOptions prop from parent component
}: UISelectProps) => {
  const { control } = useFormContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [remoteOptions, setRemoteOptions] = useState<UIOption[]>([]);
  const [loading, setLoading] = useState(false);

  const displayOptions = searchQuery ? remoteOptions : options;

  // Debounced async search
  useEffect(() => {
    if (searchQuery && fetchOptions) {
      const delay = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await fetchOptions(searchQuery); // Use dynamic function
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
          <FormControl fullWidth size="small" className={className} error={!!fieldState.error}>
            <InputLabel>{label}</InputLabel>

            <Select
              multiple
              label={label}
              value={safeValue}
              onChange={field.onChange}
              disabled={disabled}
              onOpen={() => setSearchQuery("")}
              renderValue={(selected) =>
                selected
                  .map((v) => {
                    const opt = [...options, ...remoteOptions].find((o) => o.value === v);
                    return opt?.label;
                  })
                  .filter(Boolean)
                  .join(", ")
              }
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
            >
              {/* Search Input */}
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
                    <Checkbox checked={safeValue.includes(opt.value)} />
                    <ListItemText primary={opt.label} />
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

export default MultiSelectCheckboxController;
