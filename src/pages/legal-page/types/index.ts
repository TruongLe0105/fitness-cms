export interface MenuLegalProps {
  active: number;
  handleChangeMenu: (index: number, field: TYPE_LEGAL) => () => void;
}

export enum TYPE_LEGAL {
  PRIVACY_POLICY = "Policy",
  TERMS = "Terms",
  HOW_TO_CONNECT = "Connect",
  HOW_TO_FLAG = "Exchange-Flag",
  APP_FEATURE = "App-Feature",
}
export interface MenuLegalDetail {
  title: string;
  field: TYPE_LEGAL;
}

export const LIST_MENU_LEGAL: MenuLegalDetail[] = [
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
export interface LegalPageDetail {
  name: string;
  value: string;
}

export const defaultEmptyLegalPage: LegalPageDetail = {
  name: "",
  value: "",
};

export interface FormUpdateProps {
  openPopup: boolean;
  handleClosePopup: () => void;
  title: string;
  valueInput: string;
  field: TYPE_LEGAL;
  handleUpdateData: (dataRes: LegalPageDetail) => void;
}
