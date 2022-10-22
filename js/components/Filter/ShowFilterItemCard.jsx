import { ReactComponent as IconRemove } from "assets/images/icons/remove-filter.svg";
import { getTitleFilter } from "helpers/util";
const ShowFilterItemCard = (props) => {
    const { dataItem, field, handleRemoveFilter } = props;
    return (<div className="flex items-center h-8 card-show-filter-item mr-4">
      <p className="text-sm font-normal text-gray-06-custom mr-1">
        {getTitleFilter(field)}:
      </p>
      {dataItem.length
            ? dataItem.map((el, index) => (<p key={index} className="text-sm font-normal text-gray-06-custom">
              {`${getTitleFilter(el)}${dataItem.length > index + 1 ? "," : ""}`}
            </p>))
            : null}
      <IconRemove className="ml-4 cursor-pointer" onClick={handleRemoveFilter(field)}/>
    </div>);
};
export default ShowFilterItemCard;
