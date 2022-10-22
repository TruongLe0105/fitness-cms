import React from "react";

export enum STATUS_INPUT {
  DEFAULT = "default",
  ERROR = "error",
  VALID = "valid",
}

export enum PLACEHOLDER_INPUT{
  WALLET_ADDRESS= 'walletAddress',
  CHARACTER_NAME= 'character name',
}

export interface InputDefaultProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  status?: STATUS_INPUT;
  label?: string;
  rootClass?: string;
  childrenIcon?: React.ReactNode;
  classInput?: string;
  tooltipId?: string;
  tooltipLabel?: string;
  required?: boolean;
  inputStyle?: React.CSSProperties;
  rootStyle?: React.CSSProperties;

  // custom 
  // placeholder?: PLACEHOLDER_INPUT;
}

export interface IconInputPasswordProps {
  isShowPassword: boolean;
  handleChangeIconPassword: () => void;
}

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  rootClass?: string;
  label?: string;
  classInput?: string;
  inputStyle?: React.CSSProperties;
}

export interface InputDatePickerProps {
  rootClass?: string;
  label?: string;
  classInput?: string;
  inputDate: Date;
  setInputDate: (inputDate: Date) => void;
  dateFormat?: string;
  hideTimeSelect?: boolean;
  required?: boolean;
}

export interface CustomCurrencyInputProps {
  disabled?: boolean;
  decimalsLimit?: number;
  value: string;
  onValueChange: (value: string | undefined) => void;
  rootClass?: string;
  classInput?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  autoFocusInput?: boolean;
}
