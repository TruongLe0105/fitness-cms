import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  startOfQuarter,
  endOfQuarter,
  isSameDay,
} from "date-fns";

export const definedDateRanges = {
  startOfWeek: startOfWeek(new Date(), { weekStartsOn: 1 }),
  endOfWeek: endOfWeek(new Date(), { weekStartsOn: 1 }),
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfQuarter: startOfQuarter(new Date()),
  endOfQuarter: endOfQuarter(new Date()),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
};

export const defaultSelectionRange = {
  startDate: definedDateRanges.startOfWeek,
  endDate: definedDateRanges.endOfWeek,
  key: "selection",
};

const staticRangeHandler = {
  range: {
    startDate: new Date(),
    endDate: new Date(),
  },
  isSelected(range) {
    const definedRange = this.range;
    return (
      isSameDay(range.startDate, definedRange.startDate) &&
      isSameDay(range.endDate, definedRange.endDate)
    );
  },
};
// eslint-disable-next-line
export function createStaticRanges(ranges) {
  return ranges.map((range) => ({ ...staticRangeHandler, ...range }));
}

export enum FILED_DATE_RANGES {
  WEEK = "week",
  MONTH = "month",
  QUARTER = "quarter",
  YEAR = "year",
  CUSTOM = "custom",
}
// eslint-disable-next-line
export const staticDateRanges = createStaticRanges([
  {
    label: "This Week",
    filed: FILED_DATE_RANGES.WEEK,
    range: () => ({
      startDate: definedDateRanges.startOfWeek,
      endDate: definedDateRanges.endOfWeek,
    }),
  },

  {
    label: "This Month",
    filed: FILED_DATE_RANGES.MONTH,
    range: () => ({
      startDate: definedDateRanges.startOfMonth,
      endDate: definedDateRanges.endOfMonth,
    }),
  },

  {
    label: "This Quarter",
    filed: FILED_DATE_RANGES.QUARTER,
    range: () => ({
      startDate: definedDateRanges.startOfQuarter,
      endDate: definedDateRanges.endOfQuarter,
    }),
  },

  {
    label: "This Year",
    filed: FILED_DATE_RANGES.YEAR,
    range: () => ({
      startDate: definedDateRanges.startOfYear,
      endDate: definedDateRanges.endOfYear,
    }),
  },
]);

export interface SelectDateDetail {
  label: string;
  filed: FILED_DATE_RANGES;
  startDate: Date;
  endDate: Date;
}

export const listSelectDateRanges: SelectDateDetail[] = [
  {
    label: "This Week",
    filed: FILED_DATE_RANGES.WEEK,
    startDate: definedDateRanges.startOfWeek,
    endDate: definedDateRanges.endOfWeek,
  },

  {
    label: "This Month",
    filed: FILED_DATE_RANGES.MONTH,
    startDate: definedDateRanges.startOfMonth,
    endDate: definedDateRanges.endOfMonth,
  },

  {
    label: "This Quarter",
    filed: FILED_DATE_RANGES.QUARTER,
    startDate: definedDateRanges.startOfQuarter,
    endDate: definedDateRanges.endOfQuarter,
  },

  {
    label: "This Year",
    filed: FILED_DATE_RANGES.YEAR,
    startDate: definedDateRanges.startOfYear,
    endDate: definedDateRanges.endOfYear,
  },
  {
    label: "Custom",
    filed: FILED_DATE_RANGES.CUSTOM,
    startDate: new Date(),
    endDate: new Date(),
  },
];

export interface DateRangesDefaultProps {
  startDate: Date;
  endDate: Date;
  setStartDate: (newStartDate: Date) => void;
  setEndDate: (newEndDate: Date) => void;
  activeSelect: string;
  setActiveSelect: (newSelect: string) => void;
  setLoadingTablePage: (newLoading: boolean) => void;
  openFormDate: {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
