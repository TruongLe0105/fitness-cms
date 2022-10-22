import { Header } from "components/Table/types";
import Typography from "components/Typography";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import { formatDate, formatETH, getNameMethodReport } from "helpers/util";
import AddressCard from "../molecules/AddressCard";
import StarAndKeyword from "../molecules/StarAndKeyword";
import { ReportDetail } from "../types";

export function dataHeaderReport(
  sumListingFee: string,
  sumDonationFee: string
): Header[] {
  const headers: Header[] = [
    {
      title: "No",
      field: "no",
      styleHeader: {
        paddingRight: 10,
        width: 80,
        minWidth: 80,
        maxWidth: 80,
      },
      styleBody: {
        paddingRight: 10,
        width: 80,
        minWidth: 80,
        maxWidth: 80,
      },
      renderBody: (value: ReportDetail, index?: number) => (
        <p>{Number(index) + 1}</p>
      ),
    },
    {
      title: "From",
      field: "from",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
      },
      sort: true,
      renderBody: (value: ReportDetail) => (
        <AddressCard address={value.from} owner={value.seller} />
      ),
    },
    {
      title: "To",
      field: "to",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
      },
      sort: true,
      renderBody: (value: ReportDetail) => (
        <AddressCard address={value.to} owner={value.buyer} />
      ),
    },
    {
      title: "Action",
      field: "action",
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
      renderBody: (value: ReportDetail) => (
        <p className="work-break-custom">
          {value.filter ? getNameMethodReport(value.filter) : ""}
        </p>
      ),
    },
    {
      title: "Price",
      field: "price",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
        wordBreak: "break-word",
      },
      renderBody: (value: ReportDetail) => (
        <p>
          {value.price
            ? `${formatETH(value.price)} ${CURRENCY_SYMBOL_WEB}`
            : ""}
        </p>
      ),
    },
    {
      title: "Item",
      field: "starAndKeyword",
      styleHeader: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
      },
      styleBody: {
        paddingRight: 10,
        paddingLeft: 10,
        width: 240,
        minWidth: 240,
        maxWidth: 240,
        wordBreak: "break-word",
      },
      renderBody: (value: ReportDetail) => (
        <StarAndKeyword keyword={value.keyword} star={value.star} />
      ),
    },
    {
      title: "Listing Fee",
      field: "listingFee",
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
        wordBreak: "break-word",
      },
      renderHeader: (
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="h6"
            textColor="text-black"
            fontWeight="font-semibold"
          >
            Listing Fee
          </Typography>
          <p className="text-primary-custom font-semibold text-xs">
            {`(${sumListingFee} ${CURRENCY_SYMBOL_WEB})`}
          </p>
        </div>
      ),
      sort: true,
      renderBody: (value: ReportDetail) => (
        <p>
          {value.listingFee
            ? `${formatETH(value.listingFee)} ${CURRENCY_SYMBOL_WEB}`
            : ""}
        </p>
      ),
    },
    {
      title: "Donation Fee",
      field: "donationFee",
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
        wordBreak: "break-word",
      },
      renderHeader: (
        <div className="flex flex-col justify-center items-center">
          <Typography
            variant="h6"
            textColor="text-black"
            fontWeight="font-semibold"
          >
            Donation Fee
          </Typography>
          <p className="text-primary-custom font-semibold text-xs">
            {`(${sumDonationFee} ${CURRENCY_SYMBOL_WEB})`}
          </p>
        </div>
      ),
      sort: true,
      renderBody: (value: ReportDetail) => (
        <p>
          {value.donationFee
            ? `${formatETH(value.donationFee)} ${CURRENCY_SYMBOL_WEB}`
            : ""}
        </p>
      ),
    },
    {
      title: "Created At",
      field: "createdAt",
      styleHeader: {
        paddingRight: 30,
        paddingLeft: 10,
        width: "100vw",
        minWidth: 220,
      },
      styleBody: {
        paddingRight: 30,
        paddingLeft: 10,
        minWidth: 220,
        width: "100vw",
        textAlign: "end",
      },
      styleSort: {
        justifyContent: "flex-end",
      },
      sort: true,
      renderBody: (value: ReportDetail) => (
        <p>
          {value.date ? formatDate(value.date, "dd MMM yyyy, HH:mm:ss a") : ""}
        </p>
      ),
    },
  ];

  return headers;
}
