import React from "react";

export interface MenuSettingProps {
  active: number;
  handleChangeMenu: (index: number, field: TYPE_SETTING) => () => void;
}

export enum TYPE_SETTING {
  REWARD = "reward",
  SET_COST = "setCost",
}

export interface MenuSettingDetail {
  title: string;
  field: TYPE_SETTING;
}

export const LIST_MENU_SETTING: MenuSettingDetail[] = [
  {
    title: "Reward",
    field: TYPE_SETTING.REWARD,
  },
  {
    title: "Set Price",
    field: TYPE_SETTING.SET_COST,
  },
];

export interface RewardDetail {
  createdAt: string;
  name: string;
  type: string;
  updatedAt: string;
  value: string;
}

export const emptyRewardDetail: RewardDetail = {
  createdAt: "",
  name: "",
  type: "",
  updatedAt: "",
  value: "",
};

export enum SettingType {
  MINT_PRICE = "mint-price",
  REFERRAL = "referral",
  LOCK_STAR = "lock-star",
  NUMBER_OF_TICKET = "number-of-ticket",
  BANNER = "banner",
  VERSION = "version",
  SUPPORT_EMAIL = "support-email",
  WHAT_NEW = "what-new",
}

export enum SettingName {
  REWARD = "reward",
  STAR = "Star",
  KEYWORD = "Keyword",
  REGISTER_NAME = "Register-Name",
  LOCK_STAR = "Lock Star",
  NUMBER_OF_STAR_TICKET = "Exchange-Flag",
  NUMBER_OF_KEYWORD_TICKET = "Exchange-Flag-Keyword",
  LISTING_FEE = "Listing-Fee",
  MIN_PRICE = "Min-Price",
  MAX_PRICE = "Max-Price",
  MAX_EXPIRY_DATE = "Max-Expiry-Date",
  ANDROID_VERSION = "Android-Version",
  IOS_VERSION = "iOS-Version",
  SUPPORT_EMAIL = "Support-Email",
  WHAT_NEW = "What-New",
}

export enum Banner {
  BENEFIT_PIONEER = "Banner Pioneer",
  UPGRADE_PIONEER_ST1 = "Banner Upgrade Pioneer Step 1",
  UPGRADE_PIONEER_ST2 = "Banner Upgrade Pioneer Step 2",
  UPGRADE_PIONEER_ST3 = "Banner Upgrade Pioneer Step 3",
  ADS = "ADS",
}

export interface SettingContentWrapperProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  title: string;
  component: JSX.Element;
  containerClass?: string;
  titleClass?: string;
}

export interface ImageSetBannerProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  fileInput: any;
  onSelectedFiles: (files: FileList) => void;
  keyInputFile: string;
  handleRemoveFileInput: (event) => void;
  originImage: string;
  inputId: string;
  width: number;
  height: number;
  accept?: string;
  onDeletedFile?: (event) => void;
}

export interface LockStarMapProps {
  isLoading: {
    value: boolean;
    setValue: (value: boolean) => void;
  };
}

export interface SetBannerProps {
  bannerName: Banner;
  message: string;
  inputId: string;
  width: number;
  height: number;
  setLoading: (value: boolean) => void;
  visibleBannerNote?: boolean;
  buttonPosition?: "vertical" | "horizontal";
  bannerNoteStyle?: React.CSSProperties;
  accept?: string;
  onDeletedFile?: (event) => void;
}

export enum TYPE_SETTING {
  LOCK_STAR_MAP = "LOCK_STAR_MAP",
  SET_BANNER = "SET_BANNER",
  SET_PRICE = "SET_PRICE",
  SET_REWARD = "SET_REWARD",
  SET_NUMBER_OF_TICKET = "SET_NUMBER_OF_TICKET",
  SET_VERSION = "SET_VERSION",
  SET_SUPPORT_EMAIL = "SET_SUPPORT_EMAIL",
  SET_WHAT_NEW = "SET_WHAT_NEW",
  SET_KEYWORD_CATEGORY = "SET_KEYWORD_CATEGORY",
}

export interface MenuSettingDetail {
  title: string;
  field: TYPE_SETTING;
}

export interface MenuSettingProps {
  active: number;
  handleChangeMenu: (index: number, field: TYPE_SETTING) => () => void;
}

export interface SettingVersionInput {
  name: string;
  link: string;
  versionCode: number;
  buildNumber: number;
  isRequired: boolean;
}
