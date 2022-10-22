import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { defaultNameUser, formatDate, formatETH, getNameClaimReferralCode, } from "helpers/util";
import React from "react";
import StatusReferralCode from "components/Status/StatusReferralCode";
import { capitalize } from "lodash";
export function dataHeaderReferralCodeHistory() {
    const headers = [
        {
            title: "Index",
            field: "index",
            styleHeader: {
                minWidth: 80,
                width: 80,
                padding: 0,
                textAlign: "center",
            },
            styleSort: {
                justifyContent: "center",
            },
            styleBody: {
                minWidth: 80,
                width: 80,
                padding: 0,
                textAlign: "center",
            },
        },
        {
            title: "User",
            field: "referrer",
            styleHeader: {
                paddingRight: 10,
                minWidth: 200,
                width: 200,
            },
            styleBody: {
                paddingRight: 10,
                minWidth: 200,
                width: 200,
            },
            renderBody: (value) => (<div className="flex items-center">
          {value.referrer ? (<React.Fragment>
              <div style={{
                        backgroundImage: `url(${value.referrer.avatar
                            ? value.referrer.avatar
                            : IconDefaultAvatar})`,
                    }} className="w-30-custom h-30-custom rounded-full bg-no-repeat bg-center bg-cover"/>
              <p className="ml-3">
                {defaultNameUser(value.referrer.firstName, value.referrer.lastName)}
              </p>
            </React.Fragment>) : null}
        </div>),
        },
        {
            title: "Referral Code",
            field: "code",
            styleHeader: {
                minWidth: 170,
                width: 170,
                maxWidth: 170,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleBody: {
                minWidth: 170,
                width: 170,
                maxWidth: 170,
                paddingRight: 10,
                paddingLeft: 10,
            },
            sort: true,
            renderBody: (value) => (<p className="text-primary-custom">{value.code}</p>),
        },
        {
            title: "Award",
            field: "reward",
            styleHeader: {
                minWidth: 100,
                width: 100,
                maxWidth: 100,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleBody: {
                minWidth: 100,
                width: 100,
                maxWidth: 100,
                paddingRight: 10,
                paddingLeft: 10,
            },
            sort: true,
            renderBody: (value) => <p>{value.reward}</p>,
        },
        {
            title: "Claim",
            field: "isReward",
            styleHeader: {
                minWidth: 120,
                width: 120,
                maxWidth: 120,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleBody: {
                minWidth: 120,
                width: 120,
                maxWidth: 120,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleSort: {
                justifyContent: "center",
            },
            sort: true,
            renderBody: (value) => (<StatusReferralCode status={getNameClaimReferralCode(value.isReward, value.referralReward)}/>),
        },
        {
            title: "Refer to",
            field: "user",
            styleHeader: {
                paddingRight: 10,
                paddingLeft: 10,
                minWidth: 200,
                width: 200,
            },
            styleBody: {
                paddingRight: 10,
                paddingLeft: 10,
                minWidth: 200,
                width: 200,
            },
            renderBody: (value) => (<div className="flex items-center">
          {value.user ? (<React.Fragment>
              <div style={{
                        backgroundImage: `url(${value.user && value.user.avatar
                            ? value.user.avatar
                            : IconDefaultAvatar})`,
                    }} className="w-30-custom h-30-custom rounded-full bg-no-repeat bg-center bg-cover"/>
              <p className="ml-3">
                {defaultNameUser(value.user.firstName, value.user.lastName)}
              </p>
            </React.Fragment>) : null}
        </div>),
        },
        {
            title: "Created At",
            field: "createdAt",
            styleHeader: {
                paddingRight: 32,
                paddingLeft: 10,
                width: "100vh",
                minWidth: 160,
            },
            styleSort: {
                justifyContent: "flex-end",
            },
            styleBody: {
                paddingRight: 32,
                paddingLeft: 10,
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
export function dataHeaderReferralCodeWard() {
    const headers = [
        {
            title: "Index",
            field: "index",
            styleHeader: {
                minWidth: 80,
                width: 80,
                padding: 0,
                textAlign: "center",
            },
            styleSort: {
                justifyContent: "center",
            },
            styleBody: {
                minWidth: 80,
                width: 80,
                padding: 0,
                textAlign: "center",
            },
        },
        {
            title: "User",
            field: "referrer",
            styleHeader: {
                paddingRight: 10,
                minWidth: 200,
                width: 200,
            },
            styleBody: {
                paddingRight: 10,
                minWidth: 200,
                width: 200,
            },
            renderBody: (value) => (<div className="flex items-center">
          {value.user ? (<React.Fragment>
              <div style={{
                        backgroundImage: `url(${value.user.avatar ? value.user.avatar : IconDefaultAvatar})`,
                    }} className="w-30-custom h-30-custom rounded-full bg-no-repeat bg-center bg-cover"/>
              <p className="ml-3">
                {defaultNameUser(value.user.firstName, value.user.lastName)}
              </p>
            </React.Fragment>) : null}
        </div>),
        },
        {
            title: "Award",
            field: "reward",
            styleHeader: {
                minWidth: 170,
                width: 170,
                maxWidth: 170,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleBody: {
                minWidth: 170,
                width: 170,
                maxWidth: 170,
                paddingRight: 10,
                paddingLeft: 10,
            },
            sort: true,
            renderBody: (value) => (<p>{formatETH(value.reward)}</p>),
        },
        {
            title: "Status",
            field: "status",
            styleHeader: {
                minWidth: 120,
                width: 120,
                maxWidth: 120,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleBody: {
                minWidth: 120,
                width: 120,
                maxWidth: 120,
                paddingRight: 10,
                paddingLeft: 10,
            },
            styleSort: {
                justifyContent: "center",
            },
            sort: true,
            renderBody: (value) => (<StatusReferralCode status={capitalize(value.status)}/>),
        },
        {
            title: "Created At",
            field: "createdAt",
            styleHeader: {
                paddingRight: 32,
                paddingLeft: 10,
                width: "100vh",
                minWidth: 160,
            },
            styleSort: {
                justifyContent: "flex-end",
            },
            styleBody: {
                paddingRight: 32,
                paddingLeft: 10,
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
