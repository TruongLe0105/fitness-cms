import Typography from "components/Typography";
import React, { useEffect } from "react";
import Popup from "reactjs-popup";
import IconClose from "assets/images/icons/close.svg";
import { useBoolean, useString } from "helpers/hooks";
import BackdropCustomize from "components/BackdropCustomize";
import InputEditor from "components/Input/InputEditor";
import ButtonDefault from "components/Button/ButtonDefault";
import { updateSettingLegalMiddleware } from "../services/api";
import { STATUS_RESPONSE_CODE } from "types";
import draftToHtmlPuri from "draftjs-to-html";
const FormUpdate = (props) => {
    const { openPopup, handleClosePopup, title, valueInput, field, handleUpdateData, } = props;
    const isLoading = useBoolean();
    const valueEditor = useString();
    useEffect(() => {
        valueEditor.setValue(valueInput);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueInput]);
    const handleChangeEditor = (description) => {
        valueEditor.setValue(description);
    };
    const onSubmit = () => {
        if (valueInput === valueEditor.value) {
            return;
        }
        // isLoading.setValue(true);
        const htmlPuri = draftToHtmlPuri(JSON.parse(valueEditor.value));
        updateSettingLegalMiddleware(field, title, {
            value: htmlPuri,
        }, (status, dataRes) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
                handleUpdateData(dataRes);
                handleClosePopup();
            }
            console.log(status);
        });
    };
    return (<React.Fragment>
      <Popup className="root-form-update-legal-page" modal open={openPopup} closeOnDocumentClick={false}>
        <div className="view-dialog-body-form-update-legal-page-content">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Typography variant="h3" fontWeight="font-bold" textColor="text-primary-custom">
                {title}
              </Typography>
            </div>

            <img src={IconClose} alt="icon" className="cursor-pointer" onClick={handleClosePopup}/>
          </div>
          <div className="flex flex-col p-4 card-info-star">
            <div className="flex justify-center mb-8">
              <InputEditor value={valueEditor.value} setValue={handleChangeEditor}/>
            </div>
          </div>
          <ButtonDefault widthButton="w-140-custom mt-3" onClick={onSubmit}>
            Update
          </ButtonDefault>
        </div>
      </Popup>
      {isLoading.value ? <BackdropCustomize /> : null}
    </React.Fragment>);
};
export default FormUpdate;
