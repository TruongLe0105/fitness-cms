import { STATUS_EVENT } from "./types";

const StatusEventCard = (props: { status: string }): JSX.Element => {
  const { status } = props;

  const renderStyleStatusEvent = () => {
    switch (status) {
      case STATUS_EVENT.ACTIVATING:
        return {
          background: `bg-green-04-custom`,
          text: "text-green-custom",
        };
      case STATUS_EVENT.ENDED:
        return {
          background: `bg-primary-04-custom`,
          text: "text-primary-04-custom",
        };
      default:
        return {
          background: `bg-gray-04-custom`,
          text: "gray-custom",
        };
    }
  };

  return (
    <div
      className={`pl-2 pr-2 h-23-custom ${
        renderStyleStatusEvent().background
      } rounded flex justify-center items-center`}
    >
      <p className={`${renderStyleStatusEvent().text}  font-semibold text-xs`}>
        {status}
      </p>
    </div>
  );
};

export default StatusEventCard;
