// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { BSC_SCAN_URL } from "config/environments";
export function dataHeaderUser(
// handleOpenUpdateList: (
//   key: "edit" | "delete" | "view-detail",
//   value: NotificationDetail
// ) => () => void
handleOpenUpdateList) {
    const headers = [
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
            renderBody: (value) => (<p 
            // onClick={handleOpenUpdateList("view-detail", value)}
            style={{
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
            title: "from",
            field: "from",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 300,
                maxWidth: 300,
            },
            styleBody: {
                textTransform: "lowercase",
                minWidth: 300,
                maxWidth: 300,
            },
            sort: true,
            renderBody: (value) => (<div>
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
                }} className="text-primary-custom whitespace-pre-line cursor-pointer">
            {value.from ? (<a href={`${BSC_SCAN_URL}/address/` + value.from} onClick={() => window.open(`${BSC_SCAN_URL}/address/` + value.from, "_blank")}>
                {value.from.slice(0, 5)} ...{" "}
                {value.from.slice(value.from.length - 5, value.from.length)}
              </a>) : (<a></a>)}
          </p>
        </div>),
        },
        {
            title: "to",
            field: "to",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 300,
                maxWidth: 300,
            },
            styleBody: {
                textTransform: "lowercase",
                minWidth: 300,
                maxWidth: 300,
            },
            sort: true,
            renderBody: (value) => (<div>
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
                }} className="text-primary-custom whitespace-pre-line cursor-pointer">
            {value.to ? (<a href={`${BSC_SCAN_URL}/address/` + value.to} onClick={() => window.open(`${BSC_SCAN_URL}/address/` + value.to, "_blank")}>
                {value.to.slice(0, 5)} ...{" "}
                {value.to.slice(value.to.length - 5, value.to.length)}
              </a>) : (<a></a>)}
          </p>
        </div>),
        },
        {
            title: "type",
            field: "type",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.type}
        </p>),
        },
        {
            title: "status",
            field: "status",
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
            // sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.status}
        </p>),
        },
        {
            title: "tokenAmount",
            field: "token_amount",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.token_amount}
        </p>),
        },
        {
            title: "pointAmount",
            field: "coin_amount",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.coin_amount}
        </p>),
        },
        {
            title: "netPointAmount",
            field: "net_coin_amount",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.net_coin_amount}
        </p>),
        },
        {
            title: "nonce",
            field: "nonce",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.nonce}
        </p>),
        },
        {
            title: "blockNumber",
            field: "block_number",
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
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.block_number}
        </p>),
        },
        {
            title: "userId",
            field: "user_id",
            styleHeader: {
                textTransform: "capitalize",
                // minWidth: 350,
                // maxWidth: 600,
                minWidth: 300,
            },
            styleBody: {
                // minWidth: 350,
                // maxWidth: 600,
                minWidth: 300,
            },
            sort: true,
            renderBody: (value) => (<p style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                }} className="whitespace-pre-line">
          {value.user_id}
        </p>),
        },
        {
            title: "txHash",
            field: "txhash",
            styleHeader: {
                textTransform: "capitalize",
                minWidth: 600,
                maxWidth: 600,
            },
            styleBody: {
                minWidth: 600,
                maxWidth: 600,
            },
            // sort: true,
            renderBody: (value) => (<div>
          <p 
            // href= {`${BSC_SCAN_URL}/address/` + value.walletAddress}
            // target={"_blank"}
            // onClick={handleOspanenUpdateList("view-detail", value)}
            // onClick=
            style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 1,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    zIndex: 1000000,
                }} className="text-primary-custom whitespace-pre-line cursor-pointer">
            {value.txhash ? (<a href={`${BSC_SCAN_URL}/tx/` + value.txhash} onClick={() => window.open(`${BSC_SCAN_URL}/tx/` + value.txhash, "_blank")}>
                {value.txhash}
              </a>) : (<a></a>)}
          </p>
        </div>),
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
            renderBody: (value) => (<p>{value.updated_at ? formatDate(value.updated_at) : ""}</p>),
        },
        // {
        //   title: "Action",
        //   field: "action",
        //   styleSort: {
        //     justifyContent: "flex-end",
        //   },
        //   styleHeader: {
        // textTransform: "capitalize",
        //     paddingLeft: 10,
        //     width: "100vh",
        //     minWidth: 100,
        //   },
        //   styleBody: {
        //     paddingLeft: 10,
        //     width: "100vh",
        //     minWidth: 100,
        //   },
        //   renderBody: (value: TransactionDetail) => (
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
