import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import {
  NotificationDetail,
  STATUS_NOTIFICATION,
  UserCharacterDetail,
  ClientDetail,
  UserDetail,
} from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import StatusCard from "components/Status/StatusCard";
import { BSC_SCAN_URL } from "config/environments";
import { FilterItemDetail, ItemFilter, ORDER_STATUS_ITEM, OWNER_STATUS_ITEM, OWNER_STATUS_ITEM_FITNESS } from "components/Filter/types";

export function dataHeaderUser(
  // handleOpenUpdateList: (
  //   key: "edit" | "delete" | "view-detail",
  //   value: NotificationDetail
  // ) => () => void
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: ClientDetail
  ) => () => void,
  onEdit: (value: UserDetail) => void,
  onDelete: (value: UserDetail) => void
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
          {value.rawName}
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
      renderBody: (value: UserDetail) => (
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

export const filterClient: FilterItemDetail[] = [
  {
    title: 'Client Status',
    filed: ItemFilter.CLIENT,
    listChecked: [
      {
        name: 'Active',
        filed: OWNER_STATUS_ITEM.ACTIVE,
      },
      {
        name: 'No Active',
        filed: OWNER_STATUS_ITEM.IN_ACTIVE,
      },
      {
        name: 'Disabled',
        filed: OWNER_STATUS_ITEM.DISABLE,
      },
    ],
  },
];

export const filterGyms: FilterItemDetail[] = [
  {
    title: 'Gyms Status',
    filed: ItemFilter.GYMS,
    listChecked: [
      {
        name: 'Active',
        filed: OWNER_STATUS_ITEM_FITNESS.ACTIVE,
      },
      {
        name: 'Disabled',
        filed: OWNER_STATUS_ITEM_FITNESS.DISABLE,
      },
    ],
  },
];

export const filterPackage: FilterItemDetail[] = [
  {
    title: 'Package Status',
    filed: ItemFilter.PACKAGE,
    listChecked: [
      {
        name: 'Active',
        filed: OWNER_STATUS_ITEM_FITNESS.ACTIVE,
      },
      {
        name: 'Disabled',
        filed: OWNER_STATUS_ITEM_FITNESS.DISABLE,
      },
    ],
  },
];