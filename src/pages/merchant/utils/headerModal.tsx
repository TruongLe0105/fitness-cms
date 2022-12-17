import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate } from "helpers/util";
import { GymDetail } from "pages/gym/types";
import { PackageDetail } from "pages/package/types";

export function dataHeaderModal(
    // handleOpenUpdateList: (
    //   key: "edit" | "delete" | "view-detail",
    //   value: NotificationDetail
    // ) => () => void
    handleOpenUpdateList?: (
        key: "edit" | "delete" | "view-detail",
        value: GymDetail
    ) => () => void
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

            renderBody: (value: GymDetail) => (
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
            title: "Name",
            field: "name",
            styleHeader: {
                minWidth: 300,
            },
            styleBody: {
                minWidth: 300,
            },

            renderBody: (value: GymDetail) => (
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
                    {value.name}
                </p>
            ),
        },
    ];

    return headers;
}
