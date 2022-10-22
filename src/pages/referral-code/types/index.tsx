import { STATUS_REFERRAL_CODE } from "components/Status/types";

export interface ParamsRequestHistory {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search: string;
  reward: number;
}

export interface ParamsRequestReward {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search: string;
}
export interface ReferralCodeHistoryDetail {
  id: number;
  code: string;
  isReward: boolean;
  createdAt: string;
  reward: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  referrer: {
    id: string;
    email: string;
    status: string;
    firstName: string;
    lastName: string;
    avatar: string;
    referralCode: string;
  };
  referralReward: ReferralCodeRewardDetail;
}

export interface ReferralCodeRewardDetail {
  id: number;
  createdAt: string;
  reward: number;
  status: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  referrer: {
    id: string;
    email: string;
    status: string;
    firstName: string;
    lastName: string;
    avatar: string;
    referralCode: string;
  };
}

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

export interface MenuReferralCodeProps {
  active: number;
  handleChangeMenu: (index: number, field: TYPE_REFERRAL_CODE) => () => void;
}

export enum TYPE_REFERRAL_CODE {
  HISTORY = "history",
  REWARD = "reward",
}

export interface MenuReferralCodeDetail {
  title: string;
  field: TYPE_REFERRAL_CODE;
}

export const LIST_MENU: MenuReferralCodeDetail[] = [
  {
    title: "History",
    field: TYPE_REFERRAL_CODE.HISTORY,
  },
  {
    title: "Reward",
    field: TYPE_REFERRAL_CODE.REWARD,
  },
];
