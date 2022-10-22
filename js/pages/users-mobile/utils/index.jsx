import { STATUS_USER_MOBILE } from "../types";
import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import StatusCard from "../../../components/Status/StatusCard";
import { formatDate, formatETH } from "helpers/util";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
export function dataHeaderUserMobile(handleOpenViewUserDetail) {
    const headers = [
        {
            title: "Avatar",
            field: "avatar",
            styleHeader: {
                paddingRight: 0,
                paddingLeft: 25,
                width: 100,
                minWidth: 100,
                justifyContent: "center",
            },
            styleBody: {
                paddingRight: 0,
                paddingLeft: 0,
                width: 100,
                minWidth: 100,
                textAlign: "center",
            },
            renderBody: (value) => (<div className="flex justify-center cursor-pointer" onClick={handleOpenViewUserDetail(value.id, value.email)}>
          <div style={{
                    backgroundImage: `url(${value.avatar ?? IconDefaultAvatar})`,
                }} className="w-30-custom h-30-custom rounded-full bg-no-repeat bg-center bg-cover"/>
        </div>),
        },
        {
            title: "Email",
            field: "email",
            sort: true,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 300,
                minWidth: 300,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 300,
                minWidth: 300,
            },
            renderBody: (value) => (<p onClick={handleOpenViewUserDetail(value.id, value.email)} className="text-primary-custom cursor-pointer">
          {value.email}
        </p>),
        },
        {
            title: "Username",
            field: "lastName",
            sort: true,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
        },
        {
            title: "Total Wallet ID",
            field: "address",
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            renderBody: (value) => (<div className="flex justify-center">{value.address?.length ?? 0}</div>),
        },
        {
            title: "Subscribe",
            field: "isSubscription",
            sort: true,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 150,
                minWidth: 150,
                textAlign: "center",
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 150,
                minWidth: 150,
                textAlign: "center",
            },
            renderBody: (value) => (<p>{value.isSubscription ? "Yes" : "No"}</p>),
        },
        {
            title: "Referral Code",
            field: "referralCode",
            sort: true,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
        },
        {
            title: "Total Claimed",
            field: "totalClaimed",
            sort: false,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            renderBody: (value) => (<p>
          {value.totalClaimed
                    ? `${formatETH(value.totalClaimed)} ${CURRENCY_SYMBOL_WEB}`
                    : ""}
        </p>),
        },
        {
            title: "Total Claimable",
            field: "totalClaimable",
            sort: false,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
        },
        {
            title: "Login Type",
            field: "loginType",
            sort: true,
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                width: 160,
                minWidth: 160,
            },
            renderBody: (value) => (<p className="capitalize">{value.loginType}</p>),
        },
        {
            title: "Status",
            field: "status",
            styleSort: {
                justifyContent: "center",
            },
            styleHeader: {
                width: 140,
                minWidth: 140,
            },
            styleBody: {
                width: 140,
                minWidth: 140,
            },
            sort: true,
            renderBody: (value) => (<StatusCard status={value.status} active={STATUS_USER_MOBILE.ACTIVE}/>),
        },
        {
            title: "Created At",
            field: "createdAt",
            styleHeader: {
                paddingLeft: 10,
                width: "100vh",
                minWidth: 160,
            },
            styleSort: {
                justifyContent: "flex-end",
            },
            styleBody: {
                paddingLeft: 10,
                paddingRight: 55,
                width: "100vh",
                minWidth: 160,
                textAlign: "end",
            },
            sort: true,
            renderBody: (value) => (<p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>),
        },
    ];
    return headers;
}
