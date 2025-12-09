// app/tasks/add/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { InputController, SelectController } from "@/app/components/controllers";
import { Button, Heading } from "@/app/components/typography";
import { addTask } from "@/app/lib/task-store";
import { TaskFormValues } from "@/app/types/task";
import { useEffect } from "react";

export default function AddTask() {
  const router = useRouter();

  const methods = useForm<TaskFormValues>({
    defaultValues: {
      taskTitle: "",
      taskDescription: "",
      project: "",
      module: "",
      assignedDeveloper: "",
      reviewer: "",
      qaOwner: "",
      tlEstimate: "",
      allowDeveloperEstimate: false,
      developerEstimate: "",
      finalEstimate: "",
      priority: "medium",
      status: "pending",
      taskType: "task",
      startDate: "",
      dueDate: "",
      storyPoints: "",
      labels: "",
      comments: "",
      attachments: "",
    },
  });

  const { control, handleSubmit } = methods;
  const allowDeveloperEstimate = useWatch({ control, name: "allowDeveloperEstimate" });
  const tlEstimate = useWatch({ control, name: "tlEstimate" });

  // Auto calculate Final Estimate if TL Estimate exists
  useEffect(() => {
    if (tlEstimate && !allowDeveloperEstimate) {
      methods.setValue("finalEstimate", tlEstimate);
    }
  }, [tlEstimate, allowDeveloperEstimate, methods]);

  const onSubmit = (data: TaskFormValues) => {
    addTask(data as any);
    alert("Task created successfully!");
    router.push("/pages/task");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Heading
          level="h1"
          headingText="Create New Task"
          className="text-3xl font-bold text-gray-900 mb-2"
        />
        <p className="text-gray-600 mb-8">Fill in the details below to create a new task</p>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Basic Info - 3 Column */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Task Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SelectController
                      name="project"
                      label="Project"
                      options={[
                        { value: "aceflow", label: "AceFlow Project Management" },
                        { value: "crm", label: "CRM System" },
                        { value: "ecommerce", label: "E-Commerce Platform" },
                        { value: "hrms", label: "HRMS (Human Resource Management System)" },
                        { value: "inventory", label: "Inventory Management" },
                        { value: "lms", label: "Learning Management System" },
                        { value: "erp", label: "ERP Solution" },
                        { value: "website", label: "Company Website Development" },
                        { value: "mobileapp", label: "Mobile App Development" },
                      ]}
                    />
                    <SelectController
                      name="module"
                      label="Module / Epic"
                      options={[
                        { value: "auth", label: "Authentication" },
                        { value: "dashboard", label: "Dashboard" },
                        { value: "user-management", label: "User Management" },
                        { value: "roles-permissions", label: "Roles & Permissions" },
                        { value: "projects", label: "Projects Module" },
                        { value: "tasks", label: "Tasks & Workflow" },
                        { value: "notifications", label: "Notifications System" },
                        { value: "settings", label: "Settings & Configuration" },
                        { value: "reports", label: "Reports & Analytics" },
                        { value: "integrations", label: "Integrations (API / Third-party)" },
                      ]}
                    />

                    <InputController
                      name="taskTitle"
                      label="Task Title"
                      placeholder="e.g. Implement User Profile Page"
                    />
                  </div>
                  <div className="mt-6">
                    <SelectController
                      name="taskType"
                      label="Task Type"
                      options={[
                        { value: "feature", label: "Feature" },
                        { value: "bug", label: "Bug" },
                        { value: "task", label: "Task" },
                      ]}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <InputController
                    name="taskDescription"
                    label="Description"
                    type="textarea"
                    rows={5}
                  />
                </div>{" "}
                <div className="mt-6">
                  <InputController
                    name="acceptanceCriteria"
                    label="Expected Outcome / Acceptance Criteria"
                    type="textarea"
                    rows={5}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectController
                    name="priority"
                    label="Priority"
                    options={[
                      { value: "low", label: "Low" },
                      { value: "medium", label: "Medium" },
                      { value: "high", label: "High" },
                      { value: "critical", label: "Critical" },
                    ]}
                  />
                  <SelectController
                    name="tag"
                    label="Tag"
                    options={[
                      { value: "tag1", label: "Tag 1" },
                      { value: "tag2", label: "Tag 2" },
                      { value: "tag3", label: "Tag 3" },
                      { value: "tag4", label: "Tag 4" },
                    ]}
                  />
                </div>
                {/* Assignment & Responsibility - Figma Exact */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-5">
                    Assignment & Responsibility
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SelectController
                      name="assignedDeveloper"
                      label="Assigned Developer"
                      options={[
                        { value: "john", label: "John Doe" },
                        { value: "sarah", label: "Sarah Wilson" },
                        { value: "michael", label: "Michael Brown" },
                        { value: "emma", label: "Emma Johnson" },
                        { value: "liam", label: "Liam Anderson" },
                        { value: "olivia", label: "Olivia Martinez" },
                        { value: "alex", label: "Alex Thompson" },
                        { value: "riya", label: "Riya Sharma" },
                        { value: "advait", label: "Advait Patel" },
                        { value: "arjun", label: "Arjun Verma" },
                      ]}
                    />

                    <SelectController
                      name="reviewer"
                      label="Reviewer"
                      options={[
                        { value: "mike", label: "Mike Chen" },
                        { value: "emma", label: "Emma Davis" },
                        { value: "daniel", label: "Daniel White" },
                        { value: "sophia", label: "Sophia Lee" },
                        { value: "avinash", label: "Avinash Mehta" },
                        { value: "priya", label: "Priya Kapoor" },
                        { value: "rohan", label: "Rohan Singh" },
                        { value: "natalie", label: "Natalie Brooks" },
                        { value: "harry", label: "Harry Collins" },
                        { value: "kavya", label: "Kavya Iyer" },
                      ]}
                    />

                    <SelectController
                      name="qaOwner"
                      label="QA Owner"
                      options={[
                        { value: "res", label: "Resion Aerd" },
                        { value: "alex", label: "Alex Turner" },
                        { value: "nina", label: "Nina Patel" },
                      ]}
                    />
                  </div>
                </div>
                {/*Control & Dependency*/}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Estimation Block</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div className="space-y-5">
                      <InputController
                        name="tlEstimate"
                        label="TL Estimate (Hours)"
                        type="number"
                        placeholder="Enter TL estimate"
                      />
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          {...methods.register("allowDeveloperEstimate")}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">
                          Allow Developer Estimate?
                        </label>
                      </div>
                      <InputController
                        name="finalEstimate"
                        label="Final Estimate (Hours)"
                        type="number"
                        disabled
                        className="bg-gray-100"
                      />
                    </div>

                    {/* Right Side */}
                    <div>
                      <InputController
                        name="developerEstimate"
                        label="Developer Estimate (Hours)"
                        type="number"
                        placeholder="Enter estimate"
                        disabled={!allowDeveloperEstimate}
                        className={!allowDeveloperEstimate ? "opacity-50" : ""}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Control & Dependency</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Side */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          {...methods.register("allowDeveloperEstimate")}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label className="text-sm font-medium text-gray-700">Blocked?</label>
                      </div>
                      <InputController
                        name="blockedReason"
                        label="Blocked Reason (Hours)"
                        type="text"
                        className="bg-gray-100"
                      />
                    </div>

                    {/* Right Side */}
                    <div>
                      <InputController
                        name="dependsOnTasks"
                        label="Depend on Task"
                        type="number"
                        placeholder="Enter estimate"
                      />
                    </div>
                  </div>
                </div>
                {/* Buttons - Figma Exact */}
                <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
                  <Button
                    buttonText="Cancel"
                    variant="secondary"
                    onClick={() => router.push("/tasks")}
                    className="px-8 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  />
                  <Button
                    buttonText="Create Task"
                    variant="primary"
                    type="submit"
                    className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm"
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
