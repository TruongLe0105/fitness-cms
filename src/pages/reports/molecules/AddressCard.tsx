import Typography from "components/Typography";
import { MARKET_CONTRACT_ADDRESS } from "config/environments";
import { ZERO_ADDRESS } from "helpers/constant";
import {
  onRedirectTestnet,
  showAvatarOwnerStar,
  showFullNameOwnerStar,
} from "helpers/util";
import { AddressCardProps } from "../types";

const AddressCard = (props: AddressCardProps): JSX.Element => {
  const { address, owner, rootClass } = props;
  const renderBody = () => {
    if (owner) {
      return (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "38px calc(100% - 38px)",
          }}
        >
          <div className="flex items-center">
            <div
              style={{
                backgroundImage: `url(${showAvatarOwnerStar(owner)})`,
              }}
              className="w-30-custom h-30-custom rounded-full bg-no-repeat bg-center bg-cover mr-2"
            />
          </div>

          <div className="flex flex-col">
            <Typography
              textColor="text-black-04-custom"
              fontWeight="font-semibold"
              textClass={rootClass ?? ""}
            >
              {showFullNameOwnerStar(owner)}
            </Typography>
            <p
              onClick={onRedirectTestnet(address)}
              className="text-xs font-normal text-primary-custom italic cursor-pointer hover:underline mt-0.5"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
              }}
            >
              {address}
            </p>
          </div>
        </div>
      );
    }
    if (address === MARKET_CONTRACT_ADDRESS.toLowerCase()) {
      return (
        <p
          className={`work-break-custom whitespace-pre-line text-primary-custom ${
            rootClass ?? ""
          }`}
        >
          Market
        </p>
      );
    }
    if (address === ZERO_ADDRESS) {
      return (
        <p
          className={`work-break-custom whitespace-pre-line text-primary-custom ${
            rootClass ?? ""
          }`}
        >
          Zero Address
        </p>
      );
    }
    return (
      <p
        onClick={onRedirectTestnet(address)}
        className={`work-break-custom whitespace-pre-line text-primary-custom cursor-pointer hover:underline ${
          rootClass ?? ""
        }`}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          WebkitLineClamp: 1,
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
        }}
      >
        {address}
      </p>
    );
  };

  return <div>{renderBody()}</div>;
};

export default AddressCard;
