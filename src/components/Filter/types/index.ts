import { PLACEHOLDER_INPUT } from "components/Input/types";

export interface QueryFilterProps {
  owner_status?: string[];
  market_status?: string[];
  types?: string[];
  link_with_star?: string[];
  tokens?: string[]; //treasure page
}
export interface FilterTableProps {
  queryFilter?: QueryFilterProps;
  search: string;
  listFilter?: FilterItemDetail[];
  handleChangeInputSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeChecked?: (
    filedTitle: string,
    filedChecked: string
  ) => () => void;

  // placeholder?: PLACEHOLDER_INPUT
  placeholder?: string;
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

export interface FilterItemProps {
  dataItem: FilterItemDetail;
  queryFilter?: QueryFilterProps;
  handleChangeChecked?: (
    filedTitle: string,
    filedChecked: string
  ) => () => void;
}

export interface ShowFilterItemCardProps {
  field: string;
  dataItem: string[];
  handleRemoveFilter: (filedTitle: string) => () => void;
}

export interface ShowFilterCardProps {
  dataFilter: {
    field: string;
    dataItem: string[];
  }[];
  handleRemoveFilter: (filedTitle: string) => () => void;
}

export enum FiledFilterItem {
  OWNER = "owner_status",
  MARKET = "market_status",
  TYPES = "types",
  LINK_WITH_STAR = "link_with_star",
  CATEGORY = "category",
}

export enum OWNER_STATUS_FILTER {
  OWNED = "owned",
  NO_OWNED = "no_owner",
}

export enum MARKET_STATUS_FILTER {
  SELLING = "selling",
  IS_NOT_SELLING = "not_selling",
}

export enum TYPES_STATUS_FILTER {
  ASTEROID = "mpc_asteroid",
  PLAN = "plan",
  STAR = "star",
  REGISTER = "register",
  MINT = "mint",
}

export enum LINK_WITH_STAR_FILTER {
  LINKED = "linked",
  UNLINKED = "unlinked",
}
