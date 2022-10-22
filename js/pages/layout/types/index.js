import { PATH } from "helpers/constant";
export const defaultEmptyAuthMe = {
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
export const listMenuPage = [
    {
        path: PATH.user,
        label: "User",
    },
    {
        path: PATH.singleGameHistory,
        label: "PVC Mode History",
    },
    {
        path: PATH.battleGameHistory,
        label: "PVP Mode History",
    },
    {
        path: PATH.transaction,
        label: "Transaction",
    },
];
export const listMenuSettings = [
    {
        path: PATH.dailyReport,
        label: "Daily Report",
    },
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
