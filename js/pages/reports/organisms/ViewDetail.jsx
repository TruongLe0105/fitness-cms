import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import { formatDate, formatETH, getNameMethodReport } from "helpers/util";
import AddressCard from "../molecules/AddressCard";
import TypographyItemCard from "../molecules/TypographyItemCard";
const ViewDetail = (props) => {
    const { dataItem, onClose, openPopup } = props;
    return (<DialogCard openPopup={openPopup} handleCLoseDialog={onClose} disablePopup title="View detail report" rootStyle={{
            width: 600,
            paddingRight: 0,
        }} classAction="pr-30-custom">
      <div className="flex flex-col overflow-auto max-height-view-notification">
        {dataItem.from ? (<div className="flex flex-col mb-3 pr-30-custom">
            <Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="mb-1">
              From
            </Typography>
            <AddressCard address={dataItem.from} owner={dataItem.seller} rootClass="font-semibold text-base"/>
          </div>) : null}
        {dataItem.to ? (<div className="flex flex-col mb-3 pr-30-custom">
            <Typography fontWeight="font-semibold" textColor="text-gray-custom" textClass="mb-1">
              To
            </Typography>
            <AddressCard address={dataItem.to} owner={dataItem.buyer} rootClass="font-semibold text-base"/>
          </div>) : null}
        <TypographyItemCard title="Action" label={dataItem.type ? getNameMethodReport(dataItem.filter) : ""}/>

        {dataItem.price ? (<TypographyItemCard title="Price" label={`${formatETH(dataItem.price)} ${CURRENCY_SYMBOL_WEB}`}/>) : null}

        {dataItem.listingFee ? (<TypographyItemCard title="Listing Fee" label={`${formatETH(dataItem.listingFee)} ${CURRENCY_SYMBOL_WEB}`}/>) : null}
        {dataItem.donationFee ? (<TypographyItemCard title="Donation Fee" label={`${formatETH(dataItem.donationFee)} ${CURRENCY_SYMBOL_WEB}`}/>) : null}
        <TypographyItemCard title="Date" label={dataItem.date
            ? formatDate(dataItem.date, "dd MMM yyyy, HH:mm:ss a")
            : ""}/>
      </div>
    </DialogCard>);
};
export default ViewDetail;
