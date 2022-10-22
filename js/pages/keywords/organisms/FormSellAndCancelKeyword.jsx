/* eslint-disable @typescript-eslint/no-explicit-any */
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { useBoolean } from "helpers/hooks";
import { STATUS_RESPONSE_CODE } from "types";
import { cancelSellKeywordMiddleware, sellKeywordMiddleware, } from "../services/api";
const FormSellAndCancelKeyword = (props) => {
    const { dataItem, openForm, onClose, updateListKeyword } = props;
    const isLoading = useBoolean();
    const onSubmitButton = async () => {
        isLoading.setValue(true);
        const idKeywords = dataItem.keywords.map((el) => el.id);
        if (dataItem.keyForm === "sell") {
            sellKeywordMiddleware(idKeywords, (status) => {
                isLoading.setValue(false);
                if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                    updateListKeyword();
                    onClose();
                }
            });
            return;
        }
        cancelSellKeywordMiddleware(idKeywords, (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                updateListKeyword();
                onClose();
            }
        });
    };
    return (<DialogCard openPopup={openForm} disablePopup handleCLoseDialog={onClose} title={dataItem.title}>
      <div className="p-2 bg-green-custom text-center mb-8 mt-8 rounded-xl">
        <Typography textColor="text-white" fontWeight="font-medium">
          {dataItem.label}
        </Typography>
      </div>
      <div className="flex items-center justify-between">
        <ButtonDefault widthButton="w-140-custom" onClick={onSubmitButton}>
          Submit
        </ButtonDefault>
        <ButtonDefault onClick={onClose} widthButton="w-140-custom" buttonClass="btn-cancel">
          Cancel
        </ButtonDefault>
      </div>

      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default FormSellAndCancelKeyword;
