import React from "react";

export interface SelectDefaultProps {
  options: any[];
  selectedOption?: any;
  handleChange?: (selectedOption: any) => void;
  filed?: string;
  rootClasses?: string;
  isDisabled?: boolean;
  controlWidth?: number;
  styleSingleValue?: React.CSSProperties;
  styleControl?: React.CSSProperties;
  label?: string;
  required?: boolean;
  defaultValue?: any;
  isMulti?: boolean;
  labelStyle?: React.CSSProperties;
  dataTreasure?: any[];
}
