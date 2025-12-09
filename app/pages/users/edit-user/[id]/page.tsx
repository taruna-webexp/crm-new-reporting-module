"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputController, SelectController, RadioController } from "@/app/components/controllers";
import { Button, Heading, Text } from "@/app/components/typography";
import { UIOption } from "@/app/types/ui";
import { useRouter } from "next/navigation";
import { userDepartmentSchema, userRoleSchema } from "@/app/utils/users/usersSchema";
import { formSchema, FormValues } from "@/app/utils/validationSchemas";

// Helper function to fetch options
const fetchOptions = async (schema: UIOption[], searchQuery: string): Promise<UIOption[]> => {
  return schema.filter(option => option.label.toLowerCase().includes(searchQuery.toLowerCase()));
};

export default function EditUser() {
  const [userData, setUserData] = useState<FormValues | null>(null);
  const [selectOptions, setSelectOptions] = useState<UIOption[]>(userRoleSchema);
  const [selectDepartmentOptions, setSelectDepartmentOptions] =
    useState<UIOption[]>(userDepartmentSchema);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("selectedUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserData(parsed);
    } else {
      router.push("/users");
    }
  }, [router]);

  const methods = useForm<FormValues>({
    // resolver: yupResolver(formSchema),
    mode: "onChange",
    defaultValues: userData || {},
  });

  const { reset } = methods;

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    console.log("User data updated:", data);
    alert("User updated successfully!");
    localStorage.removeItem("selectedUser");
    router.push("/pages/users");
  };

  console.log("userData", userData);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      {userData ? (
        <FormProvider {...methods}>
          <Heading level="h1" className="mb-6" color="primary" headingText="Edit User" />
          <Text color="neutral" text="Modify the details below to update the project." />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full gap-0 flex flex-wrap "
          >
            <InputController name="name" label="Full Name" className="w-1/3 px-2" />
            <InputController name="email" label="Email" type="email" className="w-1/3 px-2" />
            <InputController
              name="password"
              label="Password"
              type="password"
              className="w-1/3 px-2"
            />
            <InputController name="phone" label="Phone No." type="tel" className="w-1/3 px-2" />

            <SelectController
              name="department"
              label="Department"
              className="w-1/3 px-2"
              options={selectDepartmentOptions}
            />

            <SelectController
              name="status"
              label="Status"
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
