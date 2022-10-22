/* eslint-disable @typescript-eslint/no-explicit-any */
import DialogCard from "components/Dialog/DialogCard";
import { format } from "date-fns";
import React from "react";
import { FormDialogProps } from "../interfaces";

const ViewDialog = (props: FormDialogProps): JSX.Element => {
  const { openPopup, onClose, item } = props;
  const version = item?.version;
  const publishedDate = item?.publishedDate;
  const description = item?.description;

  return (
    <DialogCard
      openPopup={openPopup}
      disablePopup
      handleCLoseDialog={onClose}
      title={`Version ${version} - ${format(
        new Date(publishedDate!),
        "dd MMM yyyy"
      )}`}
      rootStyle={{
        width: "40vw",
      }}
    >
      <div
        style={{
          maxHeight: "75vh",
          overflow: "auto",
          paddingRight: 10,
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <p style={{ marginBottom: 5, color: "#000000", fontWeight: 600 }}>
            Android Link:
          </p>
          <p>{item?.androidLink || ""}</p>
        </div>
        <div style={{ marginBottom: 20 }}>
          <p style={{ marginBottom: 5, color: "#000000", fontWeight: 600 }}>
            IOS Link:
          </p>
          <p>{item?.iosLink || ""}</p>
        </div>
        <p style={{ marginBottom: 5, color: "#000000", fontWeight: 600 }}>
          Description:{" "}
        </p>
        <p
          dangerouslySetInnerHTML={{
            __html: description || "",
          }}
        />
      </div>
    </DialogCard>
  );
};
export default ViewDialog;
