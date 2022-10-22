import ReactTooltip from "react-tooltip";
const Tooltip = ({ text, id, ...restProps }) => {
    return (<ReactTooltip id={id} type="success" effect="solid" arrowColor="transparent" className="bg-primary-custom" {...restProps}>
      <p className="text-white font-normal text-xs">{text}</p>
    </ReactTooltip>);
};
export default Tooltip;
