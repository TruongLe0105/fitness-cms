import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import {
  DailyStatistic,
  ParamsRequest,
  SingleGameHistoryDetail,
} from "./types";
import {
  getDailyReportMiddleware,
  getFullDailyReportMiddleware,
} from "./services/api";
import { dataHeaderUser } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import Axios, { CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";
import DatePickers from "components/DatePicker/DatePicker";

import SelectDefault from "components/Select/SelectDefault";
import ButtonDefault from "components/Button/ButtonDefault";
import { downloadExcel } from "services/xlsx";
import moment from "moment";

const DailyReportPage = (): JSX.Element => {
  const [dailyReport, setDailyReport] = useState<DailyStatistic[]>([]);
  const [fullDailyReport, setFullDailyReport] = useState<DailyStatistic[]>([]);
  const [fromDate, setFromDate] = useState<number>(
    moment(new Date()).startOf("day").valueOf() +
      1000 * 60 * 60 * 10 -
      1000 * 60 * 60 * 24
  );
  const [toDate, setToDate] = useState<number>(
    moment(new Date()).startOf("day").valueOf() + 1000 * 60 * 60 * 10
  );

  const {
    handleChangeInputSearch,
    handleChangePage,
    limit,
    orderBy,
    orderDirection,
    page,
    search,
    searchParamRequest,
    total,
    handleChangeSort,
    isLoadingPage,
    isLoadingTable,
  } = useTable();

  function onStartDateChange(value: number) {
    const formatStartDate =
      moment(value).startOf("day").valueOf() + 1000 * 60 * 60 * 10;
    setFromDate(formatStartDate);
  }
  function onEndDateChange(value: number) {
    const formatEndDate =
      moment(value).startOf("day").valueOf() + 1000 * 60 * 60 * 10;
    setToDate(formatEndDate);
  }

  useEffect(() => {
    isLoadingTable.setValue(true);
    const source: CancelTokenSource = Axios.CancelToken.source();

    getDailyReport(source);
    return () => source.cancel();
  }, [page.value, searchParamRequest.value, orderBy.value, fromDate, toDate]);

  const getDailyReport = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
        from: fromDate,
        to: toDate,
        pagination: 1,
        // search: searchParamRequest.value,
      };
      const fullParams: ParamsRequest = {
        from: fromDate,
        to: toDate,
        limit: limit.value,
        page: page.value,
        pagination: 0,
        // search: searchParamRequest.value,
      };
      // if (orderBy.value) {
      //   params.sort = orderBy.value;
      // }

      const [dataRes, dataResFull] = await Promise.all([
        getDailyReportMiddleware(params, source),
        getFullDailyReportMiddleware(fullParams, source),
      ]);

      if (dataRes?.data?.length) {
        setDailyReport(dataRes.data);
        setFullDailyReport(dataResFull.data);

        total.setValue(dataRes.total);
      }
      console.log("ádasdasdasds");

      cleanStateRequest();
    } catch (error) {
      if (!Axios.isCancel(error)) {
        cleanStateRequest();
        showNotification("error", "Server Error");
      }
    }
  };

  const cleanStateRequest = () => {
    isLoadingPage.setValue(false);
    isLoadingTable.setValue(false);
  };

  return (
    <PageLayout
      title="Daily Report"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
            <FilterTable
              placeholder="Wallet Address"
              search={search.value}
              handleChangeInputSearch={handleChangeInputSearch}
            />
            <DatePickers
              from={fromDate}
              to={toDate}
              onStartDateChange={onStartDateChange}
              onEndDateChange={onEndDateChange}
            />
          </div>
          <ButtonDefault
            onClick={() => downloadExcel(fullDailyReport)}
            widthButton="w-40"
          >
            {" "}
            Export !
          </ButtonDefault>
        </div>
      }
    >
      <Table
        limit={limit.value}
        page={page.value}
        countItems={total.value}
        headers={dataHeaderUser()}
        handleChangePage={handleChangePage}
        data={dailyReport.length ? dailyReport : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>
  );
};

export default DailyReportPage;
