"use client";
import { useState, useEffect } from "react";
import {
  SelectController,
  MultiSelectCheckboxController,
  MultiSelectChipController,
} from "../../components/controllers";
import { Heading } from "../../components/typography";
import { selectSchema, multiSelectSchema } from "../../utils/validationSchemas";
import { fetchProducts } from "@/app/utils/api/product";
import { UIOption } from "@/app/types/ui";
import { FormProvider, useForm } from "react-hook-form";

export default function Dropdowns() {
  const methods = useForm();
  const [formValues, setFormValues] = useState({
    pick: "",
    multiCheckbox: [] as (string | number)[],
    multiChip: [] as (string | number)[],
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});

  const [selectOptions, setSelectOptions] = useState<UIOption[]>([]);

  useEffect(() => {
    fetchProducts().then(setSelectOptions);
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string | undefined> = {};
    let hasErrors = false;

    try {
      await selectSchema("Department").validate(formValues.pick);
    } catch (err: any) {
      errors.pick = err.message;
      hasErrors = true;
    }

    try {
      await multiSelectSchema(1).validate(formValues.multiCheckbox);
    } catch (err: any) {
      errors.multiCheckbox = err.message;
      hasErrors = true;
    }

    try {
      await multiSelectSchema(1).validate(formValues.multiChip);
    } catch (err: any) {
      errors.multiChip = err.message;
      hasErrors = true;
    }

    setValidationErrors(errors);

    if (hasErrors) {
      console.log("Validation Failed:", errors);
      return;
    }

    alert("Form submitted successfully!");
    console.log("Form submitted:", formValues);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFormSubmit}
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full flex flex-col gap-5"
      >
        <Heading level="h1" className="mb-6" headingText="Dropdowns" />

        <SelectController
          name="pick"
          label="Department"
          options={selectOptions}
          value={formValues.pick}
          onChange={value => handleChange("pick", value)}
          validationSchema={selectSchema("Department")}
          validateOn="change"
          onValidation={error => setValidationErrors(prev => ({ ...prev, pick: error }))}
          error={!!validationErrors.pick}
          helperText={validationErrors.pick}
        />

        <MultiSelectCheckboxController
          name="multiCheckbox"
          label="Select Your Interests"
          options={selectOptions}
          value={formValues.multiCheckbox}
          onChange={value => handleChange("multiCheckbox", value)}
          validationSchema={multiSelectSchema(1)}
          validateOn="change"
          onValidation={error => setValidationErrors(prev => ({ ...prev, multiCheckbox: error }))}
          error={!!validationErrors.multiCheckbox}
          helperText={validationErrors.multiCheckbox}
        />

        <MultiSelectChipController
          name="multiChip"
          label="Select Skills"
          options={selectOptions}
          value={formValues.multiChip}
          onChange={value => handleChange("multiChip", value)}
          validationSchema={multiSelectSchema(1)}
          validateOn="change"
          onValidation={error => setValidationErrors(prev => ({ ...prev, multiChip: error }))}
          error={!!validationErrors.multiChip}
          helperText={validationErrors.multiChip}
        />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
