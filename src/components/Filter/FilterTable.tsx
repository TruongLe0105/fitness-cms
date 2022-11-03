import InputDefault from "components/Input/InputDefault";
import { FilterTableProps } from "./types";
import { ReactComponent as IconFilter } from "assets/images/icons/filter.svg";
import Popup from "reactjs-popup";
import FilterItem from "./FilterItem";
import React from "react";
import SelectDefault from "components/Select/SelectDefault";
// import { KeywordCategory } from "pages/keywords/types";
import { PLACEHOLDER_INPUT } from "components/Input/types";

const FilterTable = (props: FilterTableProps): JSX.Element => {
  const {
    handleChangeInputSearch,
    search,
    listFilter,
    queryFilter,
    handleChangeChecked,
    // category,
    placeholder,
  } = props;

  // const onSelectChange = (data: KeywordCategory[]) => {
  //   if (category?.setFilterCategory) {
  //     category.setFilterCategory(data);
  //   }
  // };

  // const categories = category?.categories || [];
  // const filterCategory = category?.filterCategory || [];

  // let placeholders = placeholder || 0;
  // for (let i = 0; i < placeholder?.length; i++) {
  //    placeholders = placeholder || null;
  // }

  return (
    <div className="flex items-center">
      {listFilter && listFilter.length ? (
        <Popup
          trigger={
            <div className="h-8 w-28 bg-gray-02-custom rounded-xl mr-4 flex items-center justify-center cursor-pointer">
              <IconFilter className="mr-2 h-4 w-4" />
              <p className="font-semibold text-xs-custom text-black">Filter</p>
            </div>
          }
          arrow={false}
          nested
        >
          <div className="flex flex-col card-filter">
            {listFilter.map((el, index) => (
              <FilterItem
                dataItem={el}
                key={index}
                queryFilter={queryFilter}
                handleChangeChecked={handleChangeChecked}
              />
            ))}
          </div>
        </Popup>
      ) : null}

      <InputDefault
        value={search}
        label="Search on"
        onChange={handleChangeInputSearch}
        placeholder={placeholder}
        // classInput="bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom"
        classInput="bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom"
      />
    </div>
  );
};
export default FilterTable;
