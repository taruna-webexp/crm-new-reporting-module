/**
 * Component Props and Types
 * Consolidates all interfaces and types for controllers and layout components
 */

import type { UIBaseFieldProps } from "./ui";
import type { ReactNode } from "react";

// ============================================
// Header Component
// ============================================
export interface HeaderProps {
  title?: string;
  onToggleSidebar?: () => void;
}

// ============================================
// Sidebar Component
// ============================================
export interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// ============================================
// Card Controller
// ============================================
export interface CardControllerProps extends Omit<UIBaseFieldProps, "value" | "onChange"> {
  name?: string | undefined;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  footer?: ReactNode;
}

// ============================================
// Link Controller
// ============================================
export interface LinkControllerProps {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  underline?: "none" | "hover" | "always";
  color?: "primary" | "secondary" | "error" | "inherit";
  label: string;
  className?: string;
}

// ============================================
// Date/Time Controller
// ============================================
export type DateTimeType = "date" | "datetime-local" | "time";

export interface DateTimeControllerProps extends UIBaseFieldProps {
  type?: DateTimeType;
  value?: string;
  onChange?: (value: string) => void;
  min?: string;
  max?: string;
}

// ============================================
// Date Range Controller
// ============================================
export interface DateRangeValue {
  startDate?: string;
  endDate?: string;
}

export interface DateRangeControllerProps extends UIBaseFieldProps {
  label?: string;
  value?: DateRangeValue;
  onChange?: (range: DateRangeValue) => void;
  className?: string;
}
