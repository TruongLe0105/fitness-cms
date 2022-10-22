import CheckedDefault from "components/Checked/CheckedDefault";
import { includes } from "lodash";
const FilterItem = (props) => {
    const { dataItem, queryFilter, handleChangeChecked } = props;
    return (<div className="flex flex-col mb-8">
      <p className="text-xs font-medium text-gray-04-custom mb-2">
        {dataItem.title}
      </p>
      <div className="flex">
        {dataItem.listChecked.length
            ? dataItem.listChecked.map((elChecked, index) => (<div className="flex items-center mr-8" key={index}>
                <CheckedDefault style={{
                    width: 20,
                    height: 20,
                }} onClick={handleChangeChecked &&
                    handleChangeChecked(dataItem.filed, elChecked.filed)} checked={queryFilter
                    ? includes(queryFilter[dataItem.filed], elChecked.filed)
                    : false}/>
                <p className="text-sm font-medium text-black ml-2">
                  {elChecked.name}
                </p>
              </div>))
            : null}
      </div>
    </div>);
};
export default FilterItem;
