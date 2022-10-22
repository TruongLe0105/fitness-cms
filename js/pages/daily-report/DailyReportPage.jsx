import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import { getDailyReportMiddleware } from "./services/api";
import { dataHeaderUser } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import Axios from "axios";
import { showNotification } from "helpers/util";
import SelectDefault from "components/Select/SelectDefault";
const DailyReportPage = () => {
    const [dailyReport, setDailyReport] = useState([]);
    const { handleChangeInputSearch, handleChangePage, limit, orderBy, orderDirection, page, search, searchParamRequest, total, handleChangeSort, isLoadingPage, isLoadingTable, } = useTable();
    useEffect(() => {
        const source = Axios.CancelToken.source();
        getDailyReport(source);
        return () => source.cancel();
    }, [
        page.value,
        // searchParamRequest.value,
        orderBy.value,
    ]);
    const getDailyReport = async (source) => {
        try {
            const params = {
                limit: limit.value,
                page: page.value,
                // search: searchParamRequest.value,
            };
            if (orderBy.value) {
                params.sort = orderBy.value;
            }
            const dataRes = await getDailyReportMiddleware(params, source);
            if (dataRes?.data?.length) {
                setDailyReport(dataRes.data);
                total.setValue(dataRes.total);
            }
            cleanStateRequest();
        }
        catch (error) {
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
    return (<PageLayout title="Daily Report" childrenAction={<div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
            <div>
              <span>Point level</span>
              <SelectDefault label="" options={ListPointSelect} selectedOption={pointSelect} handleChange={handleChangePointSelect} filed="name" rootClasses="mr-3 custom-select-param bg-gray-02-custom rounded-xl pl-4 border-0 font-medium text-xs-custom" styleSingleValue={{
                display: "flex",
                alignItems: "center",
                fontSize: 12,
                maxWidth: "inherit",
            }} styleControl={{
                borderBottom: "none",
            }}/>
            </div>

            <FilterTable placeholder="Wallet Address" search={search.value} handleChangeInputSearch={handleChangeInputSearch}/>
          </div>
        </div>}>
      <Table limit={limit.value} page={page.value} countItems={total.value} headers={dataHeaderUser()} handleChangePage={handleChangePage} data={dailyReport.length ? dailyReport : []} handleChangeSort={handleChangeSort} orderBy={orderBy.value} orderDirection={orderDirection.value} isLoadingTable={isLoadingTable.value}/>
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>);
};
export default DailyReportPage;
