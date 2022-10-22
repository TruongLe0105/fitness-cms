import { useBoolean, useString } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingType } from "../types";
const useTicketHooks = (ticketType) => {
    const ticket = useString("");
    const loading = useBoolean(false);
    const updateTicket = (newValue) => {
        loading.setValue(true);
        updateSettingMiddleware("number of ticket", SettingType.NUMBER_OF_TICKET, ticketType, {
            value: newValue,
        }, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                ticket.setValue(value);
            }
            loading.setValue(false);
        });
    };
    React.useEffect(() => {
        loading.setValue(true);
        getSettingMiddleware(SettingType.NUMBER_OF_TICKET, ticketType, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                ticket.setValue(value);
            }
            loading.setValue(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return { isLoading: loading.value, ticket, updateTicket };
};
export default useTicketHooks;
