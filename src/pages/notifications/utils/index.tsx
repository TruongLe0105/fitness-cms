import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { NotificationDetail, STATUS_NOTIFICATION } from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import StatusCard from "components/Status/StatusCard";

export function dataHeaderNotification(
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: NotificationDetail
  ) => () => void
): Header[] {
  const headers: Header[] = [
    {
      title: "Name",
      field: "name",
      styleHeader: {
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 200,
      },
      sort: true,

      renderBody: (value: NotificationDetail) => (
        <p
          onClick={handleOpenUpdateList("view-detail", value)}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 1,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
          }}
          className="text-primary-custom whitespace-pre-line cursor-pointer"
        >
          {value.name}
        </p>
      ),
    },
    {
      title: "Description",
      field: "description",
      styleHeader: {
        minWidth: 350,
        maxWidth: 600,
      },
      styleBody: {
        minWidth: 350,
        maxWidth: 600,
      },
      sort: true,
      renderBody: (value: NotificationDetail) => (
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
          {value.description}
        </p>
      ),
    },
    {
      title: "Type",
      field: "type",
      styleHeader: {
        width: 90,
        minWidth: 90,
        maxWidth: 90,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        width: 90,
        minWidth: 90,
        maxWidth: 90,
        paddingLeft: 10,
        paddingRight: 10,
      },
      sort: true,
      renderBody: (value: NotificationDetail) => (
        <p className="uppercase">{value.type}</p>
      ),
    },
    {
      title: "Status",
      field: "send",

      styleHeader: {
        minWidth: 100,
        maxWidth: 100,
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        minWidth: 100,
        maxWidth: 100,
        width: 100,
        paddingLeft: 10,
        paddingRight: 10,
      },
      sort: true,
      renderBody: (value: NotificationDetail) => (
        <StatusCard
          status={
            value.send ? STATUS_NOTIFICATION.SENT : STATUS_NOTIFICATION.UNSENT
          }
          active={STATUS_NOTIFICATION.SENT}
        />
      ),
    },
    {
      title: "Schedule-Timeline",
      field: "startDate",
      styleHeader: {
        paddingLeft: 10,
        paddingRight: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        paddingLeft: 10,
        paddingRight: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      sort: true,
      renderBody: (value: NotificationDetail) => (
        <p>
          {value.startDate
            ? formatDate(value.startDate, "dd MMM yyyy, HH:mm:ss a")
            : ""}
        </p>
      ),
    },
    {
      title: "Created At",
      field: "createdAt",
      styleHeader: {
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
      renderBody: (value: NotificationDetail) => (
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
        minWidth: 100,
      },
      styleBody: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 100,
      },
      renderBody: (value: NotificationDetail) => (
        <div className="flex items-center justify-end">
          <div className="ml-2">
            <DefaultButtonIcon
              disable={value.send ? true : false}
              onClick={handleOpenUpdateList("edit", value)}
              field="edit"
              titleTooltip="Update"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
          <div className="ml-2">
            <DefaultButtonIcon
              onClick={handleOpenUpdateList("delete", value)}
              disable={value.send ? true : false}
              field="delete"
              titleTooltip="Destroy"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
        </div>
      ),
    },
  ];

  return headers;
}
