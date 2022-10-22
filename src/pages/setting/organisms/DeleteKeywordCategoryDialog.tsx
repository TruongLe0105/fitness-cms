import IconDestroy from "assets/images/icons/destroy.svg";
import IconWarning from "assets/images/icons/warning.svg";
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { useBoolean } from "helpers/hooks";
import React from "react";

interface Props {
  openPopup: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeleteKeywordCategoryDialog = (props: Props): JSX.Element => {
  const { openPopup, onClose, onSubmit } = props;
  const isLoading = useBoolean();

  return (
    <DialogCard
      openPopup={openPopup}
      disablePopup
      handleCLoseDialog={onClose}
      title="Delete keyword category"
      childrenAction={
        <img src={IconDestroy} alt="icon" className="cursor-pointer ml-3" />
      }
    >
      <div
        className="flex items-center justify-center border rounded-lg border-red-custom mb-8 mt-4 p-3"
        style={{ padding: 20 }}
      >
        <img src={IconWarning} alt="icon" className="mr-4" />
        <Typography textColor="text-red-custom">
          This category will be unlinked with keywords. Are you sure you want to
          delete this category? Please confirm again!
        </Typography>
      </div>
      <ButtonDefault widthButton="w-140-custom" onClick={onSubmit}>
        Delete
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>
  );
};
export default DeleteKeywordCategoryDialog;
