import React, { useState } from "react";
import InputDefault from "components/Input/InputDefault";
import PageLayoutAuth from "./organisms/PageLayoutAuth";
import IconInputPassword from "components/Input/IconInputPassword";
import ButtonDefault from "components/Button/ButtonDefault";
import { useBoolean, useString } from "helpers/hooks";
import { STATUS_INPUT } from "components/Input/types";
import { isValidEmail, isValidUsername, showNotification } from "helpers/util";
import { loginMiddleware } from "./services/api";
import BackdropCustomize from "components/BackdropCustomize";
import { STATUS_RESPONSE_CODE } from "types";
import { pushTo } from "helpers/history";
import { PATH } from "helpers/constant";
import Typography from "components/Typography";
const LoginPage = () => {
    const username = useString();
    const password = useString();
    const changeTypePasswordInput = useBoolean();
    const isLoadingSubmit = useBoolean();
    const [statusEmailInput, setStatusEmailInput] = useState(STATUS_INPUT.DEFAULT);
    const handleChangeEmail = (event) => {
        let newStatus = STATUS_INPUT.DEFAULT;
        if (event.target.value) {
            newStatus = isValidEmail(event.target.value)
                ? STATUS_INPUT.VALID
                : STATUS_INPUT.ERROR;
        }
        username.setValue(event.target.value);
        setStatusEmailInput(newStatus);
    };
    const handleChangePassword = (event) => {
        password.setValue(event.target.value);
    };
    const handleChangeIconPassword = () => {
        changeTypePasswordInput.setValue(!changeTypePasswordInput.value);
    };
    const isDisabledButton = () => {
        if (!password.value) {
            return true;
        }
        return !isValidUsername(username.value);
    };
    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (isDisabledButton()) {
                return;
            }
            onSubmitLogin();
        }
    };
    const onSubmitLogin = () => {
        const dataRequest = {
            username: username.value,
            password: password.value,
        };
        isLoadingSubmit.setValue(true);
        loginMiddleware(dataRequest, (status, message, token) => {
            isLoadingSubmit.setValue(false);
            if (status !== STATUS_RESPONSE_CODE.SUCCESS) {
                showNotification("error", message);
                return;
            }
            localStorage.setItem("access_token", token);
            pushTo(PATH.user);
        });
    };
    const handleRedirectForgotPassword = () => {
        pushTo(PATH.forgotPassword);
    };
    return (<PageLayoutAuth title="Login" subtitle="Please login to start using!">
      <InputDefault label="Username" rootClass="mb-6" value={username.value} onChange={handleChangeEmail} 
    // status={statusEmailInput}
    onKeyPress={onKeyPress}/>
      <InputDefault label="Password" value={password.value} type={changeTypePasswordInput.value ? "text" : "password"} childrenIcon={<IconInputPassword isShowPassword={changeTypePasswordInput.value} handleChangeIconPassword={handleChangeIconPassword}/>} onChange={handleChangePassword} rootClass="mb-3" onKeyPress={onKeyPress}/>
      <Typography onClick={handleRedirectForgotPassword} fontWeight="font-light" textClass="mb-94-custom text-xs text-right cursor-pointer hover:text-primary-custom hover:underline">
        Forgot Password?
      </Typography>
      <ButtonDefault disabled={isDisabledButton()} widthButton="w-140-custom" onClick={onSubmitLogin} buttonClass="absolute bottom-10 left-32">
        Login
      </ButtonDefault>
      {isLoadingSubmit.value ? <BackdropCustomize /> : null}
    </PageLayoutAuth>);
};
export default LoginPage;
