import DialogCard from "./DialogCard";
import IconDestroy from "assets/images/icons/destroy.svg";
import IconWarning from "assets/images/icons/warning.svg";
import Typography from "components/Typography";
import ButtonDefault from "components/Button/ButtonDefault";
import { STATUS_RESPONSE_CODE } from "types";
import { deleteMiddleware } from "./services/api";
import BackdropCustomize from "components/BackdropCustomize";
import { useBoolean } from "helpers/hooks";
const DestroyDialog = (props) => {
    const { url, label, message, handleUpdateWhenDestroy, onClose, openPopup } = props;
    const isLoading = useBoolean();
    const onSubmitDestroy = () => {
        isLoading.setValue(true);
        deleteMiddleware(url, message, (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                handleUpdateWhenDestroy();
                onClose();
            }
        });
    };
    return (<DialogCard openPopup={openPopup} disablePopup handleCLoseDialog={onClose} title={label} childrenAction={<img src={IconDestroy} alt="icon" className="cursor-pointer ml-3"/>}>
      <div className="flex items-center justify-center border rounded-lg border-red-custom mb-8 mt-4 p-3">
        <img src={IconWarning} alt="icon" className="mr-4"/>
        <Typography textColor="text-red-custom">
          Caution. This action can not undo.
        </Typography>
      </div>
      <ButtonDefault widthButton="w-140-custom" onClick={onSubmitDestroy}>
        Destroy
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default DestroyDialog;
