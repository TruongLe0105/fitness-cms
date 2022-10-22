import ShowFilterItemCard from "./ShowFilterItemCard";
const ShowFilterCard = (props) => {
    const { dataFilter, handleRemoveFilter } = props;
    return (<div className="flex items-center">
      {dataFilter.length
            ? dataFilter
                .filter((el) => el.dataItem.length)
                .map((filter, index) => (<ShowFilterItemCard key={index} dataItem={filter.dataItem} field={filter.field} handleRemoveFilter={handleRemoveFilter}/>))
            : null}
      {dataFilter.filter((el) => el.dataItem.length).length ? (<p className="text-sm font-normal text-gray-06-custom cursor-pointer	" onClick={handleRemoveFilter("Clear all")}>
          Clear all
        </p>) : null}
    </div>);
};
export default ShowFilterCard;
