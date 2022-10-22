import { ReactComponent as LogoMetamask } from "assets/images/metamask-logo.svg";
import Typography from "components/Typography";

const MetamaskCard = (props: { messenger: string }): JSX.Element => {
  const { messenger } = props;
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="metamask-card p-4 w-400-custom rounded-lg flex flex-col">
        <LogoMetamask />

        <Typography
          textColor="text-black"
          fontWeight="font-normal"
          textClass="mt-4"
        >
          {messenger}
        </Typography>
      </div>
    </div>
  );
};

export default MetamaskCard;
