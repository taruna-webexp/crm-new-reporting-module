"use client";

import React from "react";
import NextLink from "next/link";
import MuiLink from "@mui/material/Link";
import type { LinkControllerProps } from "../../types/components";

const LinkController: React.FC<LinkControllerProps> = ({
  href,
  className,
  target,
  underline = "hover",
  color = "primary",
  label,
}) => {
  return (
    <MuiLink
      component={NextLink}
      href={href}
      target={target}
      underline={underline}
      color={color}
      className={className}
      sx={{
        fontWeight: 500,
        transition: "color .2s ease",
      }}
    >
      {label}
    </MuiLink>
  );
};

export default LinkController;
