"use client";

import React from "react";
import { useSnackbar, OptionsObject, SnackbarKey } from "notistack";

export type NotifyProps = {
  title?: string;
  message: string;
};

export function useNotify() {
  const { enqueueSnackbar } = useSnackbar();

  const renderContent = ({ title, message }: NotifyProps) => (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {title && <strong>{title}</strong>}
      <span>{message}</span>
    </div>
  );

  const show = (
    props: NotifyProps,
    options: OptionsObject
  ): SnackbarKey =>
    enqueueSnackbar(renderContent(props), options);

  return {
    success: (props: NotifyProps) =>
      show(props, { variant: "success" }),

    error: (props: NotifyProps) =>
      show(props, { variant: "error" }),

    warn: (props: NotifyProps) =>
      show(props, { variant: "warning" }),

    info: (props: NotifyProps) =>
      show(props, { variant: "info" }),
  };
}
