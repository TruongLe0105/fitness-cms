export var TYPE_NOTIFICATION;
(function (TYPE_NOTIFICATION) {
    TYPE_NOTIFICATION["ALL"] = "all";
    TYPE_NOTIFICATION["IOS"] = "ios";
    TYPE_NOTIFICATION["ANDROID"] = "android";
})(TYPE_NOTIFICATION || (TYPE_NOTIFICATION = {}));
export const emptyNotificationDetail = {
    createdAt: "",
    updatedAt: "",
    id: 0,
    type: TYPE_NOTIFICATION.ALL,
    name: "",
    url: "",
    description: "",
    send: false,
    startDate: "",
};
export const emptyUserDetail = {
    createdAt: "",
    updatedAt: "",
    id: 0,
    // type: TYPE_NOTIFICATION.ALL,
    // name: "",
    // url: "",
    // description: "",
    // send: false,
    // startDate: "",
    userName: "",
    walletAddress: "",
    sign: "",
    tokenCount: 0,
    inventory: 0,
};
export const emptyTransactionDetail = {
    txhash: "",
    status: "",
    from: "",
    account: "",
    to: "",
    token_amount: 0,
    coin_amount: 0,
    net_coin_amount: 0,
    value: 0,
    type: "",
    nonce: "",
    block_number: 0,
    user_id: "",
    created_at: 0,
    updated_at: 0,
    id: "",
};
export var STATUS_NOTIFICATION;
(function (STATUS_NOTIFICATION) {
    STATUS_NOTIFICATION["ALL"] = "";
    STATUS_NOTIFICATION["SENT"] = "Sent";
    STATUS_NOTIFICATION["UNSENT"] = "Unsent";
})(STATUS_NOTIFICATION || (STATUS_NOTIFICATION = {}));
export const ListOptionToSendSelect = [
    {
        value: TYPE_NOTIFICATION.ALL,
        label: "All",
    },
    {
        value: TYPE_NOTIFICATION.ANDROID,
        label: "Android",
    },
    {
        value: TYPE_NOTIFICATION.IOS,
        label: "IOS",
    },
];
export const ListSentSelect = [
    {
        value: STATUS_NOTIFICATION.ALL,
        label: "All",
    },
    {
        value: "true",
        label: "Sent",
    },
    {
        value: "false",
        label: "Unsent",
    },
];
