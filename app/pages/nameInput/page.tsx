"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Heading } from "../../components/typography";
import InputController from "../../components/controllers/InputController";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { requiredTextSchema } from "../../utils/validationSchemas";

// Schema only here
const formSchema = yup.object({
  name: requiredTextSchema("Full Name", 1, 100),
});

type FormValues = yup.InferType<typeof formSchema>;

export default function NameInput() {
  const methods = useForm<FormValues>({
    defaultValues: { name: "" },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Success!");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border w-full"
      >
        <Heading level="h1" headingText="Name Input" />

        <InputController name="name" label="Full Name" />

        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
