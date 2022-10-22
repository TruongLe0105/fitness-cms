/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ParamsRequest {
  limit: number;
  page: number;
  orderBy?: string;
  orderDirection?: string;
  status: string;
  search: string;
}

export interface EventDetail {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  description: string;
  url: string;
  target: string;
  startDate: string;
  endDate: string;
  send: boolean;
}

export const emptyEventDetail: EventDetail = {
  createdAt: "",
  updatedAt: "",
  id: 0,
  name: "",
  description: "",
  url: "",
  startDate: "",
  endDate: "",
  send: false,
  target: "",
};

export interface FormDialogProps {
  openPopup: boolean;
  onClose: () => void;
  handleUpdateListEvent: (dataRes?: EventDetail) => void;
  dataItem: EventDetail;
}

export interface FormRequest {
  name: string;
  description: string;
  image: string;
  target: string;
  startDate: string;
  endDate: string;
}
export interface ImageEventCardProps {
  fileInput: any;
  fileSelectedImageURL: (event: React.ChangeEvent<HTMLInputElement>) => void;
  keyInputFile: string;
  handleRemoveFileInput: (event) => void;
  originImage: string;
}

export interface ViewDetailEventProps {
  openPopup: boolean;
  onClose: () => void;
  dataItem: EventDetail;
}

export interface TypographyItemCardProps {
  title: string;
  label: string;
  rootClass?: string;
}

export interface SelectEventStatusProp {
  value: string;
  label: string;
}

export const ListEventStatusSelect: SelectEventStatusProp[] = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "Scheduled",
    label: "Scheduled",
  },
  {
    value: "Activating",
    label: "Activating",
  },
  {
    value: "Ended",
    label: "Ended",
  },
];
