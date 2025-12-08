import * as yup from 'yup'

export const moduleValidationSchema = yup.object().shape({
  projectName: yup.string().required('Project Name is required'),
  moduleName: yup.string().required('Module Name is required'),
  authType: yup.string().required('Auth Type is required'),
  priority: yup.string().required('Prioriry is required'),
  status: yup.string().required('Status is required'),
    
})