import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import {
  SubjectDetail,
  NotificationDetail,
  STATUS_NOTIFICATION,
} from "../types";

export function dataHeaderUser(
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: SubjectDetail
  ) => () => void,
  onEdit,
  onDelete
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

      renderBody: (value: SubjectDetail) => (
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
      title: "Name",
      field: "name",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: SubjectDetail) => (
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
          {value.name}
        </p>
      ),
    },
    {
      title: "Icon",
      field: "icon",
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
      renderBody: (value: SubjectDetail) => (
        <img src={value.logo} alt="logo" style={{ width: "1.5rem" }} />
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
      renderBody: (value: SubjectDetail) => (
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
      renderBody: (value: SubjectDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
    {
      title: "Action",
      field: "action",
      styleSort: {
        justifyContent: "flex-end",
      },
      styleHeader: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 160,
      },
      styleBody: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 160,
      },
      renderBody: (value: SubjectDetail) => (
        <div className="flex items-center justify-end">
          <div style={{ margin: "0 5px" }}>
            <DefaultButtonIcon
              disable={false}
              onClick={() => onEdit(value)}
              field="edit"
              titleTooltip="Update"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>

          <DefaultButtonIcon
            onClick={() => onDelete(value)}
            disable={false}
            field="delete"
            titleTooltip="Destroy"
            keyButtonIcon={Math.random().toString(36)}
          />
        </div>
      ),
    },
  ];

  return headers;
}
