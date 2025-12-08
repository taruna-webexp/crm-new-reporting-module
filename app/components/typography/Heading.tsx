"use client";

import React from "react";
import Typography from "@mui/material/Typography";
import type { HeadingProps } from "../../types/ui";

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, headingText, className, color, sx }, ref) => {
    return (
      <Typography
        ref={ref}
        variant={level}
        component={level}
        color={color}
        fontWeight={600}
        className={className}
        sx={sx}
      >
        {headingText}
      </Typography>
    );
  }
);

Heading.displayName = "Heading";

export default Heading;
