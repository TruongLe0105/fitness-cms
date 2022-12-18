import IconDestroy from "assets/images/icons/destroy.svg";
import IconWarning from "assets/images/icons/warning.svg";
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { useBoolean } from "helpers/hooks";
import React from "react";
import { deleteConvenience } from "../services/api";
import { ConvenienceDetail } from "../types";

interface Props {
    openPopup: boolean;
    onClose: () => void;
    item: ConvenienceDetail | null;
    onRefetch?: () => void;
}

const DestroyDialog = (props: Props): JSX.Element => {
    const { openPopup, onClose, item, onRefetch } = props;
    const isLoading = useBoolean();

    const onSubmitDestroy = () => {
        if (item) {
            isLoading.setValue(true);
            deleteConvenience(item.id, () => {
                isLoading.setValue(false);
                onClose();
                onRefetch?.();
            });
        }
    };

    return (
        <DialogCard
            openPopup={openPopup}
            disablePopup
            handleCLoseDialog={onClose}
            title="Delete Convenience"
            childrenAction={
                <img src={IconDestroy} alt="icon" className="cursor-pointer ml-3" />
            }
        >
            <div className="flex items-center justify-center border rounded-lg border-red-custom mb-8 mt-4 p-3">
                <img src={IconWarning} alt="icon" className="mr-4" />
                <Typography textColor="text-red-custom">
                    Caution. This action can not undo.
                </Typography>
            </div>
            <ButtonDefault widthButton="w-140-custom" onClick={onSubmitDestroy}>
                Delete
            </ButtonDefault>
            {isLoading.value ? <BackdropCustomize /> : null}
        </DialogCard>
    );
};
export default DestroyDialog;
