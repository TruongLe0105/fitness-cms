/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { ReactComponent as IconNameRegister } from "assets/images/icons/name-register.svg";
import InputDefault from "components/Input/InputDefault";
import { useBoolean, useString } from "helpers/hooks";
import IconEdit from "assets/images/icons/edit-fee.svg";
import IconSave from "assets/images/icons/save-fee.svg";
import IconCancel from "assets/images/icons/cancel-fee.svg";
import BackdropCustomize from "components/BackdropCustomize";
import { updateNameRegisterStarMiddleware } from "../services/api";
import { STATUS_RESPONSE_CODE } from "types";
const FormChangeNameRegister = (props) => {
    const { rootClass, idStar, oldNameRegister, updateStarDetailWhenUpdateNameRegister, } = props;
    const updateName = useBoolean();
    const valueInput = useString("");
    const isLoading = useBoolean();
    useEffect(() => {
        valueInput.setValue(oldNameRegister);
    }, [oldNameRegister]);
    const handleOpenForm = (value) => () => {
        updateName.setValue(value);
        if (!value) {
            valueInput.setValue(oldNameRegister);
        }
    };
    const handleChangeInput = (event) => {
        valueInput.setValue(event.target.value);
    };
    const onSave = async () => {
        isLoading.setValue(true);
        updateNameRegisterStarMiddleware(idStar, {
            name: valueInput.value,
        }, (status) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                updateStarDetailWhenUpdateNameRegister(valueInput.value);
                updateName.setValue(false);
            }
        });
    };
    return (<div className={`flex flex-col w-250-custom ${rootClass ?? "mt-8"}`}>
      <div className="flex flex-col p-4 card-info-star relative">
        <div className="flex items-center">
          <div className="w-35-custom h-35-custom rounded-full bg-primary-04-custom flex items-center justify-center">
            <IconNameRegister className="icon-name-register w-20-custom h-20-custom"/>
          </div>
          <p className="text-primary-04-custom font-medium text-xs ml-3">
            UPDATE DISPLAY NAME
          </p>
        </div>

        <div className="flex items-center h-full card-donation-fee custom-disable-input-set-cost mt-4">
          {updateName.value ? (<InputDefault autoFocus value={valueInput.value} maxLength={20} onChange={handleChangeInput}/>) : (<div className="h-8 border-b flex items-center">
              <p className="text-black font-semibold text-sm text-black-04-custom">
                {valueInput.value}
              </p>
            </div>)}

          <div className="flex justify-end ">
            {updateName.value ? (<React.Fragment>
                <img src={IconSave} alt="icon" className="cursor-pointer mr-2" onClick={onSave}/>
                <img src={IconCancel} onClick={handleOpenForm(false)} alt="icon" className="cursor-pointer"/>
              </React.Fragment>) : (<img src={IconEdit} onClick={handleOpenForm(true)} alt="icon" className="cursor-pointer"/>)}
          </div>
        </div>
      </div>
      {isLoading.value ? <BackdropCustomize /> : null}
    </div>);
};
export default FormChangeNameRegister;
