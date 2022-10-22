import { STATUS_REFERRAL_CODE } from "components/Status/types";
export const ListRewardSelectHistory = [
    {
        value: 0,
        label: "All",
    },
    {
        value: 1,
        label: STATUS_REFERRAL_CODE.NOT_CLAIM_YET,
    },
    {
        value: 2,
        label: STATUS_REFERRAL_CODE.CLAIMED,
    },
];
export var TYPE_REFERRAL_CODE;
(function (TYPE_REFERRAL_CODE) {
    TYPE_REFERRAL_CODE["HISTORY"] = "history";
    TYPE_REFERRAL_CODE["REWARD"] = "reward";
})(TYPE_REFERRAL_CODE || (TYPE_REFERRAL_CODE = {}));
export const LIST_MENU = [
    {
        title: "History",
        field: TYPE_REFERRAL_CODE.HISTORY,
    },
    {
        title: "Reward",
        field: TYPE_REFERRAL_CODE.REWARD,
    },
];
