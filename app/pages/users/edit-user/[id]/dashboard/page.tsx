// app/dashboard/page.tsx
"use client";

import { CardController, SelectController } from "@/app/components/controllers";
import DashboardFilter from "@/app/components/dashboard/DashboardFilter";
import DataTable from "@/app/components/Table";
import { dashboardData } from "@/app/components/dummydata/DummyData";
import { useForm, FormProvider } from "react-hook-form";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatsCards from "@/app/components/users/dashboard/StartCards";
import ProductivityQuickAction from "@/app/components/users/dashboard/ProductivityQuickAction";
import RecentTasksSection from "@/app/components/users/dashboard/RecentTasksSection";
import ProfileTaskActivity from "@/app/components/users/dashboard/ProfileTaskActivity";
import ActiveProjectsWithChart from "@/app/components/users/dashboard/ActiveProjectsWithChart";
import { Heading } from "@/app/components/typography";

type FormValues = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  projectFilter: string;
};

export default function ProductivityDashboard() {
  const methods = useForm<FormValues>({
    defaultValues: {
      dateRange: {
        startDate: "2025-11-05",
        endDate: "2025-12-05",
      },
      projectFilter: "all",
    },
  });

  const { handleSubmit } = methods;

  const [appliedFilters, setAppliedFilters] = useState<FormValues>({
    projectFilter: "all",
    dateRange: {
      startDate: "2025-11-05",
      endDate: "2025-12-05",
    },
  });

  const onSubmit = (data: FormValues) => {
    setAppliedFilters({
      projectFilter: data.projectFilter || "all",
      dateRange: {
        startDate: data.dateRange.startDate,
        endDate: data.dateRange.endDate,
      },
    });
  };

  // === FILTERED TASKS BASED ON APPLIED FILTERS ===
  const filteredTasks = useMemo(() => {
    return dashboardData.tasks.filter(task => {
      const inProject =
        appliedFilters.projectFilter === "all" || task.projectId === appliedFilters.projectFilter;

      const taskDate = new Date(task.date);
      const start = new Date(appliedFilters.dateRange.startDate);
      const end = new Date(appliedFilters.dateRange.endDate);

      const inDateRange = taskDate >= start && taskDate <= end;

      return inProject && inDateRange;
    });
  }, [appliedFilters]);

  // === DYNAMIC CHARTS DATA BASED ON FILTERS ===

  // 1. Productivity Score Trend (currently static, can be made dynamic later)
  const filteredProductivityTrend = useMemo(() => {
    return dashboardData.productivityScoreTrend;
  }, []);

  // 2. Stuck vs Allocated Hours (Dynamic by Project)
  const filteredStuckVsAllocated = useMemo(() => {
    if (appliedFilters.projectFilter === "all") {
      return dashboardData.stuckVsAllocated;
    }

    const moduleMap = new Map<string, { allocated: number; stuck: number }>();

    filteredTasks.forEach(task => {
      if (!moduleMap.has(task.module)) {
        moduleMap.set(task.module, { allocated: 0, stuck: 0 });
      }
      const mod = moduleMap.get(task.module)!;
      mod.allocated += task.estimate;
      if (task.blocked) {
        mod.stuck += task.estimate - task.spent; // Blocked = remaining hours
      }
    });

    return Array.from(moduleMap.entries()).map(([module, data]) => ({
      module,
      allocated: data.allocated,
      stuck: data.stuck,
    }));
  }, [filteredTasks, appliedFilters.projectFilter]);

  // 3. Stuck Hours Trend (Dynamic by Date Range)
  const filteredStuckHoursTrend = useMemo(() => {
    const start = new Date(appliedFilters.dateRange.startDate);
    const end = new Date(appliedFilters.dateRange.endDate);

    return dashboardData.stuckHoursTrend.filter(item => {
      const itemDate = new Date(item.date + ", 2025"); // Adding year since dummy data has no year
      return itemDate >= start && itemDate <= end;
    });
  }, [appliedFilters.dateRange]);

  // === DERIVED DATA ===
  const recentTasks = dashboardData.tasks.filter(t => t.isRecent).slice(0, 3);

  const tasksInProgress = filteredTasks.filter(t => t.status === "in-progress");

  const activeProjects = dashboardData.activeProjects;

  const stats = useMemo(() => {
    const completed = filteredTasks.filter(t => t.status === "completed");
    const totalSpent = completed.reduce((acc, t) => acc + t.spent, 0);
    const avgTimePerTask =
      completed.length > 0 ? (totalSpent / completed.length).toFixed(1) + " hrs" : "0 hrs";

    const onTimeCompletion =
      completed.length > 0
        ? Math.round(
            (completed.filter(t => t.spent <= t.estimate).length / completed.length) * 100,
          ) + "%"
        : "0%";

    const overdueCount = filteredTasks.filter(
      t => t.status === "overdue" || (t.spent > t.estimate && t.status !== "completed"),
    ).length;

    return {
      tasksCompleted: completed.length,
      avgTimePerTask,
      onTimeCompletion,
      productivityScore: 88,
      tasksOverdue: overdueCount,
    };
  }, [filteredTasks]);

  const projectOptions = dashboardData.projects.map(p => ({
    value: p.id,
    label: p.name,
  }));

  const onClear = () => {
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <div className="bg-gray-50">
        <div className="mx-auto space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Productivity Overview</h1>
                <p className="text-gray-500 mt-1">
                  Welcome back, {dashboardData.metadata.user.name.split(" ")[0]}! Here's your
                  progress today.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-4 mb-6">
                <div className="flex-1">
                  {" "}
                  <CardController>
                    <DashboardFilter methods={methods} onClear={onClear} />{" "}
                  </CardController>
                </div>
              </form>

              {/* Stats Cards - Now Dynamic */}
              <StatsCards filteredTasks={filteredTasks} />

              {/* Period Comparison - Static for now */}
              <CardController className="py-4">
                <Heading
                  level="h3"
                  headingText=" Period Comparison"
                  color="black"
                  className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5">
                    <Heading
                      level="h5"
                      headingText="Tasks Completed"
                      color="black"
                      className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
                    />

                    <p className="text-2xl font-bold text-gray-900">{stats.tasksCompleted}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z"
                        />
                      </svg>
                      +100% vs. Prev. Period
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5">
                    <Heading
                      level="h5"
                      headingText="Avg. Time per Task"
                      color="black"
                      className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
                    />
                    <p className="text-2xl font-bold text-gray-900">{stats.avgTimePerTask}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l7 7a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L3.707 11.707a1 1 0 01-1.414-1.414l7-7A1 1 0 0110 3z"
                        />
                      </svg>
                      -10% vs. Prev. Period
                    </p>
                  </div>
                </div>
              </CardController>
            </div>

            {/* Productivity Score Trend */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ProductivityQuickAction filteredProductivityTrend={filteredProductivityTrend} />
            </div>

            {/* Recent Tasks */}
            <RecentTasksSection recentTasks={recentTasks} />

            {/* Profile + Tasks + Activity */}
            <ProfileTaskActivity dashboardData={dashboardData} tasksInProgress={tasksInProgress} />

            {/* Active Projects + Charts */}
            <ActiveProjectsWithChart
              activeProjects={activeProjects}
              filteredStuckVsAllocated={filteredStuckVsAllocated}
              filteredStuckHoursTrend={filteredStuckHoursTrend}
              appliedFilters={appliedFilters}
              projectOptions={projectOptions}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
