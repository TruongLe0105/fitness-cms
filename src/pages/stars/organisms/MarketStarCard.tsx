import TitleStarCard from "../molecules/TitleStarCard";
import { MarketStarCardProps } from "../types";
import { formatDate, formatETH, msToTime } from "helpers/util";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import React from "react";
import { ReactComponent as IconMarket } from "assets/images/icons/market.svg";
import Tooltip from "components/Tooltip";

const MarketStarCard = (props: MarketStarCardProps): JSX.Element => {
  const { dataItem, nameLinked, title } = props;
  return (
    <div>
      <div
        data-tip
        data-for="icon-market"
        className="w-35-custom h-35-custom rounded-full bg-orange-02-custom flex items-center justify-center bg-active-tooltip"
      >
        <IconMarket className="icon-market w-20-custom h-20-custom" />
        <Tooltip id="icon-market" text="MARKET" />
      </div>
      <div className="flex flex-col mt-3">
        <TitleStarCard
          label="Selling Price:"
          message={`${formatETH(dataItem.price)} ${CURRENCY_SYMBOL_WEB}`}
          rootClassName="mb-3"
        />
        <TitleStarCard
          label={title}
          rootClassName="mb-3"
          message={nameLinked ? nameLinked : "No data"}
        />

        {dataItem.endAuction ? (
          <React.Fragment>
            <TitleStarCard
              label="Start date:"
              rootClassName="mb-3"
              message={
                dataItem.createdAt ? formatDate(dataItem.createdAt) : "No data"
              }
            />
            <TitleStarCard
              label="End date:"
              rootClassName="mb-3"
              message={msToTime(Number(dataItem.endAuction))}
            />
          </React.Fragment>
        ) : (
          <TitleStarCard
            label="Seller Date:"
            rootClassName="mb-3"
            message={
              dataItem.createdAt ? formatDate(dataItem.createdAt) : "No data"
            }
          />
        )}
        <TitleStarCard
          label="Seller Address:"
          message={dataItem.sellerAddress ?? "No data"}
        />
      </div>
      {/* <div className="grid grid-image-preview">
        <div className="flex flex-col items-center justify-center">
          <div
            style={{
              backgroundImage: `url(${
                dataItem.seller?.avatar ?? IconDefaultAvatar
              })`,
            }}
            className="w-112-custom h-112-custom rounded-full bg-no-repeat bg-center bg-cover"
          />
          <Typography
            textColor="text-primary-custom"
            fontWeight="font-normal"
            textClass="work-break-custom mt-3"
          >
            {`${dataItem.seller.firstName} ${dataItem.seller.lastName}`}
          </Typography>
        </div>
        <div className="flex flex-col ml-8">
          <TitleStarCard
            label="Price:"
            message={`${formatETH(dataItem.price)} ${CURRENCY_SYMBOL_WEB}`}
            rootClassName="mb-3"
          />

          <TitleStarCard
            label="Status:"
            message={dataItem.status ?? "No data"}
            rootClassName="mb-3"
          />
          <TitleStarCard
            label="Type:"
            message={dataItem.type ?? "No data"}
            rootClassName="mb-3"
          />
          <TitleStarCard
            label="Buyer Address:"
            message={dataItem.buyerAddress ?? "No data"}
            rootClassName="mb-3"
          />
          <TitleStarCard
            label="Seller Address:"
            message={dataItem.sellerAddress ?? "No data"}
          />
        </div>
      </div> */}
    </div>
  );
};
export default MarketStarCard;
