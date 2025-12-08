import { SxProps, Theme } from "@mui/material";

export type UIOption = {
  label: string;
  value: string | number;
};

export interface UIBaseFieldProps {
  id?: string;
  name: string;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  helperText?: string;
  error?: boolean;
  validationSchema?: any;
  validateOn?: "change" | "blur" | "submit";
  onValidation?: (error?: string) => void;
  department?: string;
}

export interface UIInputProps extends UIBaseFieldProps {
  name: string;
  placeholder?: string;
  type?: string;
  startIcon?: React.ReactNode;
  rows?: number;
}

export interface UISelectProps extends UIBaseFieldProps {
  options: UIOption[];
  multiple?: boolean;
  fetchOptions?: (searchQuery: string) => Promise<UIOption[]>;
}

export interface UIRadioProps extends UIBaseFieldProps {
  options: UIOption[];
  row?: boolean;
  type?: "radio" | "checkbox";
}

export interface UICheckboxProps extends UIBaseFieldProps {
  checked?: boolean;
}
export interface BaseFieldProps {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
}

export interface TextInputProps extends BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectInputProps extends BaseFieldProps {
  value: string | number;
  options: SelectOption[];
  onChange: (value: string | number) => void;
}

export interface CheckboxProps extends BaseFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export interface RadioOption {
  label: string;
  value: string | number;
}

export interface RadioGroupProps extends BaseFieldProps {
  value: string | number;
  options: RadioOption[];
  onChange: (value: string | number) => void;
}

// ============================================
// Typography Component Props
// ============================================

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps {
  level: HeadingLevel;
  headingText: string;
  className?: string;
  color?: string;
  sx?: SxProps<Theme>;
}

export type TextSize = 'lg' | 'md' | 'sm' | 'xs';
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' | 'white';

export interface TextProps {
  size?: TextSize;
  text: string;
  className?: string;
  color?: ColorVariant;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  as?: React.ElementType;
}

export interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  color?: ColorVariant;
  colorShade?: number;
  size?: 'lg' | 'md' | 'sm';
}

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type ButtonSize = 'lg' | 'md' | 'sm';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  buttonText: React.ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

export type LabelSize = 'lg' | 'md' | 'sm';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: LabelSize;
  labelText: string;
  color?: ColorVariant;
  required?: boolean;
}

export interface CaptionProps {
  children: React.ReactNode;
  className?: string;
  color?: ColorVariant;
}

export interface OverlineProps {
  children: React.ReactNode;
  className?: string;
  color?: ColorVariant;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  brand?: string;
}

export interface UsersTableData {
  id: number,
  name: string,
  status: string,
  department: string,
  slackId: string,
  userFile: string,
  phone: string,
  email: string,
  password: string,
}

export interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  confirmationHeading: string;
}
