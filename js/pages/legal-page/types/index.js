export var TYPE_LEGAL;
(function (TYPE_LEGAL) {
    TYPE_LEGAL["PRIVACY_POLICY"] = "Policy";
    TYPE_LEGAL["TERMS"] = "Terms";
    TYPE_LEGAL["HOW_TO_CONNECT"] = "Connect";
    TYPE_LEGAL["HOW_TO_FLAG"] = "Exchange-Flag";
    TYPE_LEGAL["APP_FEATURE"] = "App-Feature";
})(TYPE_LEGAL || (TYPE_LEGAL = {}));
export const LIST_MENU_LEGAL = [
    {
        title: "Terms of Service",
        field: TYPE_LEGAL.TERMS,
    },
    {
        title: "Privacy Policy",
        field: TYPE_LEGAL.PRIVACY_POLICY,
    },
    {
        title: "How to connect Wallet",
        field: TYPE_LEGAL.HOW_TO_CONNECT,
    },
    {
        title: "The benefits",
        field: TYPE_LEGAL.HOW_TO_FLAG,
    },
    {
        title: "Feature introduction",
        field: TYPE_LEGAL.APP_FEATURE,
    },
];
export const defaultEmptyLegalPage = {
    name: "",
    value: "",
};
