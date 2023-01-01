import {
  definedDateRanges,
  FILED_DATE_RANGES,
} from "components/DateRanges/types";
import { FiledFilterItem, QueryFilterProps, QueryFilterPropsFitness } from "components/Filter/types";
import { cloneDeep, debounce, includes, remove, throttle } from "lodash";
// import { KeywordCategory } from "pages/keywords/types";
// import {} from "pages/stars/types";
import React, { useCallback, useEffect, useState } from "react";
import { ORDER_DIRECTION } from "types";

// eslint-disable-next-line
export const useScrollToHash = () => {
  useEffect(() => {
    const hashEl = document.getElementById(window.location.hash.slice(1));
    if (hashEl) {
      hashEl.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);
  return null;
};
// eslint-disable-next-line
export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return null;
};
// eslint-disable-next-line
export const useWindowSize = () => {
  const [size, setSize] = useState<{
    height: number;
    width: number;
  }>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const updateSize = throttle(
    () => {
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    },
    500,
    {
      leading: false,
      trailing: true,
    }
  );

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
};
// eslint-disable-next-line
export function useBoolean(defaultValue = false) {
  return useDefault<boolean>(defaultValue);
}
// eslint-disable-next-line
export function useNumber(defaultValue = 0) {
  return useDefault<number>(defaultValue);
}
// eslint-disable-next-line
export function useString(defaultValue = "") {
  return useDefault<string>(defaultValue);
}

// eslint-disable-next-line
export function useDefault<T = any>(defaultValue: T) {
  const [value, setValue] = useState(defaultValue);
  return { value, setValue };
}
// eslint-disable-next-line
export const useTable = (
  defaultOrderBy = "created_at",
  defaultOrderDirection = ORDER_DIRECTION.DESC,
  defaultLimit = 20,
  defaultPage = 1
) => {
  const limit = useNumber(defaultLimit);
  const page = useNumber(defaultPage);
  const searchParamRequest = useString();
  const search = useString();
  const total = useNumber(0);
  const orderBy = useString(defaultOrderBy);
  const orderDirection = useString(defaultOrderDirection);
  const isLoadingPage = useBoolean(true);
  const isLoadingTable = useBoolean(false);

  const handleChangePage = (newPage: number) => {
    isLoadingTable.setValue(true);
    page.setValue(newPage);
  };
  const handleChangeInputSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    debounceSearch(String(event.target.value).trim());
    search.setValue(event.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((newSearch: string) => {
      searchParamRequest.setValue(newSearch);
      page.setValue(1);
      isLoadingTable.setValue(true);
    }, 500),
    []
  );

  const handleChangeSort =
    (newOrderby: string, newOrderDirection: string) => () => {
      if (newOrderby === orderBy.value) {
        const orderPrefix = orderBy.value.includes("-") ? "" : "-";
        orderBy.setValue(`${orderPrefix}${newOrderby}`);
        isLoadingTable.setValue(true);
        return;
      }

      if (newOrderDirection === ORDER_DIRECTION.NO) {
        orderBy.setValue("");
        isLoadingTable.setValue(true);

        return;
      }

      orderBy.setValue(newOrderby);
      orderDirection.setValue(newOrderDirection);
      isLoadingTable.setValue(true);
    };

  return {
    limit,
    page,
    searchParamRequest,
    search,
    total,
    orderBy,
    orderDirection,
    handleChangePage,
    handleChangeInputSearch,
    handleChangeSort,
    isLoadingPage,
    isLoadingTable,
  };
};

// eslint-disable-next-line
export const useFilter = (
  page: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  },
  isLoadingTable: {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  }
  // setFilterCategory?: (value: KeywordCategory[]) => void
) => {
  const [filter, setFilter] = useState<QueryFilterProps>({
    market_status: [],
    types: [],
    owner_status: [],
    link_with_star: [],
    tokens: [], //treasure page
  });

  const handleChangeCheckedFilter =
    (filedTitle: string, filedChecked: string) => () => {
      const newFilter = cloneDeep(filter[filedTitle] ?? "");
      if (includes(newFilter, filedChecked)) {
        remove(newFilter, (el) => el === filedChecked);
      } else {
        newFilter.push(filedChecked);
      }
      setFilter({
        ...filter,
        [filedTitle]: newFilter,
      });
      handleChangePage();
    };

  const handleRemoveFilter = (filedTitle: string) => () => {
    if (filedTitle === "Clear all") {
      setFilter({
        market_status: [],
        types: [],
        owner_status: [],
        link_with_star: [],
        tokens: [], //treasure page
      });
      // setFilterCategory?.([]);
      handleChangePage();
      return;
    }

    // if (filedTitle === FiledFilterItem.CATEGORY) {
    //   setFilterCategory?.([]);
    // } else {
    setFilter({
      ...filter,
      [filedTitle]: [],
    });
    // }

    handleChangePage();
  };

  const handleChangePage = () => {
    isLoadingTable.setValue(true);
    if (page.value > 1) {
      page.setValue(1);
    }
  };

  return {
    filter,
    handleChangeCheckedFilter,
    handleRemoveFilter,
  };
};
// eslint-disable-next-line
export const useFilterFitness = (
  page: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  },
  isLoadingTable: {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  }
  // setFilterCategory?: (value: KeywordCategory[]) => void
) => {
  const [filterFitness, setFilterFitness] = useState<QueryFilterPropsFitness>({
    client_status: "",
    gyms_status: "",
    package_status: "",
  });

  const handleChangeCheckedFilterFitness =
    (filedTitle: string, filedChecked: string) => () => {
      console.log("filedTitle", filedTitle);
      console.log("filedChecked", filedChecked);

      const newFilter = cloneDeep(filterFitness[filedTitle] ?? "");

      // if (includes(newFilter, filedChecked)) {
      //   remove(newFilter, (el) => el === filedChecked);
      // } else {
      //   newFilter.push(filedChecked);
      // }

      setFilterFitness({
        ...filterFitness,
        [filedTitle]: filedChecked,
      });
      handleChangePageFitness();
    };

  const handleRemoveFilterFitness = (filedTitle: string) => () => {
    if (filedTitle === "Clear all") {
      setFilterFitness({
        client_status: "",
      });
      // setFilterCategory?.([]);
      handleChangePageFitness();
      return;
    }

    // if (filedTitle === FiledFilterItem.CATEGORY) {
    //   setFilterCategory?.([]);
    // } else {
    setFilterFitness({
      ...filterFitness,
      [filedTitle]: "",
    });
    // }

    handleChangePageFitness();
  };

  const handleChangePageFitness = () => {
    isLoadingTable.setValue(true);
    if (page.value > 1) {
      page.setValue(1);
    }
  };

  return {
    filterFitness,
    handleChangeCheckedFilterFitness,
    handleRemoveFilterFitness
  };
};

// eslint-disable-next-line
export const useSelectDateRanges = () => {
  const [startDate, setStartDate] = useState(definedDateRanges.startOfWeek);
  const [endDate, setEndDate] = useState(definedDateRanges.endOfWeek);
  const [activeSelect, setActiveSelect] = useState<string>(
    FILED_DATE_RANGES.WEEK
  );
  const openFormDate = useBoolean();

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    activeSelect,
    setActiveSelect,
    openFormDate,
  };
};
