import Typography from "components/Typography";
import { TypographyItemCardProps } from "../types";

const TypographyItemCard = (props: TypographyItemCardProps): JSX.Element => {
  const { label, title, rootClass } = props;
  return (
    <div className={`flex flex-col mb-3 pr-30-custom ${rootClass}`}>
      <Typography
        fontWeight="font-semibold"
        textColor="text-gray-custom"
        textClass="mb-1"
      >
        {title}
      </Typography>
      <Typography
        fontWeight="font-semibold"
        textColor="text-black"
        textClass="whitespace-pre-line"
      >
        {label}
      </Typography>
    </div>
  );
};

export default TypographyItemCard;
