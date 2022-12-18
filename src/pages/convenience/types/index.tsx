export interface ParamsRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  sort?: string;
  search?: string;
  point_level?: number;
  types?: string[];
  isSent?: boolean;
  pointLevel?: string;
}

export enum TYPE_NOTIFICATION {
  ALL = "all",
  IOS = "ios",
  ANDROID = "android",
}
export interface NotificationDetail {
  createdAt: string;
  updatedAt: string;
  id: number;
  type: TYPE_NOTIFICATION;
  name: string;
  url: string;
  description: string;
  send: boolean;
  startDate: string;
}

export const emptyNotificationDetail: NotificationDetail = {
  createdAt: "",
  updatedAt: "",
  id: 0,
  type: TYPE_NOTIFICATION.ALL,
  name: "",
  url: "",
  description: "",
  send: false,
  startDate: "",
};

export const emptyUserDetail = {
  id: "",
  email: "",
  login_type: "",
  wallet: "",
  name: "",
  created_at: 0,
  total_coin: 0,
  pending_coin: 0,
  is_online: false,
  coin_earned_today: 0,
  coin_earned_week: 0,
  coin_earned_month: 0,
};

export enum STATUS_NOTIFICATION {
  ALL = "",
  SENT = "Sent",
  UNSENT = "Unsent",
}

export enum POINT_LEVEL {
  ALL = "",
  POINT_OVER_50000 = ">=50000",
  POINT_LOWER_50000 = "<50000",
  // POINT_10000_TO_50000 = "10000-50000",
}

export interface FormDialogProps {
  openPopup: boolean;
  onClose: () => void;
  handleUpdateListNotification: (dataRes?: NotificationDetail) => void;
  dataItem: NotificationDetail;
}

export interface SelectToSendDetail {
  value: TYPE_NOTIFICATION;
  label: string;
}
export interface SentSelectDetail {
  value: string;
  label: string;
}

export interface PointSelectDetail {
  value: string;
  label: string;
}

export const ListOptionToSendSelect: SelectToSendDetail[] = [
  {
    value: TYPE_NOTIFICATION.ALL,
    label: "All",
  },
  {
    value: TYPE_NOTIFICATION.ANDROID,
    label: "Android",
  },
  {
    value: TYPE_NOTIFICATION.IOS,
    label: "IOS",
  },
];

export const ListPointSelect: PointSelectDetail[] = [
  {
    value: POINT_LEVEL.ALL,
    label: "All",
  },
  {
    value: POINT_LEVEL.POINT_OVER_50000,
    label: POINT_LEVEL.POINT_OVER_50000,
  },
  {
    value: POINT_LEVEL.POINT_LOWER_50000,
    label: POINT_LEVEL.POINT_LOWER_50000,
  },
];

export const ListSentSelect: SentSelectDetail[] = [
  {
    value: STATUS_NOTIFICATION.ALL,
    label: "All",
  },
  {
    value: "true",
    label: "Sent",
  },
  {
    value: "false",
    label: "Unsent",
  },
];

export interface FormRequest {
  type: TYPE_NOTIFICATION;
  description: string;
  name: string;
  sentAt?: string;
}

export interface ViewDetailNotificationProps {
  openPopup: boolean;
  onClose: () => void;
  dataItem: NotificationDetail;
}

export interface TypographyItemCardProps {
  title: string;
  label: string;
  rootClass?: string;
}

export interface ConvenienceDetail {
  id: string;
  name: string;
  type: string;
  logo: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  url: string;
}

export interface InputConvenience {
  name: string;
  type: string;
  logo: string;
}

export interface InputUpdateConvenience {
  name: string;
  type: string;
  logo: string;
  id: string;
  status: string;
}

export interface FormAddConvenience {
  openFormChange?: boolean;
  onClose: () => void;
  convenience?: InputConvenience;
  onRefetch: () => void;
}

export interface UpdateConvenience {
  openFormChange?: boolean;
  onClose: () => void;
  convenience?: InputConvenience;
  onRefetch: () => void;
  item: ConvenienceDetail;
}

export interface ImageEventCardProps {
  fileInput: any;
  fileSelectedImageURL: (event: React.ChangeEvent<HTMLInputElement>) => void;
  keyInputFile: string;
  handleRemoveFileInput: (event) => void;
  originImage: string;
}

export const emptyConvenienceDetail: ConvenienceDetail = {
  id: "",
  name: "",
  type: "",
  logo: "",
  status: "",
  createdAt: 0,
  updatedAt: 0,
  url: ""
};

export interface TypeModelOption {
  label: string;
  value: string;
}
