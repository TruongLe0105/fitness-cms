import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { format } from "date-fns";
import React from "react";
export const renderHeader = (onView, onEdit, onDelete) => [
    {
        title: "No",
        field: "stt",
        styleHeader: {
            width: 100,
            minWidth: 100,
        },
        styleBody: {
            width: 100,
            minWidth: 100,
        },
    },
    {
        title: "Version",
        field: "version",
        styleHeader: {
            width: 150,
            minWidth: 150,
        },
        styleBody: {
            width: 150,
            minWidth: 150,
        },
    },
    {
        title: "Public Date",
        field: "publishedDate",
        styleHeader: {
            width: 200,
            minWidth: 200,
        },
        styleBody: {
            width: 200,
            minWidth: 200,
        },
        renderBody: (value) => (<p>{format(new Date(value.publishedDate), "dd MMM yyyy")}</p>),
    },
    {
        title: "Android Link",
        field: "androidLink",
        styleHeader: {
            width: 200,
            minWidth: 200,
        },
        styleBody: {
            width: 200,
            minWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    },
    {
        title: "IOS Link",
        field: "iosLink",
        styleHeader: {
            width: 200,
            minWidth: 200,
        },
        styleBody: {
            width: 200,
            minWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
        },
    },
    {
        title: "Description",
        field: "description",
        styleHeader: {
            flexGrow: 1,
        },
        styleBody: {
            flexGrow: 1,
        },
        renderBody: (value) => (<p style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
            }} dangerouslySetInnerHTML={{
                __html: value.description || "",
            }}/>),
    },
    {
        title: "",
        field: "",
        styleSort: {
            justifyContent: "flex-end",
        },
        styleHeader: {
            width: 200,
            minWidth: 200,
        },
        styleBody: {
            width: 200,
            minWidth: 200,
        },
        renderBody: (item) => (<div className="flex items-center justify-end">
        <DefaultButtonIcon disable={false} onClick={() => onView(item)} field="view" titleTooltip="View" keyButtonIcon={Math.random().toString(36)}/>
        <DefaultButtonIcon disable={false} onClick={() => onEdit(item)} field="edit" titleTooltip="Update" keyButtonIcon={Math.random().toString(36)}/>

        <DefaultButtonIcon onClick={() => onDelete(item)} disable={false} field="delete" titleTooltip="Destroy" keyButtonIcon={Math.random().toString(36)}/>
      </div>),
    },
];
