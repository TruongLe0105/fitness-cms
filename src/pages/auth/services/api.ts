import Axios, { AxiosResponse } from "axios";
import { showNotification } from "helpers/util";
import { AuthMeDetail } from "pages/layout/types";
import { STATUS_RESPONSE_CODE } from "types";
import {
  ForgotPasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
} from "../types";
import stateStore from "slices/store";
import { setInfoAuth } from "slices/authSlice";
// eslint-disable-next-line
export const loginMiddleware = (
  request: LoginRequest,
  callBack: (
    status: STATUS_RESPONSE_CODE,
    message: string,
    token: string
  ) => void
) => {
  Axios.post(`/admin/login`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
        localStorage.setItem(
          "access_token",
          response?.data?.data?.access_token
        );
      } else {
        showNotification("error", response?.data?.data?.errors);
        return;
      }
      callBack(
        response.data.statusCode,
        "success",
        response.data.data.accessToken
      );
    })
    .catch((error) => {
      callBack(
        STATUS_RESPONSE_CODE.ERROR,
        error?.response?.data?.message,
        "null"
      );
    });
};
// eslint-disable-next-line
export const getAuthMeMiddleware = async () => {
  Axios.get(`/api/system-user/auth/me`).then(
    (response: AxiosResponse<{ data: AuthMeDetail }>) => {
      if (response.data.data) {
        stateStore.dispatch(
          setInfoAuth({
            email: response.data.data.email,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            id: response.data.data.id,
            avatar: response.data.data.avatar,
          })
        );
      }
    }
  );
};
// eslint-disable-next-line
export const forgotPasswordMiddleware = (
  request: ForgotPasswordRequest,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/system-auth/forgot-password`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      callBack(response.data.statusCode);
      if (response.data.statusCode !== STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification("error", response.data.message);
      }
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
// eslint-disable-next-line
export const resetPasswordMiddleware = (
  token: string,
  request: ResetPasswordRequest,
  callBack: (status: STATUS_RESPONSE_CODE) => void
) => {
  Axios.post(`/system-auth/reset-password?token=${token}`, request)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((response: any) => {
      callBack(response.data.statusCode);
      if (response.data.statusCode !== STATUS_RESPONSE_CODE.SUCCESS) {
        showNotification(
          "error",
          response.data.data ? response.data.data.errors : response.data.message
        );
      }
    })
    .catch(() => {
      callBack(STATUS_RESPONSE_CODE.ERROR);
    });
};
