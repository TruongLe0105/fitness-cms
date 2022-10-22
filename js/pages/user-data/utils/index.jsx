// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { BSC_SCAN_URL } from "config/environments";
export function dataHeaderUser(
// handleOpenUpdateList: (
//   key: "edit" | "delete" | "view-detail",
//   value: NotificationDetail
// ) => () => void
handleOpenUpdateList) {
    const logFunction = () => {
        console.log("Click");
    };
    const headers = [
        {
            title: "id",
            field: "id",
            styleHeader: {
                minWidth: 300,
            },
            styleBody: {
                minWidth: 300,
            },
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="text-primary-custom whitespace-pre-line cursor-pointer">
          {value.id}
        </p>),
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.email}
        </p>),
        },
        {
            title: "Wallet",
            field: "wallet",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 300,
                maxWidth: 300,
            },
            styleBody: {
                minWidth: 300,
                maxWidth: 300,
            },
            renderBody: (value) => (<div>
          <p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    zIndex: 1000000,
                }} className="text-primary-custom whitespace-pre-line cursor-pointer">
            <a href={`${BSC_SCAN_URL}/address/` + value.wallet} target="_blank" onClick={() => window.open(`${BSC_SCAN_URL}/address/` + value.wallet, "_blank")}>
              {value.wallet && value.wallet.length
                    ? `${value.wallet.slice(0, 10)}...${value.wallet.slice(value.wallet.length - 10, value.wallet.length)}`
                    : ""}
            </a>
          </p>
        </div>),
        },
        {
            title: "User Name",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.name}
        </p>),
        },
        {
            title: "Total Coin",
            field: "total_coin",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.total_coin}
        </p>),
        },
        {
            title: "Today Coin",
            field: "coin_earned_today",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.coin_earned_today}
        </p>),
        },
        {
            title: "Week Coin",
            field: "coin_earned_week",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.coin_earned_week}
        </p>),
        },
        {
            title: "Month Coin",
            field: "coin_earned_month",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.coin_earned_month}
        </p>),
        },
        {
            title: "Pending Coin",
            field: "pending_coin",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.pending_coin}
        </p>),
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
            renderBody: (value) => (<p>{value.created_at ? formatDate(value.created_at) : ""}</p>),
        },
    ];
    return headers;
}
