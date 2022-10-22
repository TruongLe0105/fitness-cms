export interface ManageVersion {
  id?: number;
  version: string;
  description?: string;
  publishedDate: Date;
  androidLink: string;
  iosLink: string;
}

export interface FormDialogProps {
  openPopup: boolean;
  onClose: () => void;
  item: ManageVersion | null;
  onRefetch?: () => void;
}

export interface FormInput {
  version: string;
  publishedDate: Date;
  description?: string;
  androidLink: string;
  iosLink: string;
}
