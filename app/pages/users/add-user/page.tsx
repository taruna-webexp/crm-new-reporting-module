"use client";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController, SelectController } from "@/app/components/controllers";
import { Button, Heading } from "@/app/components/typography";
import { formSchema, FormValues } from "@/app/utils/validationSchemas";
import { UIOption } from "@/app/types/ui";
import { userRoleSchema } from "@/app/utils/users/usersSchema";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const [selectOptions, setSelectOptions] = useState<UIOption[]>(userRoleSchema);
  const router = useRouter();
  const methods = useForm<FormValues>({
    // resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      slackId: "",
      file: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully!");
    router.push("/pages/users");
  };

  return (
    <FormProvider {...methods}>
      <Heading level="h1" className="mb-6" color="primary" headingText="Add User" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full gap-0 flex flex-wrap "
      >
        <InputController name="name" label="Full Name" className="w-1/3 px-2" />
        <InputController name="email" label="Email" type="email" className="w-1/3 px-2" />
        <InputController name="password" label="Password" type="password" className="w-1/3 px-2" />
        <InputController name="phone" label="Phone No." type="tel" className="w-1/3 px-2" />
        <SelectController
          name="pick"
          label="Department"
          className="w-1/3 px-2"
          options={selectOptions}
        />
        <InputController name="slackId" label="Slack Id" type="number" className="w-1/3 px-2" />
        <InputController name="file" label="Choose File" type="file" className="w-1/3 px-2" />

        <div className="pt-4 flex gap-4 w-full">
          <Button buttonText="Submit" variant="primary" type="submit" />
          <Button buttonText="Cancel" variant="secondary" type="reset" />
        </div>
      </form>
    </FormProvider>
  );
}
