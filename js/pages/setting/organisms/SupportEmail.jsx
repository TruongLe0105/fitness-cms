import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import InputDefault from "components/Input/InputDefault";
import { useBoolean } from "helpers/hooks";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getSettingStringMiddleware, updateSettingStringMiddleware, } from "../services/api";
import { SettingName, SettingType } from "../types";
const SupportEmail = () => {
    const [email, setEmail] = React.useState("");
    const originalEmail = React.useRef("");
    const isLoading = useBoolean();
    const [error, setError] = React.useState("");
    React.useEffect(() => {
        isLoading.setValue(true);
        getSettingStringMiddleware(SettingType.SUPPORT_EMAIL, SettingName.SUPPORT_EMAIL, (status, value) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
                if (value) {
                    originalEmail.current = value;
                    setEmail(value);
                }
            }
            isLoading.setValue(false);
        });
    }, []);
    const handleChangeInput = (event) => {
        const newValue = event.target.value?.trim();
        if (newValue) {
            setError(validateEmail(newValue) ? "" : "Invalid email");
        }
        else
            setError("");
        setEmail(newValue);
    };
    const isDisabledButton = () => !email || originalEmail.current === email;
    const showReset = () => email !== originalEmail.current;
    const onSubmitButton = () => {
        isLoading.setValue(true);
        updateSettingStringMiddleware("support email", SettingType.SUPPORT_EMAIL, SettingName.SUPPORT_EMAIL, { value: email }, (status, res) => {
            if (status === STATUS_RESPONSE_CODE.SUCCESS && res) {
                originalEmail.current = res;
                setEmail(res);
            }
            isLoading.setValue(false);
        });
    };
    const validateEmail = (val) => {
        return val
            .toLowerCase()
            .match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/);
    };
    const onReset = () => {
        setEmail(originalEmail.current);
        setError("");
    };
    return (<div style={{
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0px 0px 5px rgb(0 0 0 / 5%)",
            padding: 20,
            marginRight: 30,
            minWidth: 400,
            maxWidth: 400,
        }}>
      <div style={{ marginBottom: 20 }}>
        <InputDefault label="Support email" required value={email} onChange={handleChangeInput}/>
        {error ? (<p style={{ fontSize: 12, color: "rgba(239, 68, 68)" }}>{error}</p>) : ("")}
      </div>
      <div style={{
            display: "flex",
            alignItems: "center",
        }}>
        <ButtonDefault widthButton="w-140-custom" disabled={isDisabledButton()} onClick={onSubmitButton} style={{
            minHeight: 37,
        }}>
          Update
        </ButtonDefault>
        {showReset() ? (<ButtonDefault widthButton="w-140-custom" onClick={onReset} buttonClass="btn-cancel ml-4">
            Reset
          </ButtonDefault>) : null}
      </div>
      {isLoading.value ? <BackdropCustomize /> : null}
    </div>);
};
export default SupportEmail;
