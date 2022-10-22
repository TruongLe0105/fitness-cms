import React from "react";
import IconHiddenPassword from "assets/images/icons/hidden-password.svg";
import IconShowPassword from "assets/images/icons/show-password.svg";
const IconInputPassword = (props) => {
    const { isShowPassword, handleChangeIconPassword } = props;
    return (<img onClick={handleChangeIconPassword} src={isShowPassword ? IconShowPassword : IconHiddenPassword} alt="icon"/>);
};
export default IconInputPassword;
