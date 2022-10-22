export interface ParamsRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search: string;
  types?: string[];
  isSent?: boolean;
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

export interface UserDetail {
  createdAt: string;
  updatedAt: string;
  id: number;
  // type: TYPE_NOTIFICATION;
  // name: string;
  // url: string;
  // description: string;
  // send: boolean;
  // startDate: string;
  userName: string;
  walletAddress: string;
  sign: string;
  tokenCount: number;
  inventory: number;
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

export const emptyUserDetail: UserDetail = {
  createdAt: "",
  updatedAt: "",
  id: 0,
  // type: TYPE_NOTIFICATION.ALL,
  // name: "",
  // url: "",
  // description: "",
  // send: false,
  // startDate: "",
  userName: "",
  walletAddress: "",
  sign: "",
  tokenCount: 0,
  inventory: 0,
};

export enum STATUS_NOTIFICATION {
  ALL = "",
  SENT = "Sent",
  UNSENT = "Unsent",
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
