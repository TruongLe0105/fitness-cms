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

export interface IInventoryDetail {
  point: number;
  pendingPoint: number;
  ticket: number;
  ticketMax: number;
  exp: number;
  level: number;
  maxExp: number;
  vsVictory: number;
  singleVictoryMax: number;
  vsVictoryMax: number;
  vip: number;

  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserDetail {
  id: string;
  email: string;
  login_type: string;
  wallet: string;
  name: string;
  created_at: number;
  total_coin: number;
  pending_coin: number;
  is_online: boolean;
  coin_earned_today: number;
  coin_earned_week: number;
  coin_earned_month: number;
}

export interface InventoryDetail {
  userName: string;
  walletAddress: string;
  sign: string;
  tokenCount: number;
  inventory: IInventoryDetail | null;

  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface CharacterDetail {
  id: number;
  image: string;
  type: number;
  krName: string;
  name: string;
  rarity: string;
  attack: number;
  amour: number;
  maxHp: number;
  dex: number;
  moveCount: number;
  moveTime: number;
  skill: string;
  numberOfUses: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserCharacterDetail {
  user: UserDetail | null;
  character: CharacterDetail | null;

  id: number;
  isSelect: boolean;
  isPlay: boolean;
  playNum: number;
  maxPlayNum: number;

  createdAt: string;
  updatedAt: string;
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

export const emptyUserCharacterDetail: UserCharacterDetail = {
  user: null,
  character: null,

  id: 0,
  isSelect: false,
  isPlay: false,
  playNum: 0,
  maxPlayNum: 0,

  createdAt: "",
  updatedAt: "",
};

export const emptyInventoryDetail: InventoryDetail = {
  userName: "",
  walletAddress: "",
  sign: "",
  tokenCount: 0,
  inventory: null,

  createdAt: "",
  updatedAt: "",
  id: 0,
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
