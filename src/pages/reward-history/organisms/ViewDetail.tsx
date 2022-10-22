import DialogCard from "components/Dialog/DialogCard";
import { formatDate } from "helpers/util";
import { upperCase } from "lodash";
import TypographyItemCard from "../molecules/TypographyItemCard";
import { ViewDetailNotificationProps } from "../types";

const ViewDetail = (props: ViewDetailNotificationProps): JSX.Element => {
  const { dataItem, onClose, openPopup } = props;
  return (
    <DialogCard
      openPopup={openPopup}
      handleCLoseDialog={onClose}
      disablePopup
      title="View detail notification"
      rootStyle={{
        width: 600,
        paddingRight: 0,
      }}
      classAction="pr-30-custom"
    >
      <div className="flex flex-col overflow-auto max-height-view-notification">
        <TypographyItemCard title="Name" label={dataItem.name} />
        <TypographyItemCard title="Description" label={dataItem.description} />
        <TypographyItemCard title="Type" label={upperCase(dataItem.type)} />
        {dataItem.startDate ? (
          <TypographyItemCard
            title="Schedule-Timeline"
            label={formatDate(dataItem.startDate, "dd MMM yyyy, HH:mm:ss a")}
          />
        ) : null}
      </div>
    </DialogCard>
  );
};
export default ViewDetail;
