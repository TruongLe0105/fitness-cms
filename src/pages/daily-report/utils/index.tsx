import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { DailyStatistic } from "../types";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { BSC_SCAN_URL } from "config/environments";

export function dataHeaderUser(): Header[] {
  const headers: Header[] = [
    {
      // title: "Name",
      // field: "name",
      title: "Wallet",
      field: "wallet",
      styleHeader: {
        // minWidth: 200,
        // maxWidth: 200,
        minWidth: 500,
      },
      styleBody: {
        minWidth: 500,
      },
      // sort: true,

      renderBody: (value: DailyStatistic) => (
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
          {value.wallet}
        </p>
      ),
    },
    {
      // title: "Name",
      // field: "name",
      title: "Email",
      field: "email",
      styleHeader: {
        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      // sort: true,

      renderBody: (value: DailyStatistic) => (
        <div>
          <p
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
            {value.email}
          </p>
        </div>
      ),
    },
    {
      title: "Coin Earned",
      field: "coin_earned",
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
      renderBody: (value: DailyStatistic) => (
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
          {value.coin_earned}
        </p>
      ),
    },
    {
      title: "Total Coin",
      field: "total_coin",
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
      renderBody: (value: DailyStatistic) => (
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
          {value.total_coin}
        </p>
      ),
    },
    {
      title: "Ip List",
      field: "ip_list",
      styleHeader: {
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
      // sort: true,
      renderBody: (value: DailyStatistic) => (
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
          {value.ip_list.map((item, index) => {
            let mappingIp = item.slice(7);
            if (mappingIp === "127.0.0.1") {
              return;
            }

            if (index !== value.ip_list.length - 1) {
              mappingIp = mappingIp + " || ";
            }
            return mappingIp;
          })}
        </p>
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
      renderBody: (value: DailyStatistic) => (
        <p>{value.created_at ? formatDate(value.created_at) : ""}</p>
      ),
    },
  ];

  return headers;
}
