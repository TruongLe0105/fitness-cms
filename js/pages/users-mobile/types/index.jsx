var USER_GENDER;
(function (USER_GENDER) {
    USER_GENDER["MALE"] = "male";
    USER_GENDER["FEMALE"] = "female";
    USER_GENDER["OTHER"] = "other";
})(USER_GENDER || (USER_GENDER = {}));
export const defaultEmptyUserMobileDetail = {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    avatar: "",
    status: "",
    keywordsOwned: 0,
    startsOwned: 0,
    createdAt: "",
    isSubscription: false,
    loginType: "",
    address: [],
    totalClaimable: 0,
    totalClaimed: 0,
};
export var STATUS_USER_MOBILE;
(function (STATUS_USER_MOBILE) {
    STATUS_USER_MOBILE["ACTIVE"] = "Active";
    STATUS_USER_MOBILE["IN_ACTIVE"] = "In-Active";
})(STATUS_USER_MOBILE || (STATUS_USER_MOBILE = {}));
