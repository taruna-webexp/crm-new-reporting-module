"use client";

import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormProvider, useForm } from "react-hook-form";
import RadioController from "../../components/controllers/RadioController";
import { Heading } from "../../components/typography";
import { fetchProducts } from "@/app/utils/api/product";
import { selectSchema } from "../../utils/validationSchemas";
import { UIOption } from "@/app/types/ui";

// Schema only here
const formSchema = yup.object({
  radio: selectSchema("Category"),
});

type FormValues = yup.InferType<typeof formSchema>;

export default function RadioInput() {
  const methods = useForm<FormValues>({
    defaultValues: { radio: "" },
    resolver: yupResolver(formSchema),
  });

  const [options, setOptions] = useState<UIOption[]>([]);

  useEffect(() => {
    fetchProducts().then(setOptions).catch(console.error);
  }, []);

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
        <Heading level="h1" className="mb-6" headingText="Radio Input" />

        <RadioController
          name="radio"
          label="Choose Category"
          options={options}
          row
        />

        <button type="submit" className="px-4 py-2 bg-primary text-white rounded">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
