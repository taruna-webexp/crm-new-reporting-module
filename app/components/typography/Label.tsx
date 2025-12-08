"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import type { LabelProps } from "../../types/ui";

const variantMap = {
  lg: "body1",
  md: "body2",
  sm: "caption",
} as const;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      size = "md",
      labelText,
      className,
      color = "textPrimary",
      required,
      htmlFor,
      ...props
    },
    ref
  ) => {
    return (
      <Typography
        ref={ref}
        component="label"
        htmlFor={htmlFor}
        variant={variantMap[size]}
        fontWeight={500}
        color={color === "neutral" ? "textSecondary" : color}
        className={className}
        {...props}
      >
        {labelText}
        {required && (
          <Typography
            component="span"
            color="error"
            fontWeight={700}
            sx={{ ml: 0.5 }}
          >
            *
          </Typography>
        )}
      </Typography>
    );
  }
);

Label.displayName = "Label";

export default Label;
