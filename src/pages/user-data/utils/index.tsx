import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import {
  NotificationDetail,
  STATUS_NOTIFICATION,
  UserCharacterDetail,
  ClientDetail,
} from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import StatusCard from "components/Status/StatusCard";
import { BSC_SCAN_URL } from "config/environments";

export function dataHeaderUser(
  // handleOpenUpdateList: (
  //   key: "edit" | "delete" | "view-detail",
  //   value: NotificationDetail
  // ) => () => void
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: ClientDetail
  ) => () => void
): Header[] {
  const headers: Header[] = [
    {
      title: "ID",
      field: "id",
      styleHeader: {
        minWidth: 300,
      },
      styleBody: {
        minWidth: 300,
      },

      renderBody: (value: ClientDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="text-primary-custom whitespace-pre-line cursor-pointer"
        >
          {value.id}
        </p>
      ),
    },
    {
      title: "Email",
      field: "email",
      styleHeader: {
        textTransform: "capitalize",
        paddingRight: 10,
        paddingLeft: 10,
        width: 300,
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 300,
        minWidth: 300,
        maxWidth: 300,
      },
      sort: true,

      renderBody: (value: ClientDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.email}
        </p>
      ),
    },
    {
      title: "Client Name",
      field: "clientName",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: ClientDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.clientName}
        </p>
      ),
    },

    {
      title: "Phone",
      field: "phone",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: ClientDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.phone}
        </p>
      ),
    },
    {
      title: "Status",
      field: "status",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: ClientDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 3,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="whitespace-pre-line"
        >
          {value.status.toUpperCase()}
        </p>
      ),
    },

    {
      title: "Created At",
      field: "createdAt",
      styleHeader: {
        textTransform: "capitalize",
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      sort: true,
      renderBody: (value: ClientDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
  ];

  return headers;
}
