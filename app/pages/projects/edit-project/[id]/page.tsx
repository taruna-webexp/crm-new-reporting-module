"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController, SelectController, RadioController } from "@/app/components/controllers";
import { Button, Heading, Text } from "@/app/components/typography";
import { UIOption } from "@/app/types/ui";
import {
  projectsTechStackSchema,
  projectsCategorySchema,
  projectsTypeSchema,
  projectsBillingSchema,
  projectsStatusSchema,
} from "@/app/utils/projects/projectsSchema";
import { projectsValidationSchema } from "@/app/components/form-validations/projectsValidation";
import { ProjectsFormValues } from "@/app/types/projects";
import { useRouter } from "next/navigation";

const fetchOptions = async (schema: UIOption[], searchQuery: string): Promise<UIOption[]> => {
  return schema.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
};

export default function EditProject() {
  const [projectData, setProjectData] = useState<ProjectsFormValues | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedProject = localStorage.getItem("selectedProject");
    if (storedProject) {
      setProjectData(JSON.parse(storedProject));
    } else {
      router.push("/projects");
    }
  }, [router]);

  const methods = useForm<ProjectsFormValues>({
    // resolver: yupResolver(projectsValidationSchema),
    mode: "onChange",
    defaultValues: projectData || {},
  });

  console.log("projectData", projectData);

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (projectData) {
      console.log("projectData", projectData);

      reset(projectData);
    }
  }, [projectData, reset]);

  const onSubmit = (data: ProjectsFormValues) => {
    console.log("Updated project:", data);
    alert("Project updated successfully!");
    localStorage.removeItem("selectedProject");
    router.push("/pages/projects");
  };

  if (!projectData) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full gap-0">
      <FormProvider {...methods}>
        <Heading level="h1" className="mb-6" color="primary" headingText="Edit Project" />
        <Text color="neutral" text="Modify the details below to update the project." />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full gap-0 flex flex-wrap mt-4"
        >
          <Heading
            level="h5"
            color="primary"
            headingText="Project Details"
            className="w-full"
            sx={{ mb: 2 }}
          />

          <InputController
            name="projectName"
            label="Project Name"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />
          <InputController
            name="projectCode"
            label="Project Code"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />

          <SelectController
            name="projectType"
            label="Project Type"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
            options={projectsTypeSchema}
            fetchOptions={searchQuery => fetchOptions(projectsTypeSchema, searchQuery)}
          />

          <InputController
            name="clientName"
            label="Client Name"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />

          <SelectController
            name="projectCategory"
            label="Project Category"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
            options={projectsCategorySchema}
            fetchOptions={searchQuery => fetchOptions(projectsCategorySchema, searchQuery)}
          />

          <InputController
            name="projectOwner"
            label="Project Owner"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />

          <Heading level="h5" color="primary" headingText="Tech Stack" sx={{ mb: 2 }} />
          <RadioController
            name="techStack"
            label=""
            options={projectsTechStackSchema}
            type="checkbox"
            row
          />

          <Heading
            level="h5"
            color="primary"
            headingText="Timeline & Billing"
            className="w-full"
            sx={{ mb: 2 }}
          />

          <InputController
            name="startDate"
            label="Start Date"
            type="date"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />
          <InputController
            name="endDate"
            label="Expected End Date"
            type="date"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />

          <SelectController
            name="billingModel"
            label="Billing Model"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
            options={projectsBillingSchema}
            fetchOptions={searchQuery => fetchOptions(projectsBillingSchema, searchQuery)}
          />

          <Heading
            level="h5"
            color="primary"
            headingText="Description & Status"
            className="w-full"
            sx={{ mb: 2 }}
          />

          <InputController
            name="description"
            label="Description"
            type="textarea"
            rows={4}
            className="w-full md:w-1/2 lg:w-1/3 px-2"
          />
          <SelectController
            name="status"
            label="Project Status"
            className="w-full md:w-1/2 lg:w-1/3 px-2"
            options={projectsStatusSchema}
            fetchOptions={searchQuery => fetchOptions(projectsStatusSchema, searchQuery)}
          />

          <div className="pt-4 flex gap-4 w-full">
            <Button buttonText="Submit" variant="primary" type="submit" />
            <Button buttonText="Cancel" variant="secondary" type="reset" />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
