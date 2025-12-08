import React from "react";
import { CardController } from "../controllers";
import { Heading } from "../typography";
import { AlertTriangle, Download } from "lucide-react";
import { Button } from "@mui/material";
import DataTable from "../Table";

export default function DelayedTaskTable({ data }: { data: any[] }) {
  const exportDelayedTasks = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Project,Module,Total Tasks,Delayed Tasks,Worst Delay,Responsible\n" +
      "Alpha,Payment Gateway,24,5,12 days,Vikash Kumar\n" +
      "Beta Core,API Integration v2,18,3,8 days,Priya Singh\n" +
      "Delta Mobile,Mobile Responsiveness,31,2,6 days,Rahul Verma\n" +
      "Gamma Portal,Database Migration,15,1,4 days,Neha Gupta";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "delayed_tasks_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      <div className="mt-12 mb-10">
        <CardController>
          <div className="flex items-center justify-between gap-2 mb-6">
            <div className="flex items-center justify-start gap-2 mb-6">
              <Heading
                level="h3"
                headingText=" Delayed Tasks (Critical Attention Required)"
                color="black"
                className="mb-4 flex items-center gap-3 text-2xl font-bold "
              />

              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex items-center justify-end gap-2 mb-6">
              <Button
                onClick={exportDelayedTasks}
                startIcon={<Download className="h-4 w-4" />}
                type="submit"
                variant="contained"
                size="medium"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm"
              >
                Export Report
              </Button>
            </div>
          </div>

          <DataTable
            data={data}
            loading={false}
            columns={[
              {
                key: "projectName",
                label: "Project",
                render: (row: any) => (
                  <span className="font-bold text-gray-900">{row.projectName}</span>
                ),
              },
              {
                key: "module",
                label: "Module / Feature",
                render: (row: any) => <span className="text-gray-700">{row.module}</span>,
              },
              {
                key: "totalTasks",
                label: "Total Tasks",
                render: (row: any) => <span className="text-center block">{row.totalTasks}</span>,
              },
              {
                key: "delayedTasks",
                label: "Delayed Tasks",
                render: (row: any) => (
                  <span
                    className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold ${
                      row.delayedTasks >= 4
                        ? "bg-red-100 text-red-800"
                        : row.delayedTasks >= 2
                          ? "bg-orange-100 text-orange-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {row.delayedTasks}
                  </span>
                ),
              },
              {
                key: "worstDelay",
                label: "Worst Delay",
                render: (row: any) => (
                  <span className="font-bold text-red-700 text-lg">{row.worstDelay}</span>
                ),
              },
              {
                key: "responsible",
                label: "Responsible",
                render: (row: any) => <span className="font-medium">{row.responsible}</span>,
              },
              {
                key: "action",
                label: "Action",
                render: () => (
                  <button className="text-blue-600 hover:text-blue-800 font-medium">View →</button>
                ),
              },
            ]}
            totalRecord={data.length}
            page={1}
            setPage={() => {}}
            length={10}
            showActions={false}
          />
        </CardController>
      </div>
    </>
  );
}
// DelayedTaskTable.tsx
