import Axios, { AxiosResponse, CancelTokenSource } from "axios"
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import { InputMail, MailboxDetail, ParamsRequest } from "../types"

export const getMailboxMiddleware = async (
    params: ParamsRequest,
    source?: CancelTokenSource
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse<{
        data: {
            data: MailboxDetail[];
            total: number;
        };
        message: string;
        statusCode: number;
    }> = await Axios.get(`/mail/admin`, {
        params,
    });

    return response.data.data;
}

export const searchMailboxMiddleware = async (
    params: ParamsRequest,
    source?: CancelTokenSource
) => {
    if (params?.keyword?.length === 0) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse<{
        data: {
            data: MailboxDetail[];
            total: number;
        };
        message: string;
        statusCode: number;
    }> = await Axios.get(`/mail/admin/search`, {
        params,
    });

    return response.data.data;
}

export const createMailbox = (
    request: InputMail,
    callBack: (status: STATUS_RESPONSE_CODE) => void,
) => {
    Axios.post(`/mail/admin/create`, request)
        .then((response: any) => {
            if (response.data.statusCode === STATUS_RESPONSE_CODE.SUCCESS) {
                showNotification("success", "Create Mailbox successfully!");
                callBack(response.data.statusCode);
                return;
            }
            showNotification(
                "error",
                response.data.data ? response.data.data.errors : response.data.message
            );

            callBack(response.data.statusCode);
        })
        .catch(() => {
            callBack(STATUS_RESPONSE_CODE.ERROR)
        })
}
