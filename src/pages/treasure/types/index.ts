import { Header } from "components/Table/types";
import { TreasureModel } from "../constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const DEFAULT_STATUS = "Im a lonely star looking for an owner";
export interface ParamsTreasureRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  name: string;
  tokens?: string[];
  types?: string[];
}

export interface OwnerDetail {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  keywordsOwned: number;
  startsOwned: number;
}

export interface TreasureInfo {
  alsoKnow: string;
  mag: string;
  distance: string;
  visibility: string;
  id: number;
  raDec?: string;
  azAlt?: string;
  modelData?: string;
}

export interface MarketDetail {
  buyerAddress: string;
  id: string;
  nftKeywordId: string;
  nftStarId: string;
  orderId: string;
  price: string;
  priceUsd: string;
  seller: {
    avatar: string;
    firstName: string;
    id: string;
    keywordsOwned: number;
    lastName: string;
    startsOwned: string;
  };
  sellerAddress: string;
  status: string;
  type: string;
  createdAt: string;
  endAuction: string;
}

export interface TreasureDetail {
  id?: string;
  name: string;
  description: string;
  imgUrl: string;
  total: number;
  tokenContract: string;
  type: string;
  starId: string;
  star?: any;
  isClaimed: boolean;
}

export const defaultEmptyTreasureDetail: TreasureDetail = {
  id: "",
  name: "",
  description: "",
  imgUrl: "",
  tokenContract: "",
  total: 0,
  type: '',
  starId: '',
  isClaimed: false,
}

export interface StatusTreasureCardProps {
  title: string;
  isUpdate: boolean;
}

export interface TitleStarTreasureProps {
  label: string;
  message: string;
  rootClassName?: string;
  isHtml?: boolean;
  rootClassMessage?: string;
}

export interface UpdateStatusStarProps {
  popupUpdateRef: any;
  oldStatus: string;
  newStatus: string;
  handleChangeStatus: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmitUpdateStatus: () => void;
  handleClosePopupUpdateStatus: () => void;
}

export interface NameRegisterCardProps {
  popupUpdateNameRegister: any;
  starDetail: TreasureDetail;
  dataItem: TreasureDetail;
  keyInputFile: string;
  fileSelectedHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface OwnerStarCardProps {
  owner?: OwnerDetail;
  market?: MarketDetail;
  purchasePrice: string;
  ownerBoughtAt: string;
  rootClass?: string;
}

export interface ImagePreviewCardProps {
  starDetail: TreasureDetail;
  fileSelectedHandlerImagePreview: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  keyInputFileImagePreview: string;
  dataItem: TreasureDetail;
  updateStarDetailWhenUpdateBIO: (dataRes: TreasureInfo) => void;
}

export interface OwnerDetailCardProps {
  owner?: OwnerDetail;
  market?: MarketDetail;
}

export interface FormUpdateBIOProps {
  openForm: boolean;
  onClose: () => void;
  modelData: string;
  idStar: string;
  updateStarDetailWhenUpdateBIO: (dataRes: TreasureInfo) => void;
}

export interface BioCardProps {
  modelData: string;
  idStar: string;
  updateStarDetailWhenUpdateBIO: (dataRes: TreasureInfo) => void;
  isUpdateBIO: boolean;
}

export interface FormChangeNameRegisterProps {
  rootClass?: string;
  idStar: string;
  oldNameRegister: string;
  updateStarDetailWhenUpdateNameRegister: (newNameRegister: string) => void;
}

export interface ParamsStarHistoryRequest {
  limit: number;
  page: number;
}

export interface SetMintPriceBody {
  id: string;
  price: number;
}

export interface SelectNewTreasure {
  openForm?: boolean;
  onClose: () => void;
  countItems?: number;
  headers: Header[];
  handleChangeChecked?: (
    key: "all" | "one",
    newChecked: boolean,
    index: number
  ) => () => void;
  handleChangeInputSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setStarId?: any;
  starName?: string;
  setStarName?: any;
  starId?: string;
  handleChange: (iTemp: string) => void;
}

export interface StarModelOption {
  label: string;
  value: TreasureModel;
}

export interface FormAddNewTreasureProps {
  openForm: boolean;
  onClose: () => void;
  onRefetch?: () => void;
  item: TreasureDetail | null;
  headers: Header[];
  dataItem: TreasureDetail;
  countItems: number;
  orderDirection?: string;
  dataResName: string;
  handleChangeInputSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  starId?: string;
  onRefresh?: any;
  data?: any[]
}

export type RequestPostNewTreasureProp = {
  name: string;
  description: string;
  starId: string;
  tokenContract: string;
  type: string;
  total: number;
  imgUrl: string;
};

export interface TreasureModelOption {
  label: string;
  value: TreasureModel;
}

export interface AddNewTreasureInput {
  name: string;
  description: string;
  tokenContract: string;
  type: string;
  total: number;
  starId: string;
  imgUrl: string | undefined;
}

export const defaultAddTreasureInput: AddNewTreasureInput = {
  name: "",
  description: "",
  tokenContract: "",
  starId: "",
  type: "",
  total: 0,
  imgUrl: "",
};

export interface AddStarProps {
  inputs: AddNewTreasureInput;
  handleChangeInput: (
    field: string,
    subField?: string,
    isSplit?: boolean
  ) => any;
  inputStyle: React.CSSProperties;
}

export interface TypeTreasureOption {
  label: string;
  value: TreasureModel;
}

export interface TableProps {
  limit: number;
  page: number;
  countItems: number;
  handleChangePage: (newPage: number) => void;
  headers: Header[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  orderBy?: string;
  orderDirection?: string;
  handleChangeSort?: (
    newOrderby: string,
    newOrderDirection: string
  ) => () => void;
  handleChangeChecked?: (
    key: "all" | "one",
    newChecked: boolean,
    index: number
  ) => () => void;
  checkedAdd?: boolean;
  isLoadingTable?: boolean;
  isLoadingPage?: boolean;
  hidePagination?: boolean;
  handleViewDetailTable?: (dataItem: any) => void;
  rowStyle?: React.CSSProperties;
  openForm?: boolean; //Use at Treasure Tag
  openChecked?: any;
}

export enum FiledFilterItem {
  TOKEN = "tokens",
  TYPES = "types",
}

export enum TOKEN_STATUS_FILTER {
  WBNB = "0xae13d989dac2f0debff460ac112a837c89baa7cd",
  BUSD = "0x98649fde88981790b574c9A6066004D5170Bf3EF",
  ETH = "0xd66c6b4f0be8ce5b39d52e0fd1344c389929b378",
}

export enum TYPES_STATUS_FILTER {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}
export interface CheckedFilter {
  name: string;
  filed: string;
}
export interface FilterItemDetail {
  title: string;
  filed: string;
  listChecked: CheckedFilter[];
}
export interface FilterTableProps {
  search: string;
  handleChangeInputSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
