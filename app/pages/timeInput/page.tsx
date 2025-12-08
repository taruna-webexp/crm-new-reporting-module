"use client";

import { FormProvider, useForm } from "react-hook-form";
import DateTimeController from "../../components/controllers/DateTimeController";
import { Heading } from "../../components/typography";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { timeSchema } from "../../utils/validationSchemas";

// Centralized schema
const formSchema = yup.object({
  time: timeSchema,
});

type FormValues = yup.InferType<typeof formSchema>;

export default function TimeInput() {
  const methods = useForm<FormValues>({
    defaultValues: { time: "" },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted successfully:", data);
    alert("Form submitted successfully!");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full flex flex-col gap-5"
      >
        <Heading level="h1" className="mb-6" headingText="Time Input" />

        <DateTimeController
          name="time"
          label="Select Time"
          type="time"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded"
        >
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
