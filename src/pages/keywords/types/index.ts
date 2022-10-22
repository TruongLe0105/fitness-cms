import {
  MarketDetail,
  OwnerDetail,
  SetMintPriceBody,
  StarDetail,
} from "pages/stars/types";

export interface SystemKeywordDetail {
  id: string;
  name: string;
  createdAt: string;
  nftId: string;
  ownerAddress: string;
  ownerBoughtAt: string;
  priceUsdLast: string;
  purchasePrice: string;
  txHashLast: string;
  status: string;
  owner?: OwnerDetail;
  market?: MarketDetail;
  checked?: boolean;
  star?: StarDetail;
  onMarket: boolean;
  uuidMint: string;
  mintPrice: number;
  category?: KeywordCategory;
  meaning: string;
}
export interface ParamsKeywordRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search: string;
  market_status?: string[];
  owner_status?: string[];
  link_with_star?: string[];
  types?: string[];
  categories?: number[];
}
export interface FormImportProps {
  openForm: boolean;
  onClose: () => void;
  updateListKeywordWhenImport: () => void;
}

export interface FormInputKeyword {
  name: string;
  categoryId: number;
  meaning: string;
}

export const defaultEmptyFormInputKeyword: FormInputKeyword = {
  name: "",
  categoryId: -1,
  meaning: "",
};

export const defaultEmptySystemKeywordDetail: SystemKeywordDetail = {
  id: "",
  name: "",
  createdAt: "",
  nftId: "",
  ownerAddress: "",
  ownerBoughtAt: "",
  priceUsdLast: "",
  purchasePrice: "",
  txHashLast: "",
  status: "",
  onMarket: false,
  uuidMint: "",
  mintPrice: 0,
  meaning: "",
};

export interface FormChangeProps {
  categories: KeywordCategory[];
  dataItem: SystemKeywordDetail;
  openFormChange: boolean;
  handleUpdateList: (dataRes?: SystemKeywordDetail) => void;
  onClose: () => void;
}

export interface ViewKeywordProps {
  dataItem: SystemKeywordDetail;
  openView: boolean;
  handleClose: () => void;
}

export interface FormIncreaseAllowanceProps {
  dataItem: {
    allowanceValue: number;
  };
  openForm: boolean;
  onClose: () => void;
}
export interface FormSetCostProps {
  dataItem: {
    keywords: SystemKeywordDetail[];
    defaultMintCost: string;
  };
  openForm: boolean;
  onClose: () => void;
  updateListKeyword: (data: SetMintPriceBody[]) => void;
}

export interface FormSellAndCancelKeywordProps {
  dataItem: {
    keywords: SystemKeywordDetail[];
    title: string;
    keyForm: "sell" | "cancel";
    label: string;
  };
  openForm: boolean;
  onClose: () => void;
  updateListKeyword: () => void;
}

export interface ParamsKeywordHistoryRequest {
  limit: number;
  page: number;
}

export interface KeywordCategory {
  id: number;
  name: string;
  hide: boolean;
}
