export interface FeeDetail {
  donationBalance: number;
  donationFee: number;
  donationWaller: string;
  listingFee?: string;
}

export const emptyFeeDetail: FeeDetail = {
  donationBalance: 0,
  donationFee: 0,
  donationWaller: "",
  listingFee: "",
};
export const emptyFormEditFee = {
  star: false,
  keyword: false,
  market: false,
  listing: false,
};

export interface FeeCardProps {
  feeDetail: FeeDetail;
  updateFee: boolean;
  valueInputFee: number;
  valueInputListing?: string;
  updateFeeListing?: boolean;
  handleChangeInput: (
    key: "star" | "keyword" | "market" | "listing"
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenFormEditFee: (
    key: "star" | "keyword" | "market" | "listing",
    value: boolean
  ) => () => void;
  updateDonationFee: () => void;
  updateListingFee?: () => void;
  handleChangeInputListing?: (newValue: string | undefined) => void;
  minFee: number;
  maxFee: number;
}
