export interface ParamsRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  search?: string;
  sort?: string;
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
  userName: string;
  walletAddress: string;
  sign: string;
  tokenCount: number;
  inventory: number;

  createdAt: string;
  updatedAt: string;
  id: number;
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

export interface RewardHistoryDetail {
  user: UserDetail | null;

  beforePoint: number;
  rewardPoint: number;
  totalPoint: number;
  mode: string;

  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface VsGameHistoryDetail {
  id: string;
  type: string;
  bet: number;
  details: any;
  value: number;
  status: string;
  confirm_count: number;
  jackpot: boolean;
  pvc_winning_streak: number;
  jackpot_coin: number;
  created_at: number;
  updated_at: number;
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

export const emptyVsGameHistoryDetail: VsGameHistoryDetail = {
  id: "",
  type: "string",
  bet: 0,
  details: [],
  value: 0,
  status: "string",
  confirm_count: 0,
  jackpot: false,
  pvc_winning_streak: 0,
  jackpot_coin: 0,
  created_at: 0,
  updated_at: 0,
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
