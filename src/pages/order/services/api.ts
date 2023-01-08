import Axios, { AxiosResponse, CancelTokenSource } from "axios"
import { showNotification } from "helpers/util";
import { STATUS_RESPONSE_CODE } from "types";
import { OrderDetail, ParamsRequest } from "../types";

export const getOrderMiddleware = async (
    params: ParamsRequest,
    source?: CancelTokenSource
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse<{
        data: {
            data: OrderDetail[];
            total: number;
        };
        message: string;
        statusCode: number;
    }> = await Axios.get(`/order/admin`, {
        params,
    });

    return response.data.data;
}

export const searchMailboxMiddleware = async (
    params: ParamsRequest,
    source?: CancelTokenSource
) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response: AxiosResponse<{
        data: {
            data: OrderDetail[];
            total: number;
        };
        message: string;
        statusCode: number;
    }> = await Axios.get(`/mail/admin/search`, {
        params,
    });

    return response.data.data;
}
