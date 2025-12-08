import { Briefcase, CheckCircle, Clock, Users } from "lucide-react";
import React from "react";
import { CardController } from "../controllers";
import { Heading } from "../typography";

type DummyData = {
  totalActiveProjects: number;
  totalAssignedTasks: number;
  upcomingTasks: number;
  activeEmployees: {
    total: number;
    day: number;
    night: number;
  };
};

type KeyMetricsProps = {
  dummyData: DummyData;
};

export default function KeyMetrics({ dummyData }: KeyMetricsProps) {
  return (
    <>
      <Heading
        level="h3"
        headingText=" Key Metrics"
        color="black"
        className="text-4xl font-extrabold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-2">
        <CardController title="Total Active Projects" subtitle="Number of ongoing projects">
          <div className="flex items-center justify-between">
            <Briefcase className="h-12 w-12 text-purple-600" />
            <div className="text-right">
              <div className="text-4xl font-bold text-purple-700">
                {dummyData.totalActiveProjects}
              </div>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
          </div>
        </CardController>

        <CardController title="Total Assigned Tasks" subtitle="All tasks currently in the system">
          <div className="flex items-center justify-between">
            <CheckCircle className="h-12 w-12 text-blue-600" />
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-700">{dummyData.totalAssignedTasks}</div>
              <p className="text-sm text-gray-600">95 active</p>
            </div>
          </div>
        </CardController>

        <CardController title="Upcoming Tasks" subtitle="Due in the next 7 days">
          <div className="flex items-center justify-between">
            <Clock className="h-12 w-12 text-orange-600" />
            <div className="text-right">
              <div className="text-4xl font-bold text-orange-700">{dummyData.upcomingTasks}</div>
              <p className="text-sm text-orange-600 font-medium">Requires attention</p>
            </div>
          </div>
        </CardController>

        <CardController title="Active Employees" subtitle="Currently working employees">
          <div className="flex items-center justify-between">
            <Users className="h-12 w-12 text-green-600" />
            <div className="text-right">
              <div className="text-4xl font-bold text-green-700">
                {dummyData.activeEmployees.total}
              </div>
              <p className="text-sm text-gray-600">
                Day: <strong>{dummyData.activeEmployees.day}</strong> | Night:{" "}
                <strong>{dummyData.activeEmployees.night}</strong>
              </p>
            </div>
          </div>
        </CardController>
      </div>
    </>
  );
}
