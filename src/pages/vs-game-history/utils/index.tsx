import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { VsGameHistoryDetail } from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { BSC_SCAN_URL } from "config/environments";

export function dataHeaderUser(
  // handleOpenUpdateList: (
  //   key: "edit" | "delete" | "view-detail",
  //   value: NotificationDetail
  // ) => () => void
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: VsGameHistoryDetail
  ) => () => void
): Header[] {
  const headers: Header[] = [
    {
      // title: "Name",
      // field: "name",
      title: "id",
      field: "id",
      styleHeader: {
        textTransform: "capitalize",
        // minWidth: 200,
        // maxWidth: 200,
        minWidth: 300,
      },
      styleBody: {
        minWidth: 300,
      },
      // sort: true,

      renderBody: (value: VsGameHistoryDetail) => (
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
      title: "Player 1 email",
      field: "details[0].player_email",
      styleHeader: {
        textTransform: "capitalize",
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      // sort: true,

      renderBody: (value: VsGameHistoryDetail) => (
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
            {value.details[0].player_email}
          </p>
        </div>
      ),
    },
    {
      // title: "Name",
      // field: "name",
      title: "Player 2 email",
      field: "details[1].player_email",
      styleHeader: {
        textTransform: "capitalize",
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      // sort: true,

      renderBody: (value: VsGameHistoryDetail) => (
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
            {value.details[1].player_email}
          </p>
        </div>
      ),
    },
    {
      title: "Bet",
      field: "bet",
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
      renderBody: (value: VsGameHistoryDetail) => (
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
          {value.bet}
        </p>
      ),
    },
    {
      title: "Player 1 Final Result",
      field: "details[0].final_result",
      styleHeader: {
        textTransform: "capitalize",
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
      renderBody: (value: VsGameHistoryDetail) => (
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
          {value.details[0].final_result}
        </p>
      ),
    },
    {
      title: "Player 2 Final Result",
      field: "details[1].final_result",
      styleHeader: {
        textTransform: "capitalize",
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
      renderBody: (value: VsGameHistoryDetail) => (
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
          {value.details[1].final_result}
        </p>
      ),
    },
    {
      title: "Created At",
      field: "created_at",
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
      renderBody: (value: VsGameHistoryDetail) => (
        <p>{value.created_at ? formatDate(value.created_at) : ""}</p>
      ),
    },
    {
      title: "Updated At",
      field: "updated_at",
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
      renderBody: (value: VsGameHistoryDetail) => (
        <p>{value.updated_at ? formatDate(value.updated_at) : ""}</p>
      ),
    },
  ];

  return headers;
}
