import { ReactComponent as IconHistory } from "assets/images/icons/history.svg";
import Tooltip from "components/Tooltip";
import Typography from "components/Typography";
import {
  formatDate,
  onRedirectTestnet,
  showFullNameOwnerStar,
} from "helpers/util";
import { HashLoader } from "react-spinners";
import { HistoryDefaultCardProps } from "./types";
const HistoryDefaultCard = (props: HistoryDefaultCardProps): JSX.Element => {
  const { dataItem, headerTable, isLoading } = props;
  const headers = headerTable
    ? headerTable
    : ["Purchase Date", "Username", "TXHASH"];

  return (
    <div className="flex flex-col card-info-star p-4 mt-8 bg-active-tooltip relative">
      <div
        data-tip
        data-for="icon-history"
        className="w-35-custom h-35-custom rounded-full bg-green-04-custom flex items-center justify-center "
      >
        <IconHistory className="icon-history w-20-custom h-20-custom" />
        <Tooltip id="icon-history" text="HISTORY" />
      </div>
      <div>
        <div className="h-50-custom border-b border-gray-02-custom grid grid-cols-history">
          {headers.map((header, ind) => (
            <div key={ind} className=" px-4 flex items-center ">
              <Typography
                variant="h6"
                textColor="text-black"
                fontWeight="font-semibold"
              >
                {header}
              </Typography>
            </div>
          ))}
        </div>
        {dataItem.length
          ? dataItem.map((el, index) => (
              <div
                key={index}
                className={`h-50-custom grid  grid-cols-history ${
                  index < dataItem.length - 1
                    ? "border-b border-gray-02-custom"
                    : ""
                }`}
              >
                <div className="px-4 flex items-center ">
                  <Typography
                    textColor="text-black-04-custom"
                    fontWeight="font-normal"
                  >
                    {el.ownerBoughtAt ? formatDate(el.ownerBoughtAt) : null}
                  </Typography>
                </div>

                <div className="px-4 flex items-center ">
                  <Typography
                    textColor="text-black-04-custom"
                    fontWeight="font-normal"
                  >
                    {el.owner ? showFullNameOwnerStar(el.owner) : null}
                  </Typography>
                </div>
                <div className="px-4 flex items-center ">
                  <Typography
                    textColor="text-primary-custom"
                    fontWeight="font-normal"
                  >
                    <span
                      onClick={onRedirectTestnet(el.txHash)}
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 1,
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                      }}
                      className="work-break-custom whitespace-pre-line cursor-pointer hover:underline outline-none-custom"
                    >
                      {el.txHash}
                    </span>
                  </Typography>
                </div>
              </div>
            ))
          : null}
      </div>
      {isLoading ? (
        <div
          className="absolute bg-white w-full h-full flex items-center justify-center opacity-30 top-0"
          style={{
            borderRadius: 20,
          }}
        >
          <HashLoader color="#57B8FF" loading={true} size={50} />
        </div>
      ) : null}
    </div>
  );
};

export default HistoryDefaultCard;
