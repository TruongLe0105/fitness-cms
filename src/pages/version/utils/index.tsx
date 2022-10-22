import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { VersionDetail } from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { BSC_SCAN_URL } from "config/environments";

export function dataHeaderUser(
  // handleOpenUpdateList: (
  //   key: "edit" | "delete" | "view-detail",
  //   value: NotificationDetail
  // ) => () => void
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: VersionDetail
  ) => () => void
): Header[] {
  const headers: Header[] = [
    {
      // title: "Name",
      // field: "name",
      title: "id",
      field: "id",
      styleHeader: {
        // minWidth: 200,
        // maxWidth: 200,
        minWidth: 100,
        maxWidth: 100,
      },
      styleBody: {
        minWidth: 100,
        maxWidth: 100,
      },
      sort: true,

      renderBody: (value: VersionDetail) => (
        <p
          // onClick={handleOpenUpdateList("view-detail", value)}
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
      title: "version",
      field: "version",
      styleHeader: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        // minWidth: 350,
        // maxWidth: 600,
        minWidth: 200,
        maxWidth: 400,
      },
      sort: true,
      renderBody: (value: VersionDetail) => (
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
          {value.version}
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
      renderBody: (value: VersionDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
    {
      title: "Updated At",
      field: "updatedAt",
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
      renderBody: (value: VersionDetail) => (
        <p>{value.updatedAt ? formatDate(value.updatedAt) : ""}</p>
      ),
    },
    // {
    //   title: "Action",
    //   field: "action",
    //   styleSort: {
    //     justifyContent: "flex-end",
    //   },
    //   styleHeader: {
    //     paddingLeft: 10,
    //     width: "100vh",
    //     minWidth: 100,
    //   },
    //   styleBody: {
    //     paddingLeft: 10,
    //     width: "100vh",
    //     minWidth: 100,
    //   },
    //   renderBody: (value: VersionDetail) => (
    //     <div className="flex items-center justify-end">
    //       <div className="ml-2">
    //         <DefaultButtonIcon
    //           disable={!value.id ? true : false}
    //           onClick={handleOpenUpdateList("edit", value)}
    //           field="edit"
    //           titleTooltip="Update"
    //           keyButtonIcon={Math.random().toString(36)}
    //         />
    //       </div>
    //       <div className="ml-2">
    //         <DefaultButtonIcon
    //           disable={!value.id ? true : false}
    //           onClick={handleOpenUpdateList("delete", value)}
    //           field="delete"
    //           titleTooltip="Destroy"
    //           keyButtonIcon={Math.random().toString(36)}
    //         />
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  return headers;
}
