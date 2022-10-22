import ButtonDefault from "components/Button/ButtonDefault";
import MultipleInput from "components/Input/Multiple";
import Popup from "reactjs-popup";
import { UpdateStatusStarProps } from "../types";
import StatusStarCard from "./StatusStarCard";

const UpdateStatusStar = (props: UpdateStatusStarProps): JSX.Element => {
  const {
    popupUpdateRef,
    oldStatus,
    newStatus,
    handleChangeStatus,
    handleClosePopupUpdateStatus,
    onSubmitUpdateStatus,
  } = props;
  return (
    <Popup
      ref={popupUpdateRef}
      trigger={
        <div>
          <StatusStarCard title={oldStatus} isUpdate={true} />
        </div>
      }
      closeOnDocumentClick={false}
      arrow={false}
      position="bottom left"
      nested
    >
      <div
        className="flex flex-col card-edit-popup"
        style={{
          width: 300,
        }}
      >
        <MultipleInput
          label="Status"
          rootClass="mb-6"
          rows={2}
          value={newStatus}
          onChange={handleChangeStatus}
        />
        <div className="flex justify-between items-center">
          <ButtonDefault
            disabled={!newStatus || oldStatus === newStatus}
            widthButton="w-60-custom"
            heightButton="h-30-custom"
            onClick={onSubmitUpdateStatus}
          >
            Update
          </ButtonDefault>
          <ButtonDefault
            onClick={handleClosePopupUpdateStatus}
            widthButton="w-60-custom"
            heightButton="h-30-custom"
            buttonClass="btn-cancel"
          >
            Cancel
          </ButtonDefault>
        </div>
      </div>
    </Popup>
  );
};
export default UpdateStatusStar;
