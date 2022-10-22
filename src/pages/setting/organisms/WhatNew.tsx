import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import InputDefault from "components/Input/InputDefault";
import { useBoolean } from "helpers/hooks";
import { cloneDeep, compact, uniq } from "lodash";
import { isValidLink } from "pages/manage-versions/utils";
import React from "react";
import { STATUS_RESPONSE_CODE } from "types";
import {
  getSettingStringMiddleware,
  updateSettingStringMiddleware,
} from "../services/api";
import { SettingName, SettingType } from "../types";

const WhatNew = () => {
  const [urls, setUrls] = React.useState<string[]>([]);
  const items = React.useRef<string[]>([]);
  const isLoading = useBoolean();

  const handleParseValue = (value: string) => {
    if (value) {
      const newValue = value.split(",");
      setUrls([...newValue, ""]);
      items.current = [...newValue, ""];
    } else {
      setUrls([""]);
      items.current = [""];
    }
  };

  React.useEffect(() => {
    isLoading.setValue(true);
    getSettingStringMiddleware(
      SettingType.WHAT_NEW,
      SettingName.WHAT_NEW,
      (status, value) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          handleParseValue(value);
        }
        isLoading.setValue(false);
      }
    );
  }, []);

  const onSubmit = (url: string, idx: number, cb: () => void) => {
    isLoading.setValue(true);
    const body = cloneDeep(urls);
    body[idx] = url;
    updateSettingStringMiddleware(
      "what's new url",
      SettingType.WHAT_NEW,
      SettingName.WHAT_NEW,
      { value: compact(uniq(body)).join(",") },
      (status, res) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          handleParseValue(res);
        }
        isLoading.setValue(false);
        cb();
      }
    );
  };

  // const onChange = (value, idx) => {
  //   const newUrls: string[] = cloneDeep(urls);
  //   newUrls[idx] = value;
  //   setUrls(newUrls);
  // };

  const onDelete = (value: string) => {
    const newUrls = cloneDeep(urls).filter((el) => el !== value);
    isLoading.setValue(true);
    updateSettingStringMiddleware(
      "what's new url",
      SettingType.WHAT_NEW,
      SettingName.WHAT_NEW,
      { value: compact(uniq(newUrls)).join(",") },
      (status, res) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          handleParseValue(res);
        }
        isLoading.setValue(false);
      }
    );
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 20,
        boxShadow: "0px 0px 5px rgb(0 0 0 / 5%)",
        padding: 20,
        marginRight: 30,
        minWidth: 700,
        maxWidth: 700,
      }}
    >
      {urls.map((url, idx) => (
        <WhatNewInput
          key={url}
          index={idx}
          defaultUrl={items.current[idx] || ""}
          value={url}
          //onChange={(value) => onChange(value, idx)}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      ))}
      {isLoading.value ? <BackdropCustomize /> : null}
    </div>
  );
};

export default WhatNew;

interface Props {
  index: number;
  defaultUrl: string;
  value: string;
  //onChange: (value) => void;
  onSubmit: (text: string, index: number, cb: () => void) => void;
  onDelete: (value: string) => void;
}

const WhatNewInput = (props: Props) => {
  const { index, defaultUrl, value, onSubmit, onDelete } = props;
  const [text, setText] = React.useState(value);
  React.useEffect(() => {
    setText(value);
  }, [value]);

  const [error, setError] = React.useState("");

  const handleChangeInput = (e) => {
    const url = e.target.value;
    if (url) {
      setError(isValidLink(url) ? "" : "Invalid link");
    } else {
      setError("");
    }
    setText(url);
  };

  const handleSubmit = () => {
    onSubmit(text, index, () => setText(""));
  };
  const onReset = () => {
    setText(defaultUrl);
    setError("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 30,
      }}
    >
      <div style={{ flexGrow: 1, width: 0 }}>
        <InputDefault
          label="URL"
          required
          value={text}
          onChange={handleChangeInput}
          rootStyle={{
            width: "100%",
          }}
        />
        {error ? (
          <p style={{ fontSize: 12, color: "rgba(239, 68, 68)" }}>{error}</p>
        ) : (
          ""
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 20,
        }}
      >
        {defaultUrl || text ? (
          <>
            <ButtonDefault
              style={{ width: 75 }}
              disabled={!text.trim() || text.trim() === defaultUrl || !!error}
              onClick={handleSubmit}
            >
              Save
            </ButtonDefault>
            <ButtonDefault
              style={{ width: 75, marginLeft: 5, marginRight: 5 }}
              disabled={text.trim() === defaultUrl}
              onClick={onReset}
            >
              Reset
            </ButtonDefault>

            <ButtonDefault
              style={{ width: 75 }}
              disabled={!defaultUrl}
              onClick={() => onDelete(defaultUrl)}
            >
              Delete
            </ButtonDefault>
          </>
        ) : null}
      </div>
    </div>
  );
};
