import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import {
  DateRangesDefaultProps,
  definedDateRanges,
  FILED_DATE_RANGES,
  listSelectDateRanges,
  SelectDateDetail,
  staticDateRanges,
} from "./types";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Popup from "reactjs-popup";
import ButtonDefault from "components/Button/ButtonDefault";

const DateRangesDefault = (props: DateRangesDefaultProps): JSX.Element => {
  const {
    activeSelect,
    endDate,
    setActiveSelect,
    setEndDate,
    setStartDate,
    startDate,
    setLoadingTablePage,
    openFormDate,
  } = props;
  const [selectionRange, setSelectionRange] = useState({
    key: "selection",
    startDate: definedDateRanges.startOfWeek,
    endDate: definedDateRanges.endOfWeek,
  });

  const onChangeDate = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const handleChangeDateRanges = (value: SelectDateDetail) => () => {
    setActiveSelect(value.filed);
    if (value.filed === FILED_DATE_RANGES.CUSTOM) {
      openFormDate.setValue(true);
      setSelectionRange({
        ...selectionRange,
        startDate: startDate,
        endDate: endDate,
      });
      return;
    }
    setStartDate(value.startDate);
    setEndDate(value.endDate);
    setLoadingTablePage(true);
  };

  const handleCloseFormDate = () => {
    openFormDate.setValue(false);
    setSelectionRange({
      ...selectionRange,
      startDate: startDate,
      endDate: endDate,
    });
  };
  const handleSubmitDate = () => {
    setStartDate(selectionRange.startDate);
    setEndDate(selectionRange.endDate);
    openFormDate.setValue(false);
    setLoadingTablePage(true);
  };

  return (
    <div className="h-8 bg-gray-02-custom rounded-xl px-4 flex items-center justify-center cursor-pointer">
      {listSelectDateRanges.length
        ? listSelectDateRanges.map((el, index) => (
            <div
              className="relative flex items-center justify-center h-full"
              key={index}
              onClick={handleChangeDateRanges(el)}
            >
              <p
                className={`font-semibold text-xs-custom ${
                  activeSelect === el.filed
                    ? "text-black-02-custom"
                    : "text-gray-custom"
                } px-3`}
              >
                {el.label}
              </p>
              {activeSelect === el.filed ? (
                <div
                  className="h-3-custom bg-primary-bold-custom rounded-sm absolute bottom-0"
                  style={{
                    width: "calc(100% - 40px)",
                  }}
                />
              ) : null}
            </div>
          ))
        : null}
      <Popup
        trigger={<div></div>}
        open={openFormDate.value}
        arrow={false}
        nested
        position="bottom right"
        onClose={handleCloseFormDate}
        offsetX={20}
        offsetY={15}
      >
        <div className="flex flex-col card-date-range">
          <DateRangePicker
            onChange={onChangeDate}
            editableDateInputs={true}
            dateDisplayFormat="dd-MM-yyyy"
            inputRanges={[]}
            ranges={[selectionRange]}
            rangeColors={["#57B8FF"]}
            staticRanges={staticDateRanges}
          />
          <div className="flex justify-end items-center mt-3">
            <ButtonDefault
              widthButton="w-60-custom"
              heightButton="h-30-custom"
              onClick={handleSubmitDate}
            >
              Submit
            </ButtonDefault>
            <ButtonDefault
              widthButton="w-60-custom"
              heightButton="h-30-custom"
              buttonClass="btn-cancel ml-3"
              onClick={handleCloseFormDate}
            >
              Cancel
            </ButtonDefault>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default DateRangesDefault;
