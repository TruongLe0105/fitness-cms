/* eslint-disable @typescript-eslint/no-explicit-any */
export const DEFAULT_STATUS = "Im a lonely star looking for an owner";
export const defaultEmptyTreasureDetail = {
    id: "",
    name: "",
    description: "",
    imgUrl: "",
    tokenContract: "",
    total: 0,
    type: '',
    starId: '',
    isClaimed: false,
};
export const defaultAddTreasureInput = {
    name: "",
    description: "",
    tokenContract: "",
    starId: "",
    type: "",
    total: 0,
    imgUrl: "",
};
export var FiledFilterItem;
(function (FiledFilterItem) {
    FiledFilterItem["TOKEN"] = "tokens";
    FiledFilterItem["TYPES"] = "types";
})(FiledFilterItem || (FiledFilterItem = {}));
export var TOKEN_STATUS_FILTER;
(function (TOKEN_STATUS_FILTER) {
    TOKEN_STATUS_FILTER["WBNB"] = "0xae13d989dac2f0debff460ac112a837c89baa7cd";
    TOKEN_STATUS_FILTER["BUSD"] = "0x98649fde88981790b574c9A6066004D5170Bf3EF";
    TOKEN_STATUS_FILTER["ETH"] = "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378";
})(TOKEN_STATUS_FILTER || (TOKEN_STATUS_FILTER = {}));
export var TYPES_STATUS_FILTER;
(function (TYPES_STATUS_FILTER) {
    TYPES_STATUS_FILTER["A"] = "A";
    TYPES_STATUS_FILTER["B"] = "B";
    TYPES_STATUS_FILTER["C"] = "C";
    TYPES_STATUS_FILTER["D"] = "D";
    TYPES_STATUS_FILTER["E"] = "E";
})(TYPES_STATUS_FILTER || (TYPES_STATUS_FILTER = {}));
