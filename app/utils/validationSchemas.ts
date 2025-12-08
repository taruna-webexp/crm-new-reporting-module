import * as yup from "yup";

export const requiredTextSchema = (label: string, min: number, max: number) =>
  yup
    .string()
    .required(`${label} is required`)
    .min(min, `${label} must be at least ${min} characters`)
    .max(max, `${label} must be at most ${max} characters`);

export const emailSchema = yup
  .string()
  .required("Email is required")
  .email("Invalid email format");

export const phoneSchema = yup
  .string()
  .required("Phone number is required")
  .matches(/^[0-9+\-()\s]+$/, "Invalid phone number");

export const selectSchema = (label: string) =>
  yup.string().required(`${label} is required`);

export const checkboxSchema = yup
  .boolean()
  .oneOf([true], "You must check this box");

export const multiSelectSchema = (min: number) =>
  yup
    .array()
    .of(yup.string().required())
    .min(min, `Please select at least ${min} item(s)`);

export const dateSchema = yup
  .string()
  .required("Date is required");

export const timeSchema = yup
  .string()
  .required("Time is required")
  .matches(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Invalid time format (24-hour format required)"
  );

export const dateRangeSchema = yup.object({
  startDate: yup.string().required("Start Date is required"),
  endDate: yup.string().required("End Date is required"),
});

export const addressSchema = yup
  .string()
  .required("Address is required")
  .min(5, "Address must be at least 5 characters")
  .max(255, "Address must be at most 255 characters");

export const passwordSchema = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

export const confirmPasswordSchema = yup
  .string()
  .required("Confirm Password is required")
  .oneOf([yup.ref('password'), ""], "Passwords must match");

  export const slackIdSchema = yup
  .string()
  .required("Slack ID is required")

  export const fileSchema = yup
  .mixed()
  .required("File is required")
  .test("fileSize", "File size is too large", (value) => {
    const files = value as File[];
    return files && files[0]?.size <= 3 * 1024 * 1024; // 3MB limit
  })
  .test("fileType", "Unsupported file format", (value) => {
    const files = value as File[];
    return files && ["image/jpeg", "image/png", "application/pdf"].includes(files[0]?.type);
  });


export const formSchema = yup.object({
  name: requiredTextSchema("Full Name", 1, 100),
  email: emailSchema,
  phone: phoneSchema,
  pick: selectSchema("Department"),
  radio: selectSchema("Category"),
  checkme: checkboxSchema,
  multiCheckbox: multiSelectSchema(1),
  multiChip: multiSelectSchema(1),
  date: dateSchema,
  dateTime: dateSchema,
  time: timeSchema,
  dateRange: dateRangeSchema,
  address: addressSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
  slackId: slackIdSchema,
  file: fileSchema,
});

export type FormValues = yup.InferType<typeof formSchema>;
