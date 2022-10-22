/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface PaginatedItemsProps {
  page: number;
  limit: number;
  countItems: number;
  handleChangePage: (newPage: number) => void;
}
export interface Header {
  title: string;
  field: string;
  sort?: boolean;
  styleHeader?: React.CSSProperties;
  styleBody?: React.CSSProperties;
  styleSort?: React.CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderBody?: (value: any, index?: number) => React.ReactNode;
  renderHeader?: React.ReactNode;
  isCheckbox?: boolean;
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
  hidePagination?: boolean;
  handleViewDetailTable?: (dataItem: any) => void;
  rowStyle?: React.CSSProperties;
}
