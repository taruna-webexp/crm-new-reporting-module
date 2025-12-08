import React from "react";
import { CardController } from "../../controllers";
import { dashboardData } from "../../dummydata/DummyData";
import { Heading } from "../../typography";

type Task = (typeof dashboardData.tasks)[number];

interface RecentTasksSectionProps {
  recentTasks: Task[];
}

// ────────────────────────────────────────────────────────────────
export default function RecentTasksSection({ recentTasks }: RecentTasksSectionProps) {
  return (
    <>
      <CardController className="py-4">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <Heading
            level="h3"
            headingText="My Recent Tasks"
            color="black"
            className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
          />
          <div className="space-y-8">
            {recentTasks.map(task => {
              const progress = task.estimate > 0 ? (task.spent / task.estimate) * 100 : 0;
              const isCompleted = task.status === "completed";
              return (
                <div key={task.id}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-base">{task.title}</h3>
                    <span
                      className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        isCompleted ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isCompleted ? "Completed" : "Blocked"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>Time Spent: {task.spent} hrs</span>
                    <span className="text-gray-400">•</span>
                    <span>Estimate: {task.estimate} hrs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted ? "bg-green-600" : "bg-blue-600"
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardController>
    </>
  );
}
