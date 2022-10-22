import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import React, { useEffect, useState } from "react";
import FilterTable from "components/Filter/FilterTable";
import { ListRewardSelectHistory, TYPE_REFERRAL_CODE, } from "./types";
import { getReferralCodeHistoryMiddleware, getReferralCodeRewardMiddleware, } from "./services/api";
import { dataHeaderReferralCodeHistory, dataHeaderReferralCodeWard, } from "./utils";
import SelectDefault from "components/Select/SelectDefault";
import MenuReferralCode from "./molecules/MenuReferralCode";
import { ORDER_DIRECTION } from "types";
import Axios from "axios";
import { showNotification } from "helpers/util";
const ReferralCodePage = () => {
    const [referralCodeHistories, setReferralCodeHistories] = useState([]);
    const [referralCodeRewards, setReferralCodeRewards] = useState([]);
    const [rewardSelectHistory, setRewardSelectHistory] = useState(ListRewardSelectHistory[0]);
    const { handleChangeInputSearch, handleChangePage, limit, orderBy, orderDirection, page, search, searchParamRequest, total, handleChangeSort, isLoadingPage, isLoadingTable, } = useTable();
    const [activeMenu, setActiveMenu] = useState({
        index: 0,
        field: TYPE_REFERRAL_CODE.HISTORY,
    });
    useEffect(() => {
        const source = Axios.CancelToken.source();
        if (activeMenu.field === TYPE_REFERRAL_CODE.HISTORY) {
            getReferralCodeHistory(source);
        }
        else {
            getReferralCodeReward(source);
        }
        return () => source.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        page.value,
        searchParamRequest.value,
        orderBy.value,
        orderDirection.value,
        rewardSelectHistory.value,
        activeMenu.field,
    ]);
    const getReferralCodeHistory = async (source) => {
        try {
            const params = {
                limit: limit.value,
                page: page.value,
                search: searchParamRequest.value,
                reward: rewardSelectHistory.value,
            };
            if (orderBy.value) {
                params.orderBy = orderBy.value;
                params.orderDirection = orderDirection.value;
            }
            const dataRes = await getReferralCodeHistoryMiddleware(params, source);
            total.setValue(dataRes ? dataRes.total : 0);
            setReferralCodeHistories(dataRes ? dataRes.items : []);
            cleanStateRequest();
        }
        catch (error) {
            if (!Axios.isCancel(error)) {
                cleanStateRequest();
                showNotification("error", "Server Error");
            }
        }
    };
    const getReferralCodeReward = async (source) => {
        try {
            const params = {
                limit: limit.value,
                page: page.value,
                search: searchParamRequest.value,
            };
            if (orderBy.value) {
                params.orderBy = orderBy.value;
                params.orderDirection = orderDirection.value;
            }
            const dataRes = await getReferralCodeRewardMiddleware(params, source);
            total.setValue(dataRes ? dataRes.total : 0);
            setReferralCodeRewards(dataRes ? dataRes.items : []);
            cleanStateRequest();
        }
        catch (error) {
            if (!Axios.isCancel(error)) {
                cleanStateRequest();
            }
        }
    };
    const cleanStateRequest = () => {
        isLoadingPage.setValue(false);
        isLoadingTable.setValue(false);
    };
    const handleChangeSelect = (selected) => {
        setRewardSelectHistory(selected);
    };
    const handleChangeMenu = (newIndex, newField) => () => {
        setActiveMenu({
            index: newIndex,
            field: newField,
        });
        limit.setValue(10);
        page.setValue(1);
        orderBy.setValue("createdAt");
        orderDirection.setValue(ORDER_DIRECTION.DESC);
        search.setValue("");
        searchParamRequest.setValue("");
        isLoadingPage.setValue(true);
    };
    return (<PageLayout title="Referral Code" childrenAction={<div className="flex items-center justify-between h-full pr-8">
          <MenuReferralCode active={activeMenu.index} handleChangeMenu={handleChangeMenu}/>
          <div className="flex items-center">
            {activeMenu.field === TYPE_REFERRAL_CODE.HISTORY ? (<SelectDefault options={ListRewardSelectHistory} selectedOption={rewardSelectHistory} handleChange={handleChangeSelect} filed="name" rootClasses="mr-3 custom-select-param bg-gray-02-custom rounded-xl pl-4 border-0 font-medium text-xs-custom" styleSingleValue={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 12,
                    maxWidth: "inherit",
                }} styleControl={{
                    borderBottom: "none",
                }}/>) : null}
            <FilterTable search={search.value} handleChangeInputSearch={handleChangeInputSearch}/>
          </div>
        </div>}>
      {activeMenu.field === TYPE_REFERRAL_CODE.HISTORY ? (<Table limit={limit.value} page={page.value} countItems={total.value} headers={dataHeaderReferralCodeHistory()} handleChangePage={handleChangePage} data={referralCodeHistories.length ? referralCodeHistories : []} handleChangeSort={handleChangeSort} orderBy={orderBy.value} orderDirection={orderDirection.value} isLoadingTable={isLoadingTable.value}/>) : (<Table limit={limit.value} page={page.value} countItems={total.value} headers={dataHeaderReferralCodeWard()} handleChangePage={handleChangePage} data={referralCodeRewards.length ? referralCodeRewards : []} handleChangeSort={handleChangeSort} orderBy={orderBy.value} orderDirection={orderDirection.value} isLoadingTable={isLoadingTable.value}/>)}

      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>);
};
export default ReferralCodePage;
