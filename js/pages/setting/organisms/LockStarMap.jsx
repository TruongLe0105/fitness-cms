import ButtonDefault from "components/Button/ButtonDefault";
import { useString } from "helpers/hooks";
import { useEffect } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingMiddleware, updateSettingMiddleware } from "../services/api";
import { SettingName, SettingType } from "../types";
import { ReactComponent as LockIcon } from "assets/images/icons/lock.svg";
import Typography from "components/Typography";
export const LockStarMap = ({ isLoading }) => {
    const lockStarStatus = useString("0");
    useEffect(() => {
        getLockStarStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleLockStar = () => {
        updateSettingMiddleware(lockStarStatus.value === "0" ? "lock star" : "unlock star", SettingType.LOCK_STAR, SettingName.LOCK_STAR, {
            value: lockStarStatus.value === "0" ? 1 : 0,
        }, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                lockStarStatus.setValue(value);
            }
            isLoading.setValue(false);
        });
    };
    const getLockStarStatus = async () => {
        getSettingMiddleware(SettingType.LOCK_STAR, SettingName.LOCK_STAR, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                lockStarStatus.setValue(value);
            }
            isLoading.setValue(false);
        });
    };
    return (<ButtonDefault widthButton="w-130-custom" buttonClass="bg-primary" onClick={handleLockStar}>
      <LockIcon className={`w-18-custom h-18-custom mr-2 icon-white-color`}/>
      <Typography fontWeight="font-semibold" textColor="text-white" textClass="text-xs">
        {lockStarStatus.value === "0" ? "Lock star" : "Unlock star"}
      </Typography>
    </ButtonDefault>);
};
