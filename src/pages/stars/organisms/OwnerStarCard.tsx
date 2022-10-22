import {
  formatDate,
  formatETH,
  showAvatarOwnerStar,
  showFullNameOwnerStar,
} from "helpers/util";
import TitleStarCard from "../molecules/TitleStarCard";
import { OwnerStarCardProps } from "../types";
import { CURRENCY_SYMBOL_WEB } from "config/environments";
import { ReactComponent as IconOwner } from "assets/images/icons/menu-user-mobile.svg";
import React from "react";
import Tooltip from "components/Tooltip";

const OwnerStarCard = (props: OwnerStarCardProps): JSX.Element => {
  const { market, owner, ownerBoughtAt, purchasePrice, rootClass } = props;
  const hasOwner = market?.seller || owner ? true : false;
  return (
    <div className={`flex flex-col w-250-custom ${rootClass ?? "mt-8"}`}>
      <div className="flex flex-col p-4 card-info-star relative">
        {hasOwner ? (
          <React.Fragment>
            <div
              data-tip
              data-for="icon-owner"
              className="w-35-custom h-35-custom rounded-full bg-primary-06-custom flex items-center justify-center absolute bg-active-tooltip"
            >
              <IconOwner className="icon-owner w-20-custom h-20-custom" />
              <Tooltip id="icon-owner" text="OWNER" />
            </div>
            <div className="flex justify-center mb-3">
              <div
                style={{
                  backgroundImage: `url(${showAvatarOwnerStar(owner, market)})`,
                }}
                className="w-112-custom h-112-custom rounded-full bg-no-repeat bg-center bg-cover"
              />
            </div>
            <TitleStarCard
              label="Username:"
              message={`${showFullNameOwnerStar(owner, market)}`}
              rootClassName="mb-3"
            />
          </React.Fragment>
        ) : null}

        <TitleStarCard
          label="Purchase Price:"
          message={`${formatETH(purchasePrice)} ${CURRENCY_SYMBOL_WEB}`}
          rootClassName="mb-3"
        />
        <TitleStarCard
          label="Purchase Date:"
          message={ownerBoughtAt ? formatDate(ownerBoughtAt) : "No data"}
        />
      </div>
    </div>
  );
};
export default OwnerStarCard;
