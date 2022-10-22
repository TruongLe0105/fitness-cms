/* eslint-disable @typescript-eslint/no-explicit-any */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { KEYWORD_CONTRACT_ADDRESS } from "config/environments";
import { increaseAllowance } from "helpers/blockchain";
import { useBoolean } from "helpers/hooks";
import { showNotification } from "helpers/util";
import { useAppSelector } from "slices/store";
import { STATUS_RESPONSE_CODE } from "types";
import { FormIncreaseAllowanceProps } from "../types";

const FormIncreaseAllowance = (
  props: FormIncreaseAllowanceProps
): JSX.Element => {
  const { dataItem, openForm, onClose } = props;
  const account = useAppSelector((state) => state.auth.accountWeb3.account);
  const isLoading = useBoolean();

  const onSubmitButton = async () => {
    if (!account) {
      showNotification("success", "Account not found!");
      return;
    }
    isLoading.setValue(true);
    await increaseAllowance(
      KEYWORD_CONTRACT_ADDRESS,
      dataItem.allowanceValue,
      account,
      (status: STATUS_RESPONSE_CODE) => {
        isLoading.setValue(false);
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          onClose();
        }
      }
    );
  };

  return (
    <DialogCard
      openPopup={openForm}
      disablePopup
      handleCLoseDialog={onClose}
      title="Increase Allowance"
    >
      <div className="p-2 bg-green-custom text-center mb-8 mt-8 rounded-xl">
        <Typography textColor="text-white" fontWeight="font-medium">
          You don't have enough allowance for the Keyword contract address. Do
          you want to increase allowance first?
        </Typography>
      </div>
      <div className="flex items-center justify-between">
        <ButtonDefault widthButton="w-140-custom" onClick={onSubmitButton}>
          Submit
        </ButtonDefault>
        <ButtonDefault
          onClick={onClose}
          widthButton="w-140-custom"
          buttonClass="btn-cancel"
        >
          Cancel
        </ButtonDefault>
      </div>

      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>
  );
};
export default FormIncreaseAllowance;
