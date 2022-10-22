import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import CheckedDefault from "components/Checked/CheckedDefault";
import InputDefault from "components/Input/InputDefault";
import { useBoolean } from "helpers/hooks";
import { isValidLink } from "pages/manage-versions/utils";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import {
  getSettingStringMiddleware,
  updateSettingStringMiddleware,
} from "../services/api";
import { SettingName, SettingType, SettingVersionInput } from "../types";

interface Props {
  name: SettingName;
}

const defaultInputs = {
  name: "",
  link: "",
  versionCode: 0,
  buildNumber: 0,
  isRequired: true,
};

const Version = (props: Props) => {
  const { name } = props;
  const isAndroid = name === SettingName.ANDROID_VERSION;
  const item = React.useRef<SettingVersionInput>(defaultInputs);
  const [error, setError] = React.useState("");

  const [inputs, setInputs] =
    React.useState<SettingVersionInput>(defaultInputs);
  const isLoading = useBoolean();

  React.useEffect(() => {
    isLoading.setValue(true);
    getSettingStringMiddleware(SettingType.VERSION, name, (status, value) => {
      if (status === STATUS_RESPONSE_CODE.SUCCESS && value) {
        if (value) {
          try {
            const newValue = JSON.parse(value);
            item.current = newValue;
            setInputs(newValue);
          } catch (err) {
            console.log("Invalid setting value");
          }
        }
      }
      isLoading.setValue(false);
    });
  }, []);

  const handleChangeInput =
    (key: "name" | "link" | "versionCode" | "buildNumber") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value?.trim();
      if (key === "link") {
        if (newValue) {
          setError(isValidLink(newValue) ? "" : "Invalid link");
        } else {
          setError("");
        }
      }
      setInputs({
        ...inputs,
        [key]: newValue,
      });
    };

  const isDisabledButton = () => {
    const {
      name: versionName,
      link,
      versionCode,
      buildNumber,
      isRequired,
    } = inputs;
    if (
      !versionName ||
      !link ||
      !(isAndroid ? versionCode : buildNumber) ||
      error
    )
      return true;

    const oldValue = item.current;
    if (oldValue) {
      if (
        versionName === oldValue.name &&
        link === oldValue.link &&
        isRequired === oldValue.isRequired &&
        (isAndroid
          ? versionCode === oldValue.versionCode
          : buildNumber === oldValue.buildNumber)
      )
        return true;
    }

    return false;
  };

  const showReset = () => {
    const {
      name: versionName,
      link,
      versionCode,
      buildNumber,
      isRequired,
    } = inputs;

    const oldValue = item.current;
    if (
      versionName !== oldValue?.name ||
      link !== oldValue?.link ||
      isRequired !== oldValue?.isRequired ||
      (isAndroid
        ? versionCode !== oldValue?.versionCode
        : buildNumber !== oldValue?.buildNumber)
    ) {
      return true;
    }

    return false;
  };

  const onSubmitButton = () => {
    const value: Partial<SettingVersionInput> = {
      name: inputs.name,
      link: inputs.link,
      isRequired: inputs.isRequired,
    };
    if (isAndroid) {
      value.versionCode = inputs.versionCode;
    } else {
      value.buildNumber = inputs.buildNumber;
    }

    isLoading.setValue(true);
    updateSettingStringMiddleware(
      "version",
      SettingType.VERSION,
      name,
      { value: JSON.stringify(value) },
      (status, res) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && res) {
          try {
            const newValue = JSON.parse(res);
            item.current = newValue;
            setInputs(newValue);
          } catch (err) {
            console.log("Invalid setting value");
          }
        }
        isLoading.setValue(false);
      }
    );
  };

  const onReset = () => {
    setInputs(item.current || defaultInputs);
    setError("");
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        boxShadow: "0px 0px 5px rgb(0 0 0 / 5%)",
        padding: 20,
        marginRight: 30,
        minWidth: 400,
      }}
    >
      <p style={{ fontWeight: 600, marginBottom: 40 }}>
        {isAndroid ? "Android" : "iOS"}
      </p>
      <InputDefault
        label="Name"
        required
        value={inputs.name}
        onChange={handleChangeInput("name")}
        inputStyle={{ marginBottom: 20 }}
      />
      <div style={{ marginBottom: 20 }}>
        <InputDefault
          label="Link"
          required
          value={inputs.link}
          onChange={handleChangeInput("link")}
        />
        {error ? (
          <p style={{ fontSize: 12, color: "rgba(239, 68, 68)" }}>{error}</p>
        ) : (
          ""
        )}
      </div>
      <InputDefault
        label={isAndroid ? "Version code" : "Build number"}
        required
        value={(isAndroid ? inputs.versionCode : inputs.buildNumber) || ""}
        onChange={handleChangeInput(isAndroid ? "versionCode" : "buildNumber")}
        inputStyle={{ marginBottom: 20 }}
        type="number"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <CheckedDefault
          title="Required update"
          checked={inputs.isRequired}
          onClick={() =>
            setInputs({
              ...inputs,
              isRequired: !inputs.isRequired,
            })
          }
        />
        <p
          style={{
            color: "rgba(161, 169, 180)",
            fontSize: 14,
            fontWeight: 600,
            marginLeft: 5,
          }}
        >
          Required update
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ButtonDefault
          widthButton="w-140-custom"
          disabled={isDisabledButton()}
          onClick={onSubmitButton}
          style={{
            minHeight: 37,
          }}
        >
          Update
        </ButtonDefault>
        {showReset() ? (
          <ButtonDefault
            widthButton="w-140-custom"
            onClick={onReset}
            buttonClass="btn-cancel ml-4"
          >
            Reset
          </ButtonDefault>
        ) : null}
      </div>
      {isLoading.value ? <BackdropCustomize /> : null}
    </div>
  );
};

const SettingVersion = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-star",
        flexWrap: "wrap",
      }}
    >
      <Version name={SettingName.ANDROID_VERSION} />
      <Version name={SettingName.IOS_VERSION} />
    </div>
  );
};

export default SettingVersion;
