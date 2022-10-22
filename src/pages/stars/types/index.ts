import { SystemKeywordDetail } from "pages/keywords/types";
import { StarModel } from "../constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const DEFAULT_STATUS = "Im a lonely star looking for an owner";
export interface ParamsStarRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search: string;
  market_status?: string[];
  types?: string[];
  owner_status?: string[];
}

export interface OwnerDetail {
  id: string;
  avatar: string;
  firstName: string;
  lastName: string;
  keywordsOwned: number;
  startsOwned: number;
}

export interface StarInfo {
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

export interface StarDetail {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  name: string;
  information: string;
  types: string[];
  model: string;
  location: string;
  nameRegister: string;
  imgUrl: string;
  imgUrlPreview: string;
  ownerAddress: string;
  ownerBoughtAt: string;
  txHashLast: string;
  purchasePrice: string;
  priceUsdLast: string;
  nftId: string;
  status: string;
  uri: string;
  spkId: number;
  owner?: OwnerDetail;
  info: StarInfo;
  market?: MarketDetail;
  keyword?: SystemKeywordDetail;
  checked?: boolean;
  uuidMint: string;
  mintPrice: number;
  isLocked?: boolean;
  isFamous?:boolean;
  isManualAdd?: boolean;
  names?: string[];
  freeMint?: number;
}

export const defaultEmptyStarDetail: StarDetail = {
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  id: "",
  name: "",
  information: "",
  types: [],
  model: "",
  location: "",
  nameRegister: "",
  imgUrl: "",
  imgUrlPreview: "",
  ownerAddress: "",
  ownerBoughtAt: "",
  txHashLast: "",
  purchasePrice: "",
  priceUsdLast: "",
  nftId: "",
  status: "",
  uri: "",
  spkId: 0,
  info: {
    alsoKnow: "",
    distance: "",
    mag: "",
    visibility: "",
    id: 0,
  },
  uuidMint: "",
  mintPrice: 0,
};

export interface ViewDetailStarProps {
  dataItem: StarDetail;
  handleUpdateSystemStarWhenOpenViewDetail: (
    dataRes: UpdateFieldStarWhenViewDetail
  ) => void;
  openViewDetail: boolean;
}

export interface StatusStarCardProps {
  title: string;
  isUpdate: boolean;
}

export interface TitleStarCardProps {
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
  starDetail: StarDetail;
  dataItem: StarDetail;
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

export interface MarketStarCardProps {
  dataItem: MarketDetail;
  nameLinked: string;
  title: string;
}

export interface ImagePreviewCardProps {
  starDetail: StarDetail;
  fileSelectedHandlerImagePreview: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  keyInputFileImagePreview: string;
  dataItem: StarDetail;
  updateStarDetailWhenUpdateBIO: (dataRes: StarInfo) => void;
}

export interface UpdateFieldStarWhenViewDetail {
  imgUrl: string;
  imgUrlPreview: string;
  status: string;
  nameRegister: string;
  id: string;
  purchasePrice: string;
  info: StarInfo;
}

export interface OwnerDetailCardProps {
  owner?: OwnerDetail;
  market?: MarketDetail;
}

export interface FormSetCostProps {
  dataItem: {
    stars: StarDetail[];
    defaultMintCost: string;
  };
  openForm: boolean;
  onClose: () => void;
  updateList: (data: SetMintPriceBody[]) => void;
}

export interface FormSetCostStarDetailProps {
  rootClass?: string;
  purchasePrice: string;
  id: string;
  updateStarDetailWhenSetCost: (newPurchasePrice: string) => void;
}

export interface FormUpdateBIOProps {
  openForm: boolean;
  onClose: () => void;
  modelData: string;
  idStar: string;
  updateStarDetailWhenUpdateBIO: (dataRes: StarInfo) => void;
}

export interface BioCardProps {
  modelData: string;
  idStar: string;
  updateStarDetailWhenUpdateBIO: (dataRes: StarInfo) => void;
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

export interface FormAddNewStarProps {
  openForm: boolean;
  onClose: () => void;
  onRefetch?: () => void;
  item: StarDetail | null;
}

export type RequestPostNewStarProp = {
  model: string;
  bio: string;
  names: string[];
  name: string;
  information: string;
};

export interface StarModelOption {
  label: string;
  value: StarModel;
}

interface AddPlanetInput {
  horizons_id: number;
  type: string;
  radius: number;
  color: string;
  vmag: number;
  parent: string;
  albedo: number;
  rot_obliquity: number;
  rot_period: number;
  rot_offset: number;
  rot_pole_de: number;
  rot_pole_ra: number;
  rings_inner_radius: number;
  rings_outer_radius: number;
  orbit: string;
  mass: number;
}

interface AddStarInput {
  ra: number;
  de: number;
  plx: number;
  pm_ra: number;
  pm_de: number;
  Vmag: number;
  epoch: number;
  Bmag: number;
}

interface AddAsteroidInput {
  H: number;
  G: number;
  Epoch: number;
  i: number;
  Node: number;
  Peri: number;
  a: number;
  n: number;
  e: number;
  M: number;
}

export interface AddNewStarInput {
  model: StarModel;
  name: string;
  names: string[];
  alsoKnow: string;
  distance: string;
  mag: string;
  visibility: string;
  raDec: string;
  azAlt: string;
  planet: Partial<AddPlanetInput>;
  star: Partial<AddStarInput>;
  asteroid: Partial<AddAsteroidInput>;
  bio: string;
}

export const defaultAddStarInput: AddNewStarInput = {
  model: StarModel.STAR,
  name: "",
  names: [],
  alsoKnow: "",
  distance: "",
  mag: "",
  visibility: "",
  raDec: "",
  azAlt: "",
  planet: {},
  star: {},
  asteroid: {},
  bio: "",
};

export interface AddStarProps {
  inputs: AddNewStarInput;
  handleChangeInput: (
    field: string,
    subField?: string,
    isSplit?: boolean
  ) => any;
  inputStyle: React.CSSProperties;
}
