"use client";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  InputController,
  SelectController,
  DateTimeController,
  CardController,
} from "../../components/controllers";
import { Heading, Button } from "../../components/typography";
import {
  requiredTextSchema,
  selectSchema,
  dateSchema,
} from "../../utils/validationSchemas";
import { fetchProducts } from "../../utils/api/product";
import { UIOption } from "../../types/ui";

type FormValues = {
  name: string;
  pick: string;
  date: string;
};

export default function Card() {
  const [validationErrors, setValidationErrors] = useState<Record<string, string | undefined>>({});
  const [selectOptions, setSelectOptions] = useState<UIOption[]>([]);

  const methods = useForm<FormValues>({
    defaultValues: {
      name: "",
      pick: "",
      date: "",
    },
  });

  const getSelectedOptions = async () => {
    try {
      const options = await fetchProducts();
      setSelectOptions(options);
    } catch (err) {
      console.error("Failed to load options", err);
    }
  };

  useEffect(() => {
    getSelectedOptions();
  }, []);

  const onSubmit = async (data: FormValues) => {
    const errors: Record<string, string | undefined> = {};
    let hasErrors = false;

    try {
      await requiredTextSchema("Full Name", 1, 50).validate(data.name);
    } catch (err: any) {
      errors.name = err.message;
      hasErrors = true;
    }

    try {
      await selectSchema("Department").validate(data.pick);
    } catch (err: any) {
      errors.pick = err.message;
      hasErrors = true;
    }

    try {
      await dateSchema.validate(data.date);
    } catch (err: any) {
      errors.date = err.message;
      hasErrors = true;
    }

    setValidationErrors(errors);

    if (hasErrors) return console.warn("Validation Errors:", errors);

    alert("Form submitted successfully 🎉");
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="pt-6"
      >
        <Heading level="h2" className="mb-4" headingText="CardController Demo" />

        <CardController
          title="User Information Card"
          subtitle="Update your profile details below"
          footer={
            <div className="flex gap-3">
              <Button buttonText="Save" variant="primary" size="sm" type="submit" />
              <Button buttonText="Discard" variant="secondary" size="sm" type="button" />
            </div>
          }
        >
          <InputController
            name="name"
            label="Full Name"
            placeholder="John Doe"
            className="mb-4"
            validationSchema={requiredTextSchema("Full Name", 1, 50)}
            validateOn="blur"
            onValidation={(error) => setValidationErrors((p) => ({ ...p, name: error }))}
            error={!!validationErrors.name}
            helperText={validationErrors.name}
          />

          <SelectController
            name="pick"
            label="Department"
            options={selectOptions}
            validationSchema={selectSchema("Department")}
            validateOn="change"
            onValidation={(error) => setValidationErrors((p) => ({ ...p, pick: error }))}
            error={!!validationErrors.pick}
            helperText={validationErrors.pick}
          />

          <DateTimeController
            name="date"
            label="Start Date"
            type="date"
            className="mt-4"
            validationSchema={dateSchema}
            validateOn="blur"
            onValidation={(error) => setValidationErrors((p) => ({ ...p, date: error }))}
            error={!!validationErrors.date}
            helperText={validationErrors.date}
          />
        </CardController>
      </form>
    </FormProvider>
  );
}
