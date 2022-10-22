import { SystemKeywordDetail } from "pages/keywords/types";
import { OwnerDetail, StarDetail } from "pages/stars/types";

export interface ParamsReportRequest {
  from: string;
  to: string;
  orderBy?: string;
  orderDirection?: string;
}

export interface ReportDetail {
  date: string;
  updatedAt: string;
  id: number;
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionHash: string;
  from: string;
  contractAddress: string;
  to: string;
  price: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  type: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  confirmations: string;
  listingFee: number;
  donationFee: number;
  filter: string;
  seller?: OwnerDetail;
  buyer?: OwnerDetail;
  star?: StarDetail;
  keyword?: SystemKeywordDetail;
}

export interface ViewDetailReportProps {
  openPopup: boolean;
  onClose: () => void;
  dataItem: ReportDetail;
}

export interface TypographyItemCardProps {
  title: string;
  label: string;
  rootClass?: string;
  isLink?: boolean;
}

export const emptyReportDetail: ReportDetail = {
  date: "",
  updatedAt: "",
  id: 0,
  blockNumber: "",
  timeStamp: "",
  hash: "",
  nonce: "",
  blockHash: "",
  transactionHash: "",
  from: "",
  contractAddress: "",
  to: "",
  price: "",
  tokenName: "",
  tokenSymbol: "",
  tokenDecimal: "",
  transactionIndex: "",
  gas: "",
  type: "",
  gasPrice: "",
  gasUsed: "",
  cumulativeGasUsed: "",
  confirmations: "",
  listingFee: 0,
  donationFee: 0,
  filter: "",
};

export interface AddressCardProps {
  address: string;
  owner?: OwnerDetail;
  rootClass?: string;
}

export interface StarAndKeywordProps {
  star?: StarDetail;
  keyword?: SystemKeywordDetail;
}
