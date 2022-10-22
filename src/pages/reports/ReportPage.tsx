/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import DateRangesDefault from "components/DateRanges/DateRangesDefault";
import Table from "components/Table/Table";
import {
  useBoolean,
  useSelectDateRanges,
  useString,
  useTable,
} from "helpers/hooks";
import { formatDate, formatETH, showNotification } from "helpers/util";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import { getReportMiddleware } from "./services/api";
import { emptyReportDetail, ParamsReportRequest, ReportDetail } from "./types";
import { dataHeaderReport } from "./utils";
import { ReactComponent as IconRemove } from "assets/images/icons/remove-filter.svg";
import {
  definedDateRanges,
  FILED_DATE_RANGES,
} from "components/DateRanges/types";
import { sumBy } from "lodash";
import ViewDetail from "./organisms/ViewDetail";
import Axios, { CancelTokenSource } from "axios";

const ReportPage = (): JSX.Element => {
  const {
    isLoadingPage,
    handleChangePage,
    handleChangeSort,
    isLoadingTable,
    limit,
    orderBy,
    orderDirection,
    page,
    total,
  } = useTable();

  const {
    startDate,
    endDate,
    activeSelect,
    setActiveSelect,
    setEndDate,
    setStartDate,
    openFormDate,
  } = useSelectDateRanges();
  const [reports, setReports] = useState<ReportDetail[]>([]);
  const [reportDetail, setReportDetail] =
    useState<ReportDetail>(emptyReportDetail);
  const sumListingFee = useString();
  const sumDonationFee = useString();
  const isViewDetail = useBoolean();

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();
    getReport(source);
    return () => source.cancel();
  }, [startDate, endDate, orderBy.value, orderDirection.value]);

  const getReport = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsReportRequest = {
        from: formatDate(startDate, "yyyy-MM-dd"),
        to: formatDate(endDate, "yyyy-MM-dd"),
      };
      if (orderBy.value) {
        params.orderBy = orderBy.value;
        params.orderDirection = orderDirection.value;
      }
      const dataResponse = await getReportMiddleware(params, source);
      setReports(dataResponse);
      sumDonationFee.setValue(formatETH(sumBy(dataResponse, "donationFee")));
      sumListingFee.setValue(formatETH(sumBy(dataResponse, "listingFee")));
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
  const handleRemoveCustomTime = () => {
    setStartDate(definedDateRanges.startOfWeek);
    setEndDate(definedDateRanges.endOfWeek);
    setActiveSelect(FILED_DATE_RANGES.WEEK);
    isLoadingTable.setValue(true);
  };
  const handleViewDetailTable = (dataItem: any) => {
    isViewDetail.setValue(true);
    setReportDetail(dataItem);
  };
  const handleCloseViewDetail = () => {
    isViewDetail.setValue(false);
    setReportDetail(emptyReportDetail);
  };

  return (
    <PageLayout
      title="Reports"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          <div></div>
          <div className="flex items-center">
            <DateRangesDefault
              activeSelect={activeSelect}
              startDate={startDate}
              endDate={endDate}
              setActiveSelect={setActiveSelect}
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              setLoadingTablePage={isLoadingTable.setValue}
              openFormDate={openFormDate}
            />
          </div>
        </div>
      }
    >
      <div className="h-40-custom">
        <div
          className="flex items-center h-8 card-show-filter-item mr-4"
          style={{
            width: "fit-content",
          }}
        >
          <p className="text-sm font-normal text-gray-06-custom mr-1">Time:</p>
          <p className="text-sm font-normal text-gray-06-custom">
            {`${formatDate(startDate, "dd-MM-yyyy")} -> ${formatDate(
              endDate,
              "dd-MM-yyyy"
            )}`}
          </p>
          {activeSelect !== FILED_DATE_RANGES.WEEK ? (
            <IconRemove
              className="ml-4 cursor-pointer"
              onClick={handleRemoveCustomTime}
            />
          ) : null}
        </div>
      </div>
      <div className="custom-height-table-filter">
        <Table
          limit={limit.value}
          page={page.value}
          countItems={total.value}
          headers={dataHeaderReport(sumListingFee.value, sumDonationFee.value)}
          handleChangePage={handleChangePage}
          data={reports.length ? reports : []}
          handleChangeSort={handleChangeSort}
          orderBy={orderBy.value}
          orderDirection={orderDirection.value}
          isLoadingTable={isLoadingTable.value}
          hidePagination={true}
          handleViewDetailTable={handleViewDetailTable}
        />
        {isViewDetail.value ? (
          <ViewDetail
            dataItem={reportDetail}
            openPopup={isViewDetail.value}
            onClose={handleCloseViewDetail}
          />
        ) : null}
        {isLoadingPage.value ? <BackdropCustomize /> : null}
      </div>
    </PageLayout>
  );
};

export default ReportPage;
