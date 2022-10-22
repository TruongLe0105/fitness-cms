import InputDefault from "components/Input/InputDefault";
import { ReactComponent as IconFilter } from "assets/images/icons/filter.svg";
import Popup from "reactjs-popup";
import FilterItem from "./FilterItem";
import React from "react";
import SelectDefault from "components/Select/SelectDefault";
const FilterTable = (props) => {
    const { handleChangeInputSearch, search, listFilter, queryFilter, handleChangeChecked, category, placeholder, } = props;
    const onSelectChange = (data) => {
        if (category?.setFilterCategory) {
            category.setFilterCategory(data);
        }
    };
    const categories = category?.categories || [];
    const filterCategory = category?.filterCategory || [];
    // let placeholders = placeholder || 0;
    // for (let i = 0; i < placeholder?.length; i++) {
    //    placeholders = placeholder || null;
    // }
    return (<div className="flex items-center">
      {listFilter && listFilter.length ? (<Popup trigger={<div className="h-8 w-28 bg-gray-02-custom rounded-xl mr-4 flex items-center justify-center cursor-pointer">
              <IconFilter className="mr-2 h-4 w-4"/>
              <p className="font-semibold text-xs-custom text-black">Filter</p>
            </div>} arrow={false} nested>
          <div className="flex flex-col card-filter">
            {listFilter.map((el, index) => (<FilterItem dataItem={el} key={index} queryFilter={queryFilter} handleChangeChecked={handleChangeChecked}/>))}
            {"category" in props ? (<SelectDefault label="Category" labelStyle={{
                    color: "rgba(162, 171, 190)",
                    fontSize: "0.75rem",
                }} isMulti options={(categories || []).map((el) => ({
                    label: el.name,
                    value: el.id,
                }))} selectedOption={filterCategory} handleChange={onSelectChange} styleControl={{
                    marginBottom: 30,
                }}/>) : null}
          </div>
        </Popup>) : null}

      <InputDefault value={search} label='Search on' onChange={handleChangeInputSearch} placeholder={placeholder} 
    // classInput="bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom"
    classInput="bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom"/>
    </div>);
};
export default FilterTable;
