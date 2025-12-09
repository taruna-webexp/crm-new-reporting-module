import React from "react";
import { CardController } from "../../controllers";
import DataTable from "../../Table";
import { dashboardData } from "../../dummydata/DummyData";
import { Heading } from "../../typography";
import { CircleUserRound, User } from "lucide-react";
// ────────────────────────────────────────────────────────────────
type DashboardData = typeof dashboardData;
type Task = DashboardData["tasks"][number];

interface ProfileTaskActivityProps {
  dashboardData: DashboardData;
  tasksInProgress: Task[];
}

export default function ProfileTaskActivity({
  dashboardData,
  tasksInProgress,
}: ProfileTaskActivityProps) {
  return (
    <>
      {" "}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <CardController className="p-6">
            <Heading
              level="h3"
              headingText="Profile6"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Full Name</p>
                  <p className="text-xl font-bold text-gray-900">
                    {dashboardData.metadata.user.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="text-gray-700">{dashboardData.metadata.user.location}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Title</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {dashboardData.metadata.user.title}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-500 font-medium">Reporting Manager</p>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 flex gap-2">
                      <CircleUserRound /> {dashboardData.metadata.user.reportingManager}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metadata.user.totalProjects}
                </p>
                <p className="text-sm text-gray-600 mt-1">Total Projects</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">{tasksInProgress.length}</p>
                <p className="text-sm text-gray-600 mt-1">Tasks In Progress</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metadata.user.totalAllocatedHours}
                </p>
                <p className="text-sm text-gray-600 mt-1">Total Allocated Hours</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {dashboardData.metadata.user.totalTimeSpent}
                </p>
                <p className="text-sm text-gray-600 mt-1">Total Time Spent</p>
              </div>
            </div>

            <div className="mt-6 flex justify-start">
              <div className="inline-flex items-center gap-3 bg-red-50 px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-gray-700">Total Blocked Hours</span>
                <span className="text-xl font-bold text-red-600">
                  {dashboardData.metadata.user.totalBlockedHours}
                </span>
              </div>
            </div>
          </CardController>

          <CardController>
            <Heading
              level="h3"
              headingText="Tasks in progress"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />
            <DataTable
              data={tasksInProgress}
              loading={false}
              columns={[
                {
                  key: "task",
                  label: "Task Title",
                  render: (row: any) => (
                    <span className="font-medium text-gray-900">{row.title}</span>
                  ),
                },
                {
                  key: "project",
                  label: "Project",
                  render: (row: any) => (
                    <span className="text-gray-700">
                      {dashboardData.projects.find(p => p.id === row.projectId)?.name}
                    </span>
                  ),
                },
                {
                  key: "module",
                  label: "Module",
                  render: (row: any) => <span className="text-gray-600">{row.module}</span>,
                },
                {
                  key: "estimate",
                  label: "Estimate (hrs)",
                  render: (row: any) => <span className="text-center block">{row.estimate}</span>,
                },
                {
                  key: "spent",
                  label: "Time Spent (hrs)",
                  render: (row: any) => <span className="text-center block">{row.spent}</span>,
                },
                {
                  key: "blocked",
                  label: "Status",
                  render: (row: any) => (
                    <span
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${
                        row.blocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                      }`}
                    >
                      {row.blocked ? "Blocked" : "On Track"}
                    </span>
                  ),
                },
              ]}
              totalRecord={tasksInProgress.length}
              page={1}
              setPage={() => {}}
              length={10}
              showActions={false}
            />
          </CardController>
        </div>

        <div className="space-y-6">
          <CardController>
            <Heading
              level="h3"
              headingText="Activity Feed"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />
            <div className="space-y-5 mt-4">
              {dashboardData.activityFeed.map((item, i) => (
                <div key={i} className="flex gap-3">
                  {/* <div className="w-9 h-9 bg-gray-300 rounded-full flex-shrink-0" /> */}
                  <div>
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{item.user}</span> {item.action}{" "}
                      <span className="font-medium">{item.target}</span>
                      {item.assignee && (
                        <>
                          {" to "}
                          <span className="font-medium">{item.assignee}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardController>

          <CardController>
            <Heading
              level="h3"
              headingText="Recent Time Entries"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />
            <div className="space-y-4 mt-4">
              {dashboardData.timeEntries.map((e, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-gray-900">{e.taskTitle}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-blue-600 font-medium">{e.hours} hrs</span>
                    <span className="text-xs text-gray-500">{e.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardController>
        </div>
      </div>
    </>
  );
}
