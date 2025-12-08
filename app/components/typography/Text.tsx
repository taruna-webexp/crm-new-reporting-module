"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import type { TextProps } from "../../types/ui";

const variantMap = {
  lg: "body1", // Large body
  md: "body2", // Default body
  sm: "caption", // Small text
  xs: "overline", // Extra small text
} as const;

const weightMap = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      size = "md",
      text,
      className,
      weight = "normal",
      as = "span",
      color = "textPrimary",
    },
    ref
  ) => {
    return (
      <Typography
        ref={ref}
        variant={variantMap[size]}
        component={as}
        color={color}
        fontWeight={weightMap[weight]}
        className={className}
      >
        {text}
      </Typography>
    );
  }
);

Text.displayName = "Text";

export default Text;
