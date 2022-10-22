import React from "react";

export interface DialogCardProps {
  childrenAction?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popupRef?: any;
  handleCLoseDialog: () => void;
  openPopup?: boolean;
  disablePopup?: boolean;
  rootStyle?: React.CSSProperties;
  classAction?: string;
  size?: "xs" | "md" | "xl";
  action?: React.ReactNode;
}

export interface DeleteDialogProps {
  url: string;
  label: string;
  message: string;
  handleUpdateWhenDestroy: () => void;
  openPopup: boolean;
  onClose: () => void;
}
