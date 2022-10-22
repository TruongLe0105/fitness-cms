import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { SingleGameHistoryDetail } from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { BSC_SCAN_URL } from "config/environments";

export function dataHeaderUser(
  // handleOpenUpdateList: (
  //   key: "edit" | "delete" | "view-detail",
  //   value: NotificationDetail
  // ) => () => void
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: SingleGameHistoryDetail
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
        minWidth: 300,
      },
      styleBody: {
        minWidth: 300,
      },
      // sort: true,

      renderBody: (value: SingleGameHistoryDetail) => (
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
      title: "User Id",
      field: "user_id",
      styleHeader: {
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      // sort: true,

      renderBody: (value: SingleGameHistoryDetail) => (
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
            {value.user_ids[0]}
          </p>
        </div>
      ),
    },
    {
      title: "Bet",
      field: "bet",
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
      renderBody: (value: SingleGameHistoryDetail) => (
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
      title: "Jackpot Coin",
      field: "jackpot_coin",
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
      // sort: true,
      renderBody: (value: SingleGameHistoryDetail) => (
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
          {value.jackpot_coin}
        </p>
      ),
    },
    {
      title: "Final Result",
      field: "details[0].final_result",
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
      renderBody: (value: SingleGameHistoryDetail) => (
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
      title: "Result",
      field: "result",
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
      renderBody: (value: SingleGameHistoryDetail) => (
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
          {value.details[0].result}
        </p>
      ),
    },

    {
      title: "Email",
      field: "email",
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
      renderBody: (value: SingleGameHistoryDetail) => (
        <p>{value.details[0].player_email}</p>
      ),
    },
    {
      title: "Created At",
      field: "created_at",
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
      renderBody: (value: SingleGameHistoryDetail) => (
        <p>{value.created_at ? formatDate(value.created_at) : ""}</p>
      ),
    },
    {
      title: "Updated At",
      field: "updated_at",
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
      renderBody: (value: SingleGameHistoryDetail) => (
        <p>{value.updated_at ? formatDate(value.updated_at) : ""}</p>
      ),
    },
  ];

  return headers;
}
