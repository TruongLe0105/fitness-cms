import DialogCard from "components/Dialog/DialogCard";
import Typography from "components/Typography";
import { formatDate } from "helpers/util";
import TypographyItemCard from "../molecules/TypographyItemCard";
import { ViewDetailEventProps } from "../types";

const ViewDetail = (props: ViewDetailEventProps): JSX.Element => {
  const { dataItem, onClose, openPopup } = props;
  return (
    <DialogCard
      openPopup={openPopup}
      handleCLoseDialog={onClose}
      disablePopup
      title={dataItem.name}
      rootStyle={{
        width: 800,
        paddingRight: 0,
      }}
      classAction="pr-30-custom"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "359px calc(100% - 359px)",
        }}
      >
        <div
          className={`h-460-custom w-327-custom rounded-lg flex items-center justify-center relative bg-no-repeat bg-center bg-cover`}
          style={{
            backgroundImage: `url(${dataItem.url})`,
          }}
        />
        <div
          className="h-460-custom"
          style={{
            overflow: "auto",
          }}
        >
          {dataItem.description ? (
            <TypographyItemCard
              title="Description"
              label={dataItem.description}
            />
          ) : null}

          {dataItem.target ? (
            <div className="mb-3 pr-30-custom">
              <Typography
                fontWeight="font-semibold"
                textColor="text-gray-custom"
                textClass="mb-1"
              >
                Target URL
              </Typography>

              <a
                href={
                  dataItem.target.indexOf("http")
                    ? `//${dataItem.target}`
                    : dataItem.target
                }
                target="_blank"
                className="work-break-custom font-semibold text-sm text-black whitespace-pre-line hover:text-primary-custom cursor-pointer hover:underline custom-link"
              >
                {dataItem.target}
              </a>
            </div>
          ) : null}

          <TypographyItemCard
            title="Start date"
            label={formatDate(dataItem.startDate, "dd MMM yyyy, HH:mm:ss a")}
          />
          <TypographyItemCard
            title="End date"
            label={formatDate(dataItem.endDate, "dd MMM yyyy, HH:mm:ss a")}
          />
        </div>
      </div>
    </DialogCard>
  );
};
export default ViewDetail;
