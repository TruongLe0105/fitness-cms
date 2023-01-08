import { FilterItemDetail, ItemFilter, ORDER_STATUS_ITEM } from "components/Filter/types";
import { Header } from "components/Table/types";
import { formatDate } from "helpers/util";
import {
  OrderDetail,
} from "../types";

export function dataHeaderUser(): Header[] {
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

      renderBody: (value: OrderDetail) => (
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
    // {
    //   title: "Client",
    //   field: "client",
    //   styleHeader: {
    //     textTransform: "capitalize",

    //     minWidth: 200,
    //     maxWidth: 400,
    //   },
    //   styleBody: {
    //     minWidth: 200,
    //     maxWidth: 400,
    //   },
    //   renderBody: (value: OrderDetail) => (
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
    //       {value.client}
    //     </p>
    //   ),
    // },
    // {
    //   title: "Package",
    //   field: "package",
    //   styleHeader: {
    //     textTransform: "capitalize",

    //     minWidth: 200,
    //     maxWidth: 400,
    //   },
    //   styleBody: {
    //     minWidth: 200,
    //     maxWidth: 400,
    //   },
    //   renderBody: (value: OrderDetail) => (
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
    //       {value.package}
    //     </p>
    //   ),
    // },
    {
      title: "Gym",
      field: "gym",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      renderBody: (value: OrderDetail) => (
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
          {value.gym?.name}
        </p>
      ),
    },
    {
      title: "Price",
      field: "price",
      styleHeader: {
        textTransform: "capitalize",

        minWidth: 300,
        maxWidth: 300,
      },
      styleBody: {
        minWidth: 300,
        maxWidth: 300,
      },
      renderBody: (value: OrderDetail) => (
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
          {value.price}
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
      renderBody: (value: OrderDetail) => (
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
      renderBody: (value: OrderDetail) => (
        <p>{value.createdAt ? formatDate(value.createdAt) : ""}</p>
      ),
    },
  ];

  return headers;
}

export const filterOrder: FilterItemDetail[] = [
  {
    title: 'Order Status',
    filed: ItemFilter.ORDER,
    listChecked: [
      {
        name: 'Pending',
        filed: ORDER_STATUS_ITEM.PENDING,
      },
      {
        name: 'Cancel',
        filed: ORDER_STATUS_ITEM.CANCEL,
      },
      {
        name: 'Done',
        filed: ORDER_STATUS_ITEM.DONE,
      },
    ],
  },
];
