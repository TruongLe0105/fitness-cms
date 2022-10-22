import React from "react";
import InputDefault from "components/Input/InputDefault";
import PageLayoutAuth from "./organisms/PageLayoutAuth";
import IconInputPassword from "components/Input/IconInputPassword";
import ButtonDefault from "components/Button/ButtonDefault";
import { useBoolean, useString } from "helpers/hooks";
import { ResetPasswordRequest } from "./types";
import { resetPasswordMiddleware } from "./services/api";
import BackdropCustomize from "components/BackdropCustomize";
import { STATUS_RESPONSE_CODE } from "types";
import { pushTo } from "helpers/history";
import { PATH } from "helpers/constant";
import Typography from "components/Typography";
import { useLocation } from "react-router-dom";
import IconCheckCircle from "assets/images/icons/check-circle.svg";

const ResetPassword = (): JSX.Element => {
  const location = useLocation();
  const tokenParam = location.pathname.replace("/reset-password/", "");
  const password = useString();
  const confirmPassword = useString();
  const changeTypePasswordInput = useBoolean();
  const isLoadingSubmit = useBoolean();
  const isVerifyPassword = useBoolean();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    password.setValue(event.target.value);
  };
  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    confirmPassword.setValue(event.target.value);
  };

  const handleChangeIconPassword = () => {
    changeTypePasswordInput.setValue(!changeTypePasswordInput.value);
  };

  const isDisabledButton = () => {
    if (!password.value) {
      return true;
    }
    return password.value !== confirmPassword.value;
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isDisabledButton()) {
        return;
      }
      onSubmitResetPassword();
    }
  };

  const onSubmitResetPassword = () => {
    if (!tokenParam) {
      return;
    }

    const dataRequest: ResetPasswordRequest = {
      confirmPassword: confirmPassword.value,
      password: password.value,
    };
    isLoadingSubmit.setValue(true);
    resetPasswordMiddleware(
      tokenParam.replace("/", ""),
      dataRequest,
      (status: STATUS_RESPONSE_CODE) => {
        isLoadingSubmit.setValue(false);
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          isVerifyPassword.setValue(true);
        }
      }
    );
  };

  const handleRedirectLogin = () => {
    pushTo(PATH.login);
  };

  return (
    <PageLayoutAuth
      title="Reset password"
      subtitle={
        isVerifyPassword.value
          ? "You have changed password successfully!"
          : "Please enter your new password!"
      }
    >
      {isVerifyPassword.value ? (
        <React.Fragment>
          <div className="flex justify-center mb-94-custom">
            <img src={IconCheckCircle} alt="icon" />
          </div>
          <div className="flex justify-center">
            <ButtonDefault
              widthButton="w-140-custom"
              onClick={handleRedirectLogin}
            >
              Login now
            </ButtonDefault>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <InputDefault
            label="Password"
            rootClass="mb-6"
            value={password.value}
            type={changeTypePasswordInput.value ? "text" : "password"}
            childrenIcon={
              <IconInputPassword
                isShowPassword={changeTypePasswordInput.value}
                handleChangeIconPassword={handleChangeIconPassword}
              />
            }
            onChange={handleChangePassword}
            onKeyPress={onKeyPress}
          />
          <InputDefault
            label="Confirm password"
            rootClass="mb-6"
            value={confirmPassword.value}
            type={changeTypePasswordInput.value ? "text" : "password"}
            childrenIcon={
              <IconInputPassword
                isShowPassword={changeTypePasswordInput.value}
                handleChangeIconPassword={handleChangeIconPassword}
              />
            }
            onChange={handleChangeConfirmPassword}
            onKeyPress={onKeyPress}
          />
          <Typography
            onClick={handleRedirectLogin}
            fontWeight="font-light"
            textClass="mb-94-custom text-xs text-right cursor-pointer hover:text-primary-custom hover:underline"
          >
            I remembered my password
          </Typography>
          <ButtonDefault
            disabled={isDisabledButton()}
            widthButton="w-140-custom"
            onClick={onSubmitResetPassword}
          >
            Change My Password
          </ButtonDefault>
        </React.Fragment>
      )}

      {isLoadingSubmit.value ? <BackdropCustomize /> : null}
    </PageLayoutAuth>
  );
};

export default ResetPassword;
