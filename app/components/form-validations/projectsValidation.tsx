import * as yup from 'yup'

export const projectsValidationSchema = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),
  projectCode: yup.string().required('Project Code is required'),
  projectType: yup.string().required('Project Type is required'),
  clientName: yup.string().required('Client Name is required'),
  projectCategory: yup.string().required('Project Category is required'),
  projectOwner: yup.string().required('Owner is required'),
  techStack: yup.array().of(yup.string()).min(1).required("Required"),
  startDate: yup.string().required('Start Date is required'),
  endDate: yup.string().required('End Date is required'),
})