"use client";

import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckboxController from "../../components/controllers/CheckboxController";
import { Heading } from "../../components/typography";
import { checkboxSchema } from "../../utils/validationSchemas";
import * as yup from "yup";

const formSchema = yup.object({
  checkme: checkboxSchema,
});

type FormValues = yup.InferType<typeof formSchema>;

export default function CheckboxesInput() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      checkme: false,
    },
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
        <Heading level="h1" className="mb-6" headingText="Checkboxes" />

        {/* No need to pass validationSchema — resolver handles it */}
        <CheckboxController
          name="checkme"
          label="I agree to the terms and conditions"
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
