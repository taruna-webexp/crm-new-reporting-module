"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController, SelectController } from "@/app/components/controllers";
import { Button, Heading, Text } from "@/app/components/typography";
import { UIOption } from "@/app/types/ui";
import { useRouter } from "next/navigation";
import { ModuleFormValues } from "@/app/types/module";
import { moduleValidationSchema } from "@/app/components/form-validations/moduleValidation";
import {
  moduleAuthSchema,
  modulePrioritySchema,
  moduleProjectsTypeSchema,
  moduleStatusSchema,
} from "@/app/utils/module/moduleSchema";

const fetchOptions = async (schema: UIOption[], searchQuery: string): Promise<UIOption[]> => {
  return schema.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
};

export default function EditModule() {
  const [moduleData, setModuleData] = useState<ModuleFormValues | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedProject = localStorage.getItem("selectedModule");
    if (storedProject) {
      setModuleData(JSON.parse(storedProject));
    } else {
      router.push("/module");
    }
  }, [router]);

  const methods = useForm<ModuleFormValues>({
    // resolver: yupResolver(moduleValidationSchema),
    mode: "onChange",
    defaultValues: moduleData || {},
  });

  console.log("moduleData", moduleData);

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (moduleData) {
      reset(moduleData);
    }
  }, [moduleData, reset]);

  const onSubmit = (data: ModuleFormValues) => {
    console.log("Updated Module:", data);
    alert("Module updated successfully!");
    localStorage.removeItem("selecteModule");
    router.push("/pages/module");
  };

  if (!moduleData) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full gap-0">
      <FormProvider {...methods}>
        <Heading level="h1" className="mb-6" color="primary" headingText="Edit Module" />
        <Text color="neutral" text="Modify the details below to update the Module." />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full gap-0 flex flex-wrap mt-4"
        >
          <SelectController
            name="projectType"
            label="Project Type"
            className="w-full"
            options={moduleProjectsTypeSchema}
            fetchOptions={searchQuery => fetchOptions(moduleProjectsTypeSchema, searchQuery)}
          />

          <InputController name="projectName" label="Enter Module Name" className="w-full" />

          <SelectController
            name="authType"
            label="Authentication Description"
            className="w-full"
            options={moduleAuthSchema}
            fetchOptions={searchQuery => fetchOptions(moduleAuthSchema, searchQuery)}
          />

          <SelectController
            name="priority"
            label="Priority"
            className="w-full"
            options={modulePrioritySchema}
            fetchOptions={searchQuery => fetchOptions(modulePrioritySchema, searchQuery)}
          />

          <SelectController
            name="status"
            label="Status"
            className="w-full"
            options={moduleStatusSchema}
            fetchOptions={searchQuery => fetchOptions(moduleStatusSchema, searchQuery)}
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
