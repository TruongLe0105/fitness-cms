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
    id: "",
    email: "",
    login_type: "",
    wallet: "",
    name: "",
    created_at: 0,
    total_coin: 0,
    pending_coin: 0,
    is_online: false,
    coin_earned_today: 0,
    coin_earned_week: 0,
    coin_earned_month: 0,
};
export const emptyUserCharacterDetail = {
    user: null,
    character: null,
    id: 0,
    isSelect: false,
    isPlay: false,
    playNum: 0,
    maxPlayNum: 0,
    createdAt: "",
    updatedAt: "",
};
export const emptyInventoryDetail = {
    userName: "",
    walletAddress: "",
    sign: "",
    tokenCount: 0,
    inventory: null,
    createdAt: "",
    updatedAt: "",
    id: 0,
};
export var STATUS_NOTIFICATION;
(function (STATUS_NOTIFICATION) {
    STATUS_NOTIFICATION["ALL"] = "";
    STATUS_NOTIFICATION["SENT"] = "Sent";
    STATUS_NOTIFICATION["UNSENT"] = "Unsent";
})(STATUS_NOTIFICATION || (STATUS_NOTIFICATION = {}));
export var POINT_LEVEL;
(function (POINT_LEVEL) {
    POINT_LEVEL["ALL"] = "";
    POINT_LEVEL["POINT_OVER_50000"] = ">=50000";
    POINT_LEVEL["POINT_LOWER_50000"] = "<50000";
    // POINT_10000_TO_50000 = "10000-50000",
})(POINT_LEVEL || (POINT_LEVEL = {}));
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
export const ListPointSelect = [
    {
        value: POINT_LEVEL.ALL,
        label: "All",
    },
    {
        value: POINT_LEVEL.POINT_OVER_50000,
        label: POINT_LEVEL.POINT_OVER_50000,
    },
    {
        value: POINT_LEVEL.POINT_LOWER_50000,
        label: POINT_LEVEL.POINT_LOWER_50000,
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
