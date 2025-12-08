"use client";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  InputController,
  SelectController,
} from "@/app/components/controllers";
import { Button, Heading } from "@/app/components/typography";
import { UIOption } from "@/app/types/ui";
import { moduleValidationSchema } from "@/app/components/form-validations/moduleValidation";
import { ModuleFormValues } from "@/app/types/module";
import { moduleAuthSchema, modulePrioritySchema, moduleProjectsTypeSchema, moduleStatusSchema } from "@/app/utils/module/moduleSchema";

const fetchOptions = async (schema: UIOption[], searchQuery: string): Promise<UIOption[]> => {
  return schema.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export default function AddModule() {

  const methods = useForm({
    resolver: yupResolver(moduleValidationSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      moduleName: "",
      authType: "",
      priority: "",
      status: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ModuleFormValues) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full gap-0">
      <FormProvider {...methods}>
        <Heading
          level="h1"
          className="mb-6"
          color="primary"
          headingText="Create New Module"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 w-full gap-0 flex flex-wrap mt-4"
        >

          <SelectController
            name="projectType"
            label="Project Type"
            className="w-full"
            options={moduleProjectsTypeSchema}
            fetchOptions={(searchQuery) => fetchOptions(moduleProjectsTypeSchema, searchQuery)}
          />

          <InputController name="projectName" label="Enter Module Name" className="w-full" />

          <SelectController
            name="authType"
            label="Authentication Description"
            className="w-full"
            options={moduleAuthSchema}
            fetchOptions={(searchQuery) => fetchOptions(moduleAuthSchema, searchQuery)}
          />

          <SelectController
            name="priority"
            label="Priority"
            className="w-full"
            options={modulePrioritySchema}
            fetchOptions={(searchQuery) => fetchOptions(modulePrioritySchema, searchQuery)}
          />

          <SelectController
            name="status"
            label="Status"
            className="w-full"
            options={moduleStatusSchema}
            fetchOptions={(searchQuery) => fetchOptions(moduleStatusSchema, searchQuery)}
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
