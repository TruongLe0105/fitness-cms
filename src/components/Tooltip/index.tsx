import ReactTooltip, { TooltipProps } from "react-tooltip";

type Props = TooltipProps & {
  text?: string;
  id?: string;
};
const Tooltip = ({ text, id, ...restProps }: Props) => {
  return (
    <ReactTooltip
      id={id}
      type="success"
      effect="solid"
      arrowColor="transparent"
      className="bg-primary-custom"
      {...restProps}
    >
      <p className="text-white font-normal text-xs">{text}</p>
    </ReactTooltip>
  );
};

export default Tooltip;
