import { Button } from "@mui/material";
import React from "react";
import { CardController, DateRangeController, SelectController } from "../controllers";
import { Calendar } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type DashboardFilterForm = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  projectFilter: string;
};

type DashboardFilterProps = {
  methods: UseFormReturn<DashboardFilterForm>;
  // onApply: () => void; // Apply Filters button ke liye
  onClear: () => void; // Clear Filters button ke liye (properly typed)
};

export default function DashboardFilter({ methods, onClear }: DashboardFilterProps) {
  const projectOptions = [
    { value: "all", label: "All Projects" },
    { value: "alpha", label: "Project Alpha" },
    { value: "beta", label: "Beta Core" },
    { value: "gamma", label: "Gamma Portal" },
    { value: "delta", label: "Delta Mobile" },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-8 my-4">
      <div className="flex items-center gap-4 min-w-0">
        <Calendar className="h-5 w-5 text-gray-600 flex-shrink-0" />
        <DateRangeController name="dateRange" label="Date Range" className="w-full max-w-md" />
      </div>

      <div className="flex items-center gap-4 min-w-0">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap flex-shrink-0">
          Project:
        </span>
        <SelectController
          name="projectFilter"
          label=""
          options={projectOptions}
          className="w-full min-w-64"
        />
      </div>

      <div className="hidden lg:block flex-1" />

      <div className="flex gap-3 justify-end lg:justify-start lg:ml-auto">
        <Button
          type="submit"
          variant="contained"
          size="medium"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm"
        >
          Apply Filters
        </Button>

        <Button
          variant="outlined"
          size="medium"
          type="button"
          onClick={onClear}
          className="font-medium px-6"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
