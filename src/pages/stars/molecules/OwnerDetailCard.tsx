import { OwnerDetailCardProps } from "../types";
import { showAvatarOwnerStar, showFullNameOwnerStar } from "helpers/util";
import Typography from "components/Typography";

const OwnerDetailCard = (props: OwnerDetailCardProps): JSX.Element => {
  const { market, owner } = props;
  if (!market?.seller && !owner) {
    return <div />;
  }
  return (
    <div className="flex items-center cursor-pointer">
      <div
        style={{
          backgroundImage: `url(${showAvatarOwnerStar(owner, market)})`,
        }}
        className="w-30-custom h-30-custom rounded-full bg-no-repeat bg-center bg-cover mr-2"
      />
      <Typography textColor="text-black-04-custom" fontWeight="font-normal">
        {showFullNameOwnerStar(owner, market)}
      </Typography>
    </div>
  );
};
export default OwnerDetailCard;
