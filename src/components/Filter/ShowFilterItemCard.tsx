import { ReactComponent as IconRemove } from "assets/images/icons/remove-filter.svg";
import { getTitleFilterFitness } from "helpers/util";
import { ShowFilterItemCardProps } from "./types";

const ShowFilterItemCard = (props: ShowFilterItemCardProps): JSX.Element => {
  const { dataItem, field, handleRemoveFilter } = props;
  console.log("dataItem", dataItem);

  return (
    <div className="flex items-center h-8 card-show-filter-item mr-4">
      <p className="text-sm font-normal text-gray-06-custom mr-1">
        {getTitleFilterFitness(field)}:
      </p>
      {dataItem ?
        // ? dataItem.map((el, index) => (
        <p className="text-sm font-normal text-gray-06-custom">
          {getTitleFilterFitness(dataItem)}
          {/* ${dataItem.length > index + 1 ? ", " : ""}`} */}
        </p>
        // ))
        : null}
      <IconRemove
        className="ml-4 cursor-pointer"
        onClick={handleRemoveFilter(field)}
      />
    </div>
  );
};

export default ShowFilterItemCard;
