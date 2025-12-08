"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { DateTimeController } from "../../components/controllers";
import { Heading } from "../../components/typography";
import { dateSchema } from "../../utils/validationSchemas";

// 🔥 Yup Schema for this form
const formSchema = yup.object({
  date: dateSchema,
});

// Auto-infer types from schema ⭐
type FormValues = yup.InferType<typeof formSchema>;

export default function DateInput() {
  const methods = useForm<FormValues>({
    defaultValues: {
      date: "",
    },
    resolver: yupResolver(formSchema), // integrated validation
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
        <Heading level="h1" className="mb-6" headingText="Date Input" />

        {/* No validationSchema prop needed anymore */}
        <DateTimeController name="date" label="Select Date" type="date" />

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
