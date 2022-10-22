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
