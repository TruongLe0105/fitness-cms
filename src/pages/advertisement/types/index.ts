import { Header } from "components/Table/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ParamsAdvertisementRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
}

export interface AdvertisementDetail {
  link: any;
  id: string;
  createdAt: string;
  name: string;
}

export const defaultEmptyAdvertisementDetail: AdvertisementDetail = {
  link: null,
  id: "",
  createdAt: "",
  name: "",
};
export interface FormAddNewAdvertisementProps {
  openForm: boolean;
  onClose: () => void;
  onRefetch?: () => void;
  item: AdvertisementDetail | null;
  headers: Header[];
  countItems: number;
  orderDirection?: string;
}

export type RequestPostNewAdvertisementProp = {
  link: any;
  id: string;
  createdAt: string;
  name: string;
};

export interface AddNewAdvertisementInput {
  link: any;
  id: string;
  createdAt: string;
  name: string;
}

export const defaultAddAdvertisementInput: AddNewAdvertisementInput = {
  link: null,
  id: "",
  createdAt: "",
  name: "",
};

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
  openChecked?: any;
}
