"use client";

import React, { useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { format, isWithinInterval, parseISO } from "date-fns";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Clock, CheckCircle } from "lucide-react";

import { CardController, SelectController } from "../components/controllers";
import DataTable from "../components/Table";
import { Heading } from "../components/typography";
import DashboardFilter from "../components/dashboard/DashboardFilter";
import KeyMetrics from "../components/dashboard/KeyMetrics";
import ProjectHealthData from "../components/dashboard/ProjectHealthData";
import DelayedTaskTable from "../components/dashboard/DelayedTaskTable";
import { dashboardOverviewData } from "../components/dummydata/DummyData";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    projectId: "all",
    dateRange: { startDate: "2025-11-01", endDate: "2025-12-31" },
  });

  const methods = useForm({
    defaultValues: {
      projectFilter: "all",
      dateRange: { startDate: "2025-11-01", endDate: "2025-12-31" },
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    setFilters({
      projectId: data.projectFilter || "all",
      dateRange: data.dateRange,
    });
  };

  const onClear = () => {
    methods.reset();
    setFilters({
      projectId: "all",
      dateRange: { startDate: "2025-11-01", endDate: "2025-12-31" },
    });
  };

  // SAB KUCH FILTERED — Date + Project dono se
  const filteredData = useMemo(() => {
    const { projectId, dateRange } = filters;
    const start = new Date(dateRange.startDate);
    const end = new Date(dateRange.endDate);

    const isDateInRange = (dateStr: string) => {
      if (!dateStr) return true;
      const date = parseISO(dateStr);
      return isWithinInterval(date, { start, end });
    };

    const matchesProject = (item: any) => {
      return projectId === "all" || item.projectId === projectId;
    };

    return {
      keyMetrics: dashboardOverviewData.keyMetrics,

      projectHealth: dashboardOverviewData.projectHealth.filter(
        p => projectId === "all" || p.id === projectId,
      ),

      recentlyCompletedTasks: dashboardOverviewData.recentlyCompletedTasks.filter(
        task => matchesProject(task) && isDateInRange(task.completedOn),
      ),

      upcomingDeadlines: dashboardOverviewData.upcomingDeadlines.filter(
        item => matchesProject(item) && isDateInRange(item.dueDate),
      ),

      delayedTasksSummary: dashboardOverviewData.delayedTasksSummary.filter(
        item => projectId === "all" || item.projectId === projectId,
      ),

      taskProgress: dashboardOverviewData.taskProgress.map(stat => {
        if (stat.name === "Completed") {
          const count = dashboardOverviewData.recentlyCompletedTasks.filter(
            t => matchesProject(t) && isDateInRange(t.completedOn),
          ).length;
          return { ...stat, value: count };
        }
        return stat;
      }),
    };
  }, [filters]);
  return (
    <FormProvider {...methods}>
      {/* Form sirf filter ke liye */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-screen bg-gray-50">
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
                  <p className="text-sm text-gray-500">
                    {format(new Date(), "EEEE, MMMM d, yyyy")}
                  </p>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
              {/* Filter — onSubmit pass kar rahe hain */}{" "}
              <CardController title="Global Filters" className="mb-10">
                <DashboardFilter methods={methods} onClear={onClear} />
              </CardController>
              {/* Ab saara data filteredData se aayega */}
              <KeyMetrics dummyData={filteredData.keyMetrics} />
              <ProjectHealthData projectHealthData={filteredData.projectHealth} />
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <CardController>
                  <Heading
                    level="h3"
                    headingText="Task Progress Overview"
                    color="black"
                    className="text-xl font-bold"
                  />
                  <div className="w-full h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={filteredData.taskProgress}
                          cx="50%"
                          cy="50%"
                          innerRadius={100}
                          outerRadius={150}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {filteredData.taskProgress.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardController>

                <CardController>
                  <div className="flex items-center justify-between mb-6">
                    <Heading
                      level="h3"
                      headingText="Upcoming Deadlines"
                      color="black"
                      className="text-xl font-bold"
                    />
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="space-y-3">
                    {filteredData.upcomingDeadlines.map((item, i) => (
                      <div key={i} className="flex justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-bold text-gray-600">{item.task}</p>
                          <p className="text-sm text-gray-600">{item.projectName}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${item.priority === "High" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {item.priority}
                          </span>
                          <p className="text-sm text-gray-600">Due in {item.dueIn}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardController>
              </div>
              {/* Recently Completed Tasks — */}
              <CardController>
                <div className="grid grid-cols-2 mb-4">
                  <Heading level="h3" headingText="Recently Completed Tasks" color="black" />
                  <div className="flex justify-end">
                    <SelectController
                      name="projectFilter"
                      label=""
                      options={[{ value: "all", label: "All" }]}
                      className="!w-[170px]"
                    />
                  </div>
                </div>

                <DataTable
                  data={filteredData.recentlyCompletedTasks}
                  loading={false}
                  columns={[
                    {
                      key: "task",
                      label: "Task Name",
                      render: (row: any) => <span className="font-medium">{row.task}</span>,
                    },
                    { key: "projectName", label: "Project" },
                    { key: "assignee", label: "Assigned To" },
                    { key: "completedOn", label: "Completed On" },
                    {
                      key: "status",
                      label: "Status",
                      render: () => (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                          <CheckCircle className="h-3 w-3" /> Completed
                        </span>
                      ),
                    },
                  ]}
                  totalRecord={filteredData.recentlyCompletedTasks.length}
                  page={1}
                  setPage={() => {}}
                  length={10}
                  showActions={false}
                />
              </CardController>
              <DelayedTaskTable data={filteredData.delayedTasksSummary} />
            </main>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
