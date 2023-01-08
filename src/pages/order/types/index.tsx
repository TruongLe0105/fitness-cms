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
  status?: string;
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
export interface OrderDetail {
  id: string;
  client: string;
  package: string;
  gym: any;
  price: number;
  status: string;
  createdAt: number;
  updatedAt: number;
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
  label?: string;
  rootClass?: string;
}

export interface AddOrderInput {
  OrderName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface FormInputOrder {
  openFormChange?: boolean;
  onClose: () => void;
  client?: AddOrderInput;
  onRefetch: () => void;
}

export interface FormUpdate {
  openFormChange?: boolean;
  onClose: () => void;
  item?: OrderDetail;
  onRefetch: () => void;
}
