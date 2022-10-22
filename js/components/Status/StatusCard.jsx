const StatusCard = (props) => {
    const { status, active } = props;
    return (<div className={`pl-2 pr-2 h-23-custom ${status === active ? "bg-green-04-custom" : "bg-primary-04-custom"} rounded flex justify-center items-center`}>
      <p className={`${status === active ? "text-green-custom" : "text-primary-04-custom"}  font-semibold text-xs`}>
        {status}
      </p>
    </div>);
};
export default StatusCard;
