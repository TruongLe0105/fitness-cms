import { MouseEventHandler } from "react";

export interface DeleteIconProps {
  disable: boolean;
  onClick?: MouseEventHandler | undefined;
}
export interface EditIconProps {
  disable: boolean;
  onClick?: MouseEventHandler | undefined;
}
export interface DefaultButtonIconProps {
  disable: boolean;
  onClick?: MouseEventHandler | undefined;
  field:
    | "delete"
    | "edit"
    | "mint"
    | "cost"
    | "sell"
    | "cancel"
    | "lock"
    | "pause"
    | "resume"
    | "view";
  titleTooltip: string;
  rootClassIcon?: string;
  keyButtonIcon: string;
}
