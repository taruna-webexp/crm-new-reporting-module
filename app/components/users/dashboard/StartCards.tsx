// components/users/dashboard/StatsCards.tsx
import React from "react";
import { CardController } from "@/app/components/controllers";
import { CheckCircle2, Clock, CalendarCheck, TrendingUp, AlertCircle } from "lucide-react";
import { dashboardData } from "@/app/components/dummydata/DummyData";
import { Heading } from "../../typography";

type Task = (typeof dashboardData.tasks)[number];

interface StatsCardsProps {
  filteredTasks: Task[];
}

export default function StatsCards({ filteredTasks }: StatsCardsProps) {
  const stats = React.useMemo(() => {
    const completed = filteredTasks.filter(t => t.status === "completed");
    const totalSpent = completed.reduce((acc, t) => acc + t.spent, 0);

    const avgTimePerTask =
      completed.length > 0 ? (totalSpent / completed.length).toFixed(1) + " hrs" : "0 hrs";

    const onTimeCount = completed.filter(t => t.spent <= t.estimate).length;
    const onTimeCompletion =
      completed.length > 0 ? Math.round((onTimeCount / completed.length) * 100) + "%" : "0%";

    const overdueCount = filteredTasks.filter(
      t => t.status === "overdue" || (t.spent > t.estimate && t.status !== "completed"),
    ).length;

    return {
      tasksCompleted: completed.length,
      avgTimePerTask,
      onTimeCompletion,
      tasksOverdue: overdueCount,
    };
  }, [filteredTasks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Tasks Completed */}
      <CardController>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <Heading
              level="h4"
              headingText=" Tasks Completed"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />

            <p className="text-xs text-gray-500">Completed today</p>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{stats.tasksCompleted}</p>
      </CardController>

      {/* Avg. Time per Task */}
      <CardController>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <Heading
              level="h4"
              headingText=" Avg. Time per Task"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />

            <p className="text-xs text-gray-500">Average duration</p>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{stats.avgTimePerTask}</p>
      </CardController>

      {/* On-time Completion */}
      <CardController>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <CalendarCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <Heading
              level="h4"
              headingText="On-time Completion"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />

            <p className="text-xs text-gray-500">Tasks delivered on time</p>
          </div>
        </div>
        <p className="text-4xl font-bold text-gray-900">{stats.onTimeCompletion}</p>
      </CardController>

      {/* Productivity Score */}
      <CardController>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <Heading
              level="h4"
              headingText="Productivity Score"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />

            <p className="text-xs text-gray-500">Overall performance</p>
          </div>
        </div>
        <p className="text-4xl font-bold text-indigo-600">88</p>
      </CardController>

      {/* Tasks Overdue */}
      <CardController>
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <Heading
              level="h4"
              headingText="Tasks Overdue"
              color="black"
              className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
            />

            <p className="text-xs text-red-600">Requires attention</p>
          </div>
        </div>
        <p className="text-4xl font-bold text-red-600">{stats.tasksOverdue}</p>
      </CardController>
    </div>
  );
}
