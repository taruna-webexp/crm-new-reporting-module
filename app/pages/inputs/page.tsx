"use client";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  InputController,
  SelectController,
  RadioController,
  CheckboxController,
  MultiSelectCheckboxController,
  MultiSelectChipController,
  DateTimeController,
  DateRangeController,
} from "../../components/controllers";
import LinkController from "../../components/controllers/LinkController";

import { Heading, Button } from "../../components/typography";

import { formSchema, type FormValues } from "../../utils/validationSchemas";
import { fetchProducts } from "../../utils/api/product";
import type { UIOption } from "../../types/ui";

export default function FormController() {
  const [selectOptions, setSelectOptions] = useState<UIOption[]>([]);

  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      pick: "",
      radio: "",
      checkme: false,
      multiCheckbox: [],
      multiChip: [],
      date: "",
      dateTime: "",
      time: "",
      dateRange: { startDate: "", endDate: "" },
    },
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    fetchProducts().then(setSelectOptions).catch(console.error);
  }, []);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full flex flex-col gap-5"
      >
        <Heading
          level="h1"
          className="mb-6"
          color="primary"
          headingText="Contact Form with Yup Validation"
        />

        <InputController name="name" label="Full Name" />
        <InputController name="email" label="Email" type="email" />
        <InputController name="phone" label="Phone" type="tel" />

        <SelectController
          name="pick"
          label="Department"
          options={selectOptions}
        />

        <RadioController
          name="radio"
          label="Category"
          options={selectOptions}
          row
        />

        <CheckboxController
          name="checkme"
          label="I agree to the terms & conditions"
        />

        <MultiSelectCheckboxController
          name="multiCheckbox"
          label="Select Your Interests"
          options={selectOptions}
        />

        <MultiSelectChipController
          name="multiChip"
          label="Select Skills"
          options={selectOptions}
        />

        <DateTimeController name="date" label="Select Date" type="date" />
        <DateTimeController
          name="dateTime"
          label="Select Date & Time"
          type="datetime-local"
        />
        <DateTimeController name="time" label="Select Time" type="time" />

        <DateRangeController name="dateRange" label="Select Date Range" />

        <LinkController label="Back to home" href="/" color="primary" />

        <div className="pt-4 flex gap-4">
          <Button buttonText="Submit" variant="primary" type="submit" />
          <Button buttonText="Cancel" variant="secondary" type="reset" />
        </div>
      </form>
    </FormProvider>
  );
}
