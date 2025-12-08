"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { DateTimeController } from "../../components/controllers";
import { Heading } from "../../components/typography";
import { dateSchema } from "../../utils/validationSchemas";

// 🔥 Single Yup Schema
const formSchema = yup.object({
  dateTime: dateSchema,
});

type FormValues = yup.InferType<typeof formSchema>;

export default function DateTimeInput() {
  const methods = useForm<FormValues>({
    defaultValues: {
      dateTime: "",
    },
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full flex flex-col gap-5"
      >
        <Heading level="h1" className="mb-6" headingText="Date & Time Input" />

        <DateTimeController
          name="dateTime"
          label="Select Date & Time"
          type="datetime-local"
        />

        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
