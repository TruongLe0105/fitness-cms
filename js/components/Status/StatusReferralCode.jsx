import { STATUS_REFERRAL_CODE } from "./types";
const StatusReferralCode = (props) => {
    const { status } = props;
    const renderStyleStatusEvent = () => {
        switch (status) {
            case STATUS_REFERRAL_CODE.CLAIMED:
                return {
                    background: `bg-green-04-custom`,
                    text: "text-green-custom",
                };
            case STATUS_REFERRAL_CODE.CLAIMING:
                return {
                    background: `bg-orange-02-custom`,
                    text: "text-orange-custom",
                };
            default:
                return {
                    background: `bg-gray-04-custom`,
                    text: "gray-custom",
                };
        }
    };
    return (<div className={`pl-2 pr-2 h-23-custom ${renderStyleStatusEvent().background} rounded flex justify-center items-center`}>
      <p className={`${renderStyleStatusEvent().text}  font-semibold text-xs`}>
        {status}
      </p>
    </div>);
};
export default StatusReferralCode;
