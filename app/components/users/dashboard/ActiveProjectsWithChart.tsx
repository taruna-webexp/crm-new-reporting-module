import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CardController, SelectController } from "../../controllers";
import { dashboardData } from "@/app/components/dummydata/DummyData";
import { Heading } from "../../typography";

type DashboardData = typeof dashboardData;

type ActiveProject = DashboardData["activeProjects"][number];

type StuckVsAllocatedItem = {
  module: string;
  allocated: number;
  stuck: number;
};

type StuckHoursTrendItem = {
  date: string;
  hours: number;
};

type ProjectOption = {
  value: string;
  label: string;
};

interface ActiveProjectsWithChartProps {
  activeProjects: ActiveProject[];
  filteredStuckVsAllocated: StuckVsAllocatedItem[];
  filteredStuckHoursTrend: StuckHoursTrendItem[];
  appliedFilters: {
    projectFilter: string;
    dateRange: { startDate: string; endDate: string };
  };
  projectOptions: ProjectOption[];
}

// ────────────────────────────────────────────────────────────────
// Component – Fully Typed
// ────────────────────────────────────────────────────────────────
export default function ActiveProjectsWithChart({
  activeProjects,
  filteredStuckVsAllocated,
  filteredStuckHoursTrend,
  appliedFilters,
  projectOptions,
}: ActiveProjectsWithChartProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-10">
        <div className="space-y-6">
          {/* Stuck vs Allocated Hours */}
          <CardController>
            <Heading
              level="h3"
              headingText="Stuck vs Allocated Hours"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />

            <div className="h-64 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredStuckVsAllocated}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="module" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="allocated" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="stuck" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span className="text-gray-600">Allocated Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-600">Stuck Hours</span>
              </div>
            </div>
          </CardController>

          {/* Stuck Hours Trend */}
          <CardController>
            <div className="flex items-center justify-between mb-4">
              <Heading
                level="h3"
                headingText=" Stuck Hours Trend (Last 30 Days)"
                color="black"
                className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
              />

              <SelectController
                name="projectFilter"
                label=""
                options={projectOptions}
                // placeholder="All Projects"
                className="w-48"
              />
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-600 my-4 ">
              <span>
                {appliedFilters.dateRange.startDate} - {appliedFilters.dateRange.endDate}
              </span>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredStuckHoursTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardController>
        </div>
      </div>
    </>
  );
}
