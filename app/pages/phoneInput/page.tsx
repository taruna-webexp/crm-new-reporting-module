"use client";

import { FormProvider, useForm } from "react-hook-form";
import { Heading } from "../../components/typography";
import InputController from "../../components/controllers/InputController";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { phoneSchema } from "../../utils/validationSchemas";

const formSchema = yup.object({
  phone: phoneSchema,
});

type FormValues = yup.InferType<typeof formSchema>;

export default function PhoneInput() {
  const methods = useForm<FormValues>({
    defaultValues: { phone: "" },
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
        <Heading level="h1" className="mb-6" headingText="Phone Input" />

        <InputController
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
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
