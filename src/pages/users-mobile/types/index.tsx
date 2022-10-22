export interface ParamsRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search: string;
}
enum USER_GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

interface UserProfile {
  gender?: USER_GENDER;
  dob?: string;
  phone?: string;
  contactEmail?: string;
  bio?: string;
}

export interface UserMobileDetail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  status: string;
  keywordsOwned: number;
  startsOwned: number;
  createdAt: string;
  isSubscription: boolean;
  loginType: string;
  address: string[];
  totalClaimable: number;
  totalClaimed: number;
  userInfo?: UserProfile;
}
export const defaultEmptyUserMobileDetail: UserMobileDetail = {
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  avatar: "",
  status: "",
  keywordsOwned: 0,
  startsOwned: 0,
  createdAt: "",
  isSubscription: false,
  loginType: "",
  address: [],
  totalClaimable: 0,
  totalClaimed: 0,
};

export enum STATUS_USER_MOBILE {
  ACTIVE = "Active",
  IN_ACTIVE = "In-Active",
}

export interface ViewDetailUserMobileProps {
  formOpenViewDetail: {
    id: string;
    email: string;
  };
  openPopup: boolean;
  handleClosePopup: () => void;
}
