import React from "react";
import { CardController } from "../controllers";
import { Heading } from "../typography";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
type ProjectHealthItem = {
  id: string; // Yeh zaroori hai filter ke liye
  name: string;
  health: number; // number
  status: string;
  delayedTasks: number; // number
};
type ProjectHealthDataProps = {
  projectHealthData: ProjectHealthItem[];
};

export default function ProjectHealthData({ projectHealthData }: ProjectHealthDataProps) {
  return (
    <>
      <div className="mt-12 mb-20">
        <CardController className="">
          {/* Header */}
          <div className=" pt-8 pb-6 ">
            <Heading
              level="h3"
              headingText=" Project Health "
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />
            <p className="text-gray-600 mt-2 text-lg">Real-time health of all active projects</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl  text-center">
              <p className="text-4xl font-black">8</p>
              <p className="text-green-100">Healthy Projects</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-2xl  text-center">
              <p className="text-4xl font-black">4</p>
              <p className="text-yellow-100">At Risk</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-2xl  text-center">
              <p className="text-4xl font-black">2</p>
              <p className="text-red-100">Critical</p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-8 pb-8">
            {/* LEFT: Big Donut Chart with Average Health */}
            <div className="flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Healthy",
                        value: projectHealthData.filter(p => p.status === "Healthy").length,
                        color: "#10b981",
                      },
                      {
                        name: "At Risk",
                        value: projectHealthData.filter(p => p.status === "At Risk").length,
                        color: "#f59e0b",
                      },
                      {
                        name: "Critical",
                        value: projectHealthData.filter(p => p.status === "Critical").length,
                        color: "#ef4444",
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={90}
                    outerRadius={130}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {[{ color: "#10b981" }, { color: "#f59e0b" }, { color: "#ef4444" }].map(
                      (entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ),
                    )}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Average Score */}
              {/* <div className="absolute flex flex-col items-center">
                        <span className="text-6xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          78%
                        </span>
                        <span className="text-lg font-medium text-gray-600">Avg Health Score</span>
                      </div> */}

              {/* Legend Below Chart */}
              <div className="flex gap-8 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500"></div>
                  <span className="font-medium">Healthy (8)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-500"></div>
                  <span className="font-medium">At Risk (4)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500"></div>
                  <span className="font-medium">Critical (2)</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Summary Cards + Mini Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Summary Cards */}

              {/* Compact Project List (Scrollable if many) */}
              <div className="max-h-96 overflow-y-auto rounded-2xl border border-gray-200 bg-white/70">
                {projectHealthData.map((project, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-5 border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          project.status === "Healthy"
                            ? "bg-green-500"
                            : project.status === "At Risk"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <div>
                        <p className="font-semibold text-gray-900">{project.name}</p>
                        <p className="text-sm text-gray-500">
                          {project.delayedTasks} delayed tasks
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">{project.health}%</p>
                        <p className="text-xs text-gray-500">Health</p>
                      </div>
                      <div className="w-32">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all ${
                              project.health >= 80
                                ? "bg-green-500"
                                : project.health >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${project.health}%` }}
                          />
                        </div>
                      </div>
                      <button className="text-purple-600 font-medium hover:underline">
                        View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardController>
      </div>
    </>
  );
}
