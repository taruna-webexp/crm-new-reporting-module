"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputController from "../../components/controllers/InputController";
import { Heading } from "../../components/typography";
import { emailSchema } from "../../utils/validationSchemas";

// 🔥 Form-level Schema
const formSchema = yup.object({
  email: emailSchema,
});

type FormValues = yup.InferType<typeof formSchema>;

export default function EmailInput() {
  const methods = useForm<FormValues>({
    defaultValues: { email: "" },
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
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full"
      >
        <Heading level="h1" className="mb-6" headingText="Email Input" />

        <InputController
          name="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
        />

        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
