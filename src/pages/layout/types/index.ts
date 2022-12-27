import { PATH } from "helpers/constant";
import { ReactNode } from "react";

export interface PageLayoutProps {
  children: React.ReactNode;
  childrenAction?: React.ReactNode;
  title: string | ReactNode;
}

export interface MenuItemDetail {
  path: string;
  label: string;
}

export interface MenuItemCardProps {
  menu: MenuItemDetail;
  openMenu: boolean;
}
export interface HeaderProps {
  title: string | ReactNode;
}

export interface AuthMeDetail {
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  status: string;
}

export const defaultEmptyAuthMe: AuthMeDetail = {
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  id: "",
  email: "",
  firstName: "",
  lastName: "",
  avatar: "",
  status: "",
};

export interface MenuLayoutProps {
  handleChangeMenu: () => void;
  openMenu: boolean;
}

export const listMenuPage: MenuItemDetail[] = [
  {
    path: PATH.user,
    label: "User",
  },
  {
    path: PATH.gym,
    label: "Gym",
  },
  {
    path: PATH.merchant,
    label: "Merchant",
  },
  {
    path: PATH.package,
    label: "Package",
  },
  {
    path: PATH.subject,
    label: "Subject",
  },
  {
    path: PATH.convenience,
    label: "Convenience",
  },
  {
    path: PATH.editor,
    label: "Editor",
  },
];
export const listMenuSettings: MenuItemDetail[] = [
  // {
  //   path: PATH.dailyReport,
  //   label: "Daily Report",
  // },
  // {
  //   path: PATH.legalPage,
  //   label: "Legal Page",
  // },
  // {
  //   path: PATH.manageVersions,
  //   label: "Manage Versions",
  // },
  // {
  //   path: PATH.settings,
  //   label: "Settings",
  // },
  // {
  //   path: PATH.download,
  //   label: "Download",
  // },
  // {
  //   path: PATH.version,
  //   label: "Version",
  // },
];
