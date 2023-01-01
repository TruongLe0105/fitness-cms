import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import {
    MailboxDetail,
} from "../types";

export function dataHeaderUser(
): Header[] {
    const headers: Header[] = [
        {
            title: "ID",
            field: "id",
            styleHeader: {
                minWidth: 300,
            },
            styleBody: {
                minWidth: 300,
            },

            renderBody: (value: MailboxDetail) => (
                <p
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
            title: "Title",
            field: "title",
            styleHeader: {
                textTransform: "capitalize",

                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            renderBody: (value: MailboxDetail) => (
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
                    {value.title}
                </p>
            ),
        },
        {
            title: "Content",
            field: "content",
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
            // sort: true,
            renderBody: (value: MailboxDetail) => (
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
                    {value.content}
                </p>
            ),
        },

        {
            title: "Status",
            field: "status",
            styleHeader: {
                textTransform: "capitalize",

                minWidth: 200,
                maxWidth: 400,
            },
            styleBody: {
                minWidth: 200,
                maxWidth: 400,
            },
            renderBody: (value: MailboxDetail) => (
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
                    {value.status.toUpperCase()}
                </p>
            ),
        },
        {
            title: "Created At",
            field: "createdAt",
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
            renderBody: (value: MailboxDetail) => (
                <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
            ),
        },
    ];

    return headers;
}
