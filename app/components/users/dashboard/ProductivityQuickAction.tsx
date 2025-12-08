import React from "react";
import { CardController } from "../../controllers";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboardData } from "../../dummydata/DummyData";
import { Button } from "@mui/material";

type ProductivityScoreItem = (typeof dashboardData.productivityScoreTrend)[number];

interface ProductivityQuickActionProps {
  filteredProductivityTrend: ProductivityScoreItem[];
}

export default function ProductivityQuickAction({
  filteredProductivityTrend,
}: ProductivityQuickActionProps) {
  return (
    <>
      {" "}
      <div className="lg:col-span-2 space-y-6">
        <CardController className="py-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border-2 border-purple-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              My Productivity Score Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredProductivityTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis domain={[70, 100]} tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardController>
      </div>
      {/* Quick Actions */}
      <CardController className="py-4">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Quick Actions</h2>
            <div className="space-y-3">
              <Button
                type="submit"
                variant="contained"
                size="medium"
                className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 shadow-sm"
              >
                Log Hours
              </Button>

              <button className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition font-medium">
                View My Timesheet
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition font-medium">
                Request Help
              </button>
            </div>
          </div>
        </div>
      </CardController>
    </>
  );
}
