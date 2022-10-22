import { OwnerDetail } from "pages/stars/types";

export interface HistoryDefaultDetail {
  purchasePrice: string;
  ownerBoughtAt: string;
  owner: OwnerDetail;
  txHash: string;
}
export interface HistoryDefaultCardProps {
  dataItem: HistoryDefaultDetail[];
  headerTable?: string[];
  isLoading?: boolean;
}
