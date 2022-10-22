import React, { useState } from "react";
import InputDefault from "components/Input/InputDefault";
import PageLayoutAuth from "./organisms/PageLayoutAuth";
import ButtonDefault from "components/Button/ButtonDefault";
import { useBoolean, useString } from "helpers/hooks";
import { STATUS_INPUT } from "components/Input/types";
import { isValidEmail } from "helpers/util";
import BackdropCustomize from "components/BackdropCustomize";
import { pushTo } from "helpers/history";
import { PATH } from "helpers/constant";
import Typography from "components/Typography";
import { forgotPasswordMiddleware } from "./services/api";
import { STATUS_RESPONSE_CODE } from "types";
import IconEmail from "assets/images/icons/email.svg";
const ForgotPassword = () => {
    const email = useString();
    const isLoadingSubmit = useBoolean();
    const isSendMail = useBoolean();
    const [statusEmailInput, setStatusEmailInput] = useState(STATUS_INPUT.DEFAULT);
    const handleChangeEmail = (event) => {
        let newStatus = STATUS_INPUT.DEFAULT;
        if (event.target.value) {
            newStatus = isValidEmail(event.target.value)
                ? STATUS_INPUT.VALID
                : STATUS_INPUT.ERROR;
        }
        email.setValue(event.target.value);
        setStatusEmailInput(newStatus);
    };
    const isDisabledButton = () => {
        return !isValidEmail(email.value);
    };
    const onKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (isDisabledButton()) {
                return;
            }
            onSubmitForgotPassword();
        }
    };
    const onSubmitForgotPassword = () => {
        const dataRequest = {
            email: email.value,
        };
        isLoadingSubmit.setValue(true);
        forgotPasswordMiddleware(dataRequest, (status) => {
            isLoadingSubmit.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                isSendMail.setValue(true);
            }
        });
    };
    const handleRedirectLogin = () => {
        pushTo(PATH.login);
    };
    return (<PageLayoutAuth title={isSendMail.value ? "Please confirm your email" : "Forgot Password"} subtitle={isSendMail.value ? "" : "Please enter your email to reset the password!"}>
      {isSendMail.value ? (<React.Fragment>
          <Typography variant="h6" fontWeight="font-medium" textClass="mb-8">
            We have sent you a confirmation link via email:{" "}
            <span className="text-yellow-custom">{email.value}</span>
          </Typography>
          <div className="flex justify-center mb-94-custom">
            <img src={IconEmail} alt="icon" className="w-144-custom"/>
          </div>
          <div className="flex justify-center">
            <ButtonDefault widthButton="w-140-custom" onClick={handleRedirectLogin}>
              Login now
            </ButtonDefault>
          </div>
        </React.Fragment>) : (<React.Fragment>
          <InputDefault label="Email" rootClass="mb-6" value={email.value} onChange={handleChangeEmail} status={statusEmailInput} onKeyPress={onKeyPress}/>
          <Typography onClick={handleRedirectLogin} fontWeight="font-light" textClass="mb-94-custom text-xs text-right cursor-pointer hover:text-primary-custom hover:underline">
            I remembered my password
          </Typography>

          <ButtonDefault disabled={isDisabledButton()} widthButton="w-140-custom" onClick={onSubmitForgotPassword}>
            Reset My Password
          </ButtonDefault>
        </React.Fragment>)}

      {isLoadingSubmit.value ? <BackdropCustomize /> : null}
    </PageLayoutAuth>);
};
export default ForgotPassword;
