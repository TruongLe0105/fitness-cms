import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import {
  NotificationDetail,
  STATUS_NOTIFICATION,
  UserCharacterDetail,
  UserDetail,
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
    value: UserCharacterDetail
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
      // sort: true,

      renderBody: (value: UserCharacterDetail) => (
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
      // sort: true,

      renderBody: (value: UserCharacterDetail) => (
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
            <a href={`${BSC_SCAN_URL}/address/` + value.user?.walletAddress}>
              {value.user?.walletAddress.slice(0, 10)} ...{" "}
              {value.user?.walletAddress.slice(
                value.user?.walletAddress.length - 10,
                value.user?.walletAddress.length
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
      title: "characterName",
      field: "characterName",
      styleHeader: {
        minWidth: 350,
        // maxWidth: 600,
        // minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 350,
        // maxWidth: 600,
        // minWidth: 200,
        maxWidth: 400,
      },
      // sort: true,
      renderBody: (value: UserCharacterDetail) => (
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
          {value.character?.name}
        </p>
      ),
    },
    {
      // title: "Type",
      // field: "type",
      title: "image",
      field: "image",
      styleHeader: {
        // width: 90,
        // minWidth: 90,
        // maxWidth: 90,
        // paddingLeft: 10,
        // paddingRight: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        paddingLeft: 30,
        paddingRight: 30,
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
      // sort: true,
      renderBody: (value: UserCharacterDetail) => (
        // <p className="uppercase">{value.character?.image}</p>
        <img className="uppercase" src={value.character?.image}></img>
      ),
    },
    {
      title: "isSelect",
      field: "isSelect",
      styleHeader: {
        // maxWidth: 600,
        // minWidth: 200,
        minWidth: 100,
        maxWidth: 200,
      },
      styleBody: {
        // maxWidth: 600,
        // minWidth: 200,
        minWidth: 100,
        maxWidth: 200,
      },
      // sort: true,
      renderBody: (value: UserCharacterDetail) => (
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
          {value.isSelect}
        </p>
      ),
    },

    {
      title: "isPlay",
      field: "isPlay",
      styleHeader: {
        // maxWidth: 600,
        // minWidth: 200,
        minWidth: 100,
        maxWidth: 200,
      },
      styleBody: {
        minWidth: 150,
        maxWidth: 200,
      },
      // sort: true,
      renderBody: (value: UserCharacterDetail) => (
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
          {value.isPlay}
        </p>
      ),
    },

    {
      title: "playNum",
      field: "playNum",
      styleHeader: {
        // maxWidth: 600,
        // minWidth: 200,
        minWidth: 100,
        maxWidth: 200,
      },
      styleBody: {
        minWidth: 100,
        maxWidth: 200,
      },
      // sort: true,
      renderBody: (value: UserCharacterDetail) => (
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
          {value.playNum}
        </p>
      ),
    },


   

    {
      title: "Created At",
      field: "createdAt",
      styleHeader: {
        // paddingRight: 10,
        // paddingLeft: 10,
        // width: 160,
        // minWidth: 160,
        // maxWidth: 160,
        paddingRight: 20,
        paddingLeft: 20,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      styleBody: {
        // paddingRight: 10,
        // paddingLeft: 10,
        // width: 160,
        // minWidth: 160,
        // maxWidth: 160,
        paddingRight: 20,
        paddingLeft: 20,
        width: 160,
        minWidth: 160,
        maxWidth: 160,
      },
      sort: true,
      renderBody: (value: UserCharacterDetail) => (
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
      renderBody: (value: UserCharacterDetail) => (
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
    //   renderBody: (value: UserCharacterDetail) => (
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
