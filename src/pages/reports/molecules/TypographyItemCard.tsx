import Typography from "components/Typography";
import { onRedirectTestnet } from "helpers/util";
import { TypographyItemCardProps } from "../types";

const TypographyItemCard = (props: TypographyItemCardProps): JSX.Element => {
  const { label, title, rootClass, isLink } = props;
  return (
    <div className={`flex flex-col mb-3 pr-30-custom ${rootClass}`}>
      <Typography
        fontWeight="font-semibold"
        textColor="text-gray-custom"
        textClass="mb-1"
      >
        {title}
      </Typography>
      <p
        onClick={isLink ? onRedirectTestnet(label) : undefined}
        className={`font-semibold ${
          isLink
            ? "text-primary-custom cursor-pointer hover:underline"
            : "text-black "
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default TypographyItemCard;
