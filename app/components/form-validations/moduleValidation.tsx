import * as yup from "yup";

export const moduleValidationSchema = yup.object().shape({
  projectName: yup.string().required("Project Name is required"),
});
