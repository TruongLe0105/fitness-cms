import React from "react";
import IconHiddenPassword from "assets/images/icons/hidden-password.svg";
import IconShowPassword from "assets/images/icons/show-password.svg";
import { IconInputPasswordProps } from "./types";

const IconInputPassword = (props: IconInputPasswordProps): JSX.Element => {
  const { isShowPassword, handleChangeIconPassword } = props;
  return (
    <img
      onClick={handleChangeIconPassword}
      src={isShowPassword ? IconShowPassword : IconHiddenPassword}
      alt="icon"
    />
  );
};
export default IconInputPassword;
