import DialogCard from "components/Dialog/DialogCard";
import { DialogCardProps } from "components/Dialog/types";
import React from "react";
import IconWarning from "assets/images/icons/warning.svg";
import ButtonDefault from "components/Button/ButtonDefault";

interface Props extends DialogCardProps {
  onSubmit: () => void;
}
const DialogWarning: React.FC<Props> = ({
  onSubmit,
  handleCLoseDialog,
  children,
  ...restProps
}) => {
  return (
    <DialogCard handleCLoseDialog={handleCLoseDialog} {...restProps}>
      <div className="flex items-center justify-center p-3 border rounded-lg border-red-custom mb-8 mt-4">
        <img src={IconWarning} alt="icon" className="mr-4" />
        {children}
      </div>
      <div className="flex gap-5 justify-end">
        <ButtonDefault
          style={{ background: "#eb5757", fontWeight: "bold" }}
          widthButton="w-140-custom"
          onClick={() => onSubmit()}
        >
          Yes, delete it
        </ButtonDefault>
      </div>
    </DialogCard>
  );
};

export default DialogWarning;
