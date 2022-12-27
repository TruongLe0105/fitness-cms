import { Header } from "components/Table/types";
// import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";
import { formatDate, formatPrice } from "helpers/util";
import {
  PackageDetail,
  NotificationDetail,
  STATUS_NOTIFICATION,
} from "../types";
import MovieIcon from '@mui/icons-material/Movie';
import { useState } from "react";
import ModalGyms from "pages/merchant/organisms/ModalGyms";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";

export function dataHeaderPackage(
  setDataGymsPackage,
  openPackage,
  handleOpenUpdateList: (
    key: "edit" | "delete" | "view-detail",
    value: PackageDetail
  ) => () => void,
  onEdit,
  onDelete
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

      renderBody: (value: PackageDetail) => (
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
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.name}
        </p>
      ),
    },
    {
      title: "Description",
      field: "description",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.description}
        </p>
      ),
    },
    {
      title: "Total Gym",
      field: "totalGym",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.gym.length} gyms
          <MovieIcon
            color="primary"
            fontSize="large"
            className="ml-4 cursor-pointer"
            onClick={() => {
              setDataGymsPackage(value);
              openPackage.setValue(true);
            }}
          />
        </p>
      ),
    },
    {
      title: "Time Period Type",
      field: "timePeriodType",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.timePeriodType}
        </p>
      ),
    },
    {
      title: "Price",
      field: "price",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {formatPrice(value.price)}
        </p>
      ),
    },
    {
      title: "Unit Time",
      field: "unitTime",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.unitTime}
        </p>
      ),
    },
    // {
    //   title: "Gym",
    //   field: "gym",
    //   styleHeader: {
    //     textTransform: "capitalize",

    //     minWidth: 200,
    //     maxWidth: 400,
    //   },
    //   styleBody: {
    //     minWidth: 200,
    //     maxWidth: 400,
    //   },
    //   renderBody: (value: PackageDetail) => (
    //     <p
    //       style={{
    //         overflow: "hidden",
    //         textOverflow: "ellipsis",
    //         WebkitLineClamp: 3,
    //         display: "-webkit-box",
    //         WebkitBoxOrient: "vertical",
    //       }}
    //       className="whitespace-pre-line"
    //     >
    //       {value.gym[0].name}
    //     </p>
    //   ),
    // },
    {
      title: "Type",
      field: "type",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.type.toUpperCase()}
        </p>
      ),
    },
    {
      title: "Benefit",
      field: "benefit",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.benefit[0]}
        </p>
      ),
    },
    {
      title: "Rules",
      field: "rules",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 200,
        maxWidth: 400,
      },
      styleBody: {
        minWidth: 200,
        maxWidth: 400,
      },
      renderBody: (value: PackageDetail) => (
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
          {value.rules[0]}
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
      renderBody: (value: PackageDetail) => (
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
      renderBody: (value: PackageDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
    {
      title: "Action",
      field: "action",
      styleSort: {
        justifyContent: "flex-end",
      },
      styleHeader: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 160,
      },
      styleBody: {
        paddingLeft: 10,
        width: "100vh",
        minWidth: 160,
      },
      renderBody: (value: PackageDetail) => (
        <div className="flex items-center justify-end">
          <div style={{ margin: "0 5px" }}>
            <DefaultButtonIcon
              disable={false}
              onClick={() => onEdit(value)}
              field="edit"
              titleTooltip="Update"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>

          <DefaultButtonIcon
            onClick={() => onDelete(value)}
            disable={false}
            field="delete"
            titleTooltip="Destroy"
            keyButtonIcon={Math.random().toString(36)}
          />
        </div>
      ),
    },
  ];

  return headers;
}
