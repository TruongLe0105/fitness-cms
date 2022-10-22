import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { NotificationDetail, STATUS_NOTIFICATION, UserDetail } from "../types";
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
    value: UserDetail
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

      renderBody: (value: UserDetail) => (
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
      // title: "Name",
      // field: "name",
      title: "walletAddress",
      field: "walletAddress",
      styleHeader: {
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      sort: true,

      renderBody: (value: UserDetail) => (
        <div>
          <p
            // href= {`${BSC_SCAN_URL}/address/` + value.walletAddress}
            // target={"_blank"}
            // onClick={handleOpenUpdateList("view-detail", value)}
            // onClick=
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              WebkitLineClamp: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              zIndex: 1000000,
            }}
            className="text-primary-custom whitespace-pre-line cursor-pointer"
          >
            <a href={`${BSC_SCAN_URL}/address/` + value.walletAddress}>
              {value.walletAddress && value.walletAddress.slice(0, 10)} ...{" "}
              {value.walletAddress &&
                value.walletAddress.slice(
                  value.walletAddress.length - 10,
                  value.walletAddress.length
                )}
            </a>
            {/* {value.walletAddress.slice(0, 10)} ...{" "}
            {value.walletAddress.slice(
              value.walletAddress.length - 10,
              value.walletAddress.length
            )} */}
          </p>
        </div>
      ),
    },
    {
      // title: "Description",
      // field: "description",
      title: "userName",
      field: "userName",
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
      renderBody: (value: UserDetail) => (
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
          {value.userName}
        </p>
      ),
    },
    {
      // title: "Type",
      // field: "type",
      title: "tokenCount",
      field: "tokenCount",
      styleHeader: {
        // width: 90,
        // minWidth: 90,
        // maxWidth: 90,
        // paddingLeft: 10,
        // paddingRight: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
      },
      styleBody: {
        // width: 90,
        // minWidth: 90,
        // maxWidth: 90,
        // paddingLeft: 10,
        // paddingRight: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
      },
      sort: true,
      renderBody: (value: UserDetail) => (
        <p className="uppercase">{value.tokenCount}</p>
      ),
    },

    // {
    //   // title: "Schedule-Timeline",
    //   // field: "startDate",
    //    title: "updatedAt",
    //   field: "updatedAt",
    //   styleHeader: {
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     width: 200,
    //     minWidth: 200,
    //     maxWidth: 200,
    //   },
    //   styleBody: {
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     width: 200,
    //     minWidth: 200,
    //     maxWidth: 200,
    //   },
    //   sort: true,
    //   renderBody: (value: NotificationDetail) => (
    //     <p>
    //       {value.startDate
    //         ? formatDate(value.startDate, "dd MMM yyyy, HH:mm:ss a")
    //         : ""}
    //     </p>
    //   ),
    // },
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
      renderBody: (value: UserDetail) => (
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
      renderBody: (value: UserDetail) => (
        <p>{value.updatedAt ? formatDate(value.updatedAt) : ""}</p>
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
      renderBody: (value: UserDetail) => (
        <div className="flex items-center justify-end">
          <div className="ml-2">
            <DefaultButtonIcon
              disable={!value.id ? true : false}
              onClick={handleOpenUpdateList("edit", value)}
              field="edit"
              titleTooltip="Update"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
          <div className="ml-2">
            <DefaultButtonIcon
              disable={!value.id ? true : false}
              onClick={handleOpenUpdateList("delete", value)}
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
