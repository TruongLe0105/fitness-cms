import { Header } from "components/Table/types";
import { SystemKeywordDetail } from "../types";
import { formatDate, formatETH, getPriceKeyword } from "helpers/util";
import DefaultButtonIcon from "components/ButtonIcon/DefaultButtonIcon";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import OwnerDetailCard from "pages/stars/molecules/OwnerDetailCard";
import {
  FiledFilterItem,
  FilterItemDetail,
  LINK_WITH_STAR_FILTER,
  MARKET_STATUS_FILTER,
  OWNER_STATUS_FILTER,
  TYPES_STATUS_FILTER,
} from "components/Filter/types";

export const dataHeaderKeyword = (
  handleOpenUpdateList: (
    key:
      | "delete"
      | "edit"
      | "mint"
      | "cost"
      | "cancel"
      | "sell"
      | "viewKeyword",
    dataRes: SystemKeywordDetail
  ) => () => void
): Header[] => {
  const headers: Header[] = [
    {
      title: "",
      field: "checkbox",
      styleHeader: {
        paddingRight: 10,
        width: 60,
        minWidth: 60,
        maxWidth: 60,
      },
      styleBody: {
        paddingRight: 10,
        width: 60,
        minWidth: 60,
        maxWidth: 60,
      },
      isCheckbox: true,
    },
    {
      title: "Name",
      field: "name",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      sort: true,
      renderBody: (value: SystemKeywordDetail) => (
        <p
          className="text-primary-custom cursor-pointer"
          onClick={handleOpenUpdateList("viewKeyword", value)}
        >
          {value.name}
        </p>
      ),
    },
    {
      title: "Category",
      field: "category",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      renderBody: (value: SystemKeywordDetail) => (
        <p className="text-primary-custom cursor-pointer">
          {value.category?.name || ""}
        </p>
      ),
    },
    {
      title: "Meaning",
      field: "meaning",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },

      renderBody: (value: SystemKeywordDetail) => (
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {value.meaning || ""}
        </p>
      ),
    },
    {
      title: "Star",
      field: "star",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      renderBody: (value: SystemKeywordDetail) => (
        <p>{value.star ? `${value.star.name}` : ""}</p>
      ),
    },
    {
      title: "Price",
      field: "purchasePrice",

      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        wordBreak: "break-word",
      },
      sort: true,
      renderBody: (value: SystemKeywordDetail) => (
        <p>{getPriceKeyword(value)}</p>
      ),
    },
    {
      title: "Owner",
      field: "owner",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 200,
        minWidth: 200,
        maxWidth: 200,
      },
      renderBody: (value: SystemKeywordDetail) => (
        <OwnerDetailCard owner={value.owner} market={value.market} />
      ),
    },

    {
      title: "Purchase Date",
      field: "ownerBoughtAt",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 180,
        minWidth: 180,
        maxWidth: 180,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 180,
        minWidth: 180,
        maxWidth: 180,
      },
      sort: true,
      renderBody: (value: SystemKeywordDetail) => (
        <p>{value.ownerBoughtAt ? formatDate(value.ownerBoughtAt) : ""}</p>
      ),
    },

    {
      title: "Selling Price",
      field: "price",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 120,
        minWidth: 120,
        maxWidth: 120,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 120,
        minWidth: 120,
        maxWidth: 120,
      },
      renderBody: (value: SystemKeywordDetail) => (
        <p className="work-break-custom">
          {value.nftId && value.market && value.market.price
            ? `${formatETH(value.market.price)} ${CURRENCY_SYMBOL_WEB}`
            : ""}
        </p>
      ),
    },
    {
      title: "Created At",
      field: "createdAt",
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
      renderBody: (value: SystemKeywordDetail) => (
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
      renderBody: (value: SystemKeywordDetail) => (
        <div className="flex items-center justify-end">
          <div className="mr-2">
            {value.onMarket ? (
              <DefaultButtonIcon
                disable={value.nftId ? true : false}
                onClick={handleOpenUpdateList("cancel", value)}
                field="cancel"
                titleTooltip="Cancel Sell Keyword"
                keyButtonIcon={Math.random().toString(36)}
              />
            ) : (
              <DefaultButtonIcon
                disable={value.nftId ? true : false}
                onClick={handleOpenUpdateList("sell", value)}
                field="sell"
                titleTooltip="Sell Keyword"
                keyButtonIcon={Math.random().toString(36)}
              />
            )}
          </div>

          <DefaultButtonIcon
            disable={value.nftId || value.onMarket ? true : false}
            onClick={handleOpenUpdateList("cost", value)}
            field="cost"
            titleTooltip="Set Price"
            keyButtonIcon={Math.random().toString(36)}
          />
          <div className="ml-2">
            <DefaultButtonIcon
              disable={value.nftId || value.onMarket ? true : false}
              onClick={handleOpenUpdateList("edit", value)}
              field="edit"
              titleTooltip="Update"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
          <div className="ml-2">
            <DefaultButtonIcon
              onClick={handleOpenUpdateList("delete", value)}
              disable={value.nftId || value.onMarket ? true : false}
              field="delete"
              titleTooltip="Destroy"
              keyButtonIcon={Math.random().toString(36)}
            />
          </div>
        </div>
      ),
    },
  ];

  return headers;
};

export const filterKeyword: FilterItemDetail[] = [
  {
    title: "Owner Status",
    filed: FiledFilterItem.OWNER,
    listChecked: [
      {
        name: "Owned",
        filed: OWNER_STATUS_FILTER.OWNED,
      },
      {
        name: "No Owner",
        filed: OWNER_STATUS_FILTER.NO_OWNED,
      },
    ],
  },
  {
    title: "Market Status",
    filed: FiledFilterItem.MARKET,
    listChecked: [
      {
        name: "Selling",
        filed: MARKET_STATUS_FILTER.SELLING,
      },
      {
        name: "Is not selling",
        filed: MARKET_STATUS_FILTER.IS_NOT_SELLING,
      },
    ],
  },
  {
    title: "Linked with Star",
    filed: FiledFilterItem.LINK_WITH_STAR,
    listChecked: [
      {
        name: "Linked",
        filed: LINK_WITH_STAR_FILTER.LINKED,
      },
      {
        name: "Unlinked",
        filed: LINK_WITH_STAR_FILTER.UNLINKED,
      },
    ],
  },
  {
    title: "Types Status",
    filed: FiledFilterItem.TYPES,
    listChecked: [
      {
        name: "Register",
        filed: TYPES_STATUS_FILTER.REGISTER,
      },
      {
        name: "Mint",
        filed: TYPES_STATUS_FILTER.MINT,
      },
    ],
  },
];
