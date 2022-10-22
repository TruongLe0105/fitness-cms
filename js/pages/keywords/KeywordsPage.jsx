/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useFilter, useNumber, useString, useTable, } from "helpers/hooks";
import { cloneDeep } from "lodash";
import PageLayout from "pages/layout/organisms/PageLayout";
import React, { useEffect, useState } from "react";
import { defaultEmptySystemKeywordDetail, } from "./types";
import { getKeywordCategoryMiddleware, getSystemKeywordMiddleware, } from "./services/api";
import { dataHeaderKeyword, filterKeyword } from "./utils";
import FormImport from "./organisms/FormImport";
import FormChange from "./organisms/FormChange";
import FilterTable from "components/Filter/FilterTable";
import ButtonDefault from "components/Button/ButtonDefault";
import DestroyDialog from "components/Dialog/DestroyDialog";
import FormIncreaseAllowance from "./organisms/FormIncreaseAllowance";
import FormSetCost from "./organisms/FormSetCost";
import FormSellAndCancelKeyword from "./organisms/FormSellAndCancelKeyword";
import { showNotification } from "helpers/util";
import ShowFilterCard from "components/Filter/ShowFilterCard";
import { FiledFilterItem } from "components/Filter/types";
import ViewKeyword from "./organisms/ViewKeyword";
import Axios from "axios";
import { pushTo } from "helpers/history";
import { PATH } from "helpers/constant";
import { TYPE_SETTING } from "pages/setting/types";
const KeywordsPage = () => {
    const [systemKeywords, setSystemKeywords] = useState([]);
    const openFormChange = useBoolean();
    const openDestroy = useBoolean();
    const openViewKeyword = useBoolean();
    const [dataFormChange, setDataFormChange] = useState(defaultEmptySystemKeywordDetail);
    const openFormIncreaseAllowance = useBoolean();
    const allowanceValue = useNumber();
    const checkedAll = useBoolean();
    const [selectKeyword, setSelectKeyword] = useState([]);
    const [selectMultipleKeyword, setSelectMultipleKeyword] = useState([]);
    const openFormSetCost = useBoolean();
    const openMultipleSetCost = useBoolean();
    const defaultMintCost = useString();
    const openFormSell = useBoolean();
    const openFormCallSell = useBoolean();
    const openFormMultipleSell = useBoolean();
    const openFormMultipleCallSell = useBoolean();
    const openFormImport = useBoolean();
    const { handleChangeInputSearch, handleChangePage, limit, orderBy, orderDirection, page, search, searchParamRequest, total, handleChangeSort, isLoadingPage, isLoadingTable, } = useTable();
    const [filterCategory, setFilterCategory] = React.useState([]);
    const { filter, handleChangeCheckedFilter, handleRemoveFilter } = useFilter(page, isLoadingTable, setFilterCategory);
    useEffect(() => {
        const source = Axios.CancelToken.source();
        getSystemKeyword(source);
        return () => source.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        page.value,
        searchParamRequest.value,
        orderBy.value,
        orderDirection.value,
        filter,
        filterCategory,
    ]);
    const [categories, setCategories] = React.useState([]);
    React.useEffect(() => {
        const getKeywordCategories = async () => {
            const rs = await getKeywordCategoryMiddleware();
            rs.push({ id: -1, name: "Other", hide: false });
            setCategories(rs);
        };
        getKeywordCategories();
    }, []);
    const getSystemKeyword = async (source) => {
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
            if (filter.owner_status?.length) {
                params.owner_status = filter.owner_status;
            }
            if (filter.market_status?.length) {
                params.market_status = filter.market_status;
            }
            if (filter.link_with_star?.length) {
                params.link_with_star = filter.link_with_star;
            }
            if (filter.types?.length) {
                params.types = filter.types;
            }
            if (filterCategory?.length) {
                params.categories = filterCategory.map((el) => el.value);
            }
            const dataRes = await getSystemKeywordMiddleware(params, source);
            total.setValue(dataRes ? dataRes.total : 0);
            setSystemKeywords(dataRes ? dataRes.items : []);
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
        checkedAll.setValue(false);
        isLoadingPage.setValue(false);
        isLoadingTable.setValue(false);
        setSelectKeyword([]);
        setSelectMultipleKeyword([]);
    };
    const handleUpdateList = (dataRes) => {
        if (dataRes) {
            const newKeywords = cloneDeep(systemKeywords);
            const index = newKeywords.findIndex((keyword) => keyword.id === dataRes?.id);
            if (index > -1) {
                newKeywords[index] = dataRes;
                setSystemKeywords(newKeywords);
            }
            return;
        }
        updateListKeyword();
    };
    const handleOpenPopupAddKeyword = async () => {
        openFormChange.setValue(true);
        setDataFormChange(defaultEmptySystemKeywordDetail);
    };
    const handleOpenUpdateList = (key, dataRes) => async () => {
        if (key === "viewKeyword") {
            openViewKeyword.setValue(true);
            setDataFormChange(dataRes);
            return;
        }
        if (dataRes.nftId) {
            return;
        }
        setDataFormChange(dataRes);
        switch (key) {
            case "edit":
                if (dataRes.onMarket) {
                    return;
                }
                openFormChange.setValue(true);
                break;
            case "delete":
                if (dataRes.onMarket) {
                    return;
                }
                openDestroy.setValue(true);
                break;
            case "cost":
                if (dataRes.onMarket) {
                    return;
                }
                changeSetCostKeyword(dataRes);
                break;
            case "sell":
                changeSellKeyword(dataRes);
                break;
            case "cancel":
                changeCallSellKeyword(dataRes);
                break;
        }
    };
    const onCloseFormIncreaseAllowance = () => {
        allowanceValue.setValue(0);
        openFormIncreaseAllowance.setValue(false);
    };
    const handleChangeChecked = (key, newChecked, newIndex) => () => {
        if (key === "all") {
            checkedAll.setValue(!newChecked);
            const newData = cloneDeep(systemKeywords).map((el) => {
                return {
                    ...el,
                    checked: !newChecked,
                };
            });
            setSelectMultipleKeyword(newData.filter((el) => el.checked && !el.nftId));
            setSystemKeywords(newData);
            return;
        }
        const newSystem = cloneDeep(systemKeywords);
        newSystem[newIndex].checked = !newChecked;
        setSystemKeywords(newSystem);
        setSelectMultipleKeyword(newSystem.filter((el) => el.checked && !el.nftId));
        checkedAll.setValue(newSystem.find((el) => !el.checked && !el.nftId) ? false : true);
    };
    const changeSetCostKeyword = async (dataRes) => {
        // const isCheck = await checkConnectMetamask();
        // if (isCheck) {
        setSelectKeyword([dataRes]);
        openFormSetCost.setValue(true);
        // }
    };
    const handleCloseFormSetCost = () => {
        openFormSetCost.setValue(false);
        getClearFunction();
    };
    const handleChangeMultipleSetCosts = async () => {
        // const isCheck = await checkConnectMetamask();
        // if (isCheck) {
        setSelectMultipleKeyword(systemKeywords.filter((el) => el.checked && !el.nftId));
        openMultipleSetCost.setValue(true);
        // }
    };
    const updateListKeyword = (data) => {
        if (data?.length) {
            const newData = cloneDeep(systemKeywords).map((item) => {
                const existed = data.find((el) => el.id === item.id);
                return {
                    ...item,
                    mintPrice: existed ? existed.price : item.mintPrice,
                };
            });
            setSystemKeywords(newData);
            return;
        }
        isLoadingTable.setValue(true);
        if (page.value > 1) {
            page.setValue(1);
            return;
        }
        getSystemKeyword();
    };
    const handleCloseFormSellKeyword = () => {
        openFormSell.setValue(false);
        getClearFunction();
    };
    const changeSellKeyword = (dataRes) => {
        setSelectKeyword([dataRes]);
        openFormSell.setValue(true);
    };
    const changeCallSellKeyword = (dataRes) => {
        setSelectKeyword([dataRes]);
        openFormCallSell.setValue(true);
    };
    const handleCloseFormCancelSellKeyword = () => {
        openFormCallSell.setValue(false);
        getClearFunction();
    };
    const getClearFunction = () => {
        setDataFormChange(defaultEmptySystemKeywordDetail);
        setSelectKeyword([]);
    };
    const handleChangeMultipleSell = () => {
        setSelectMultipleKeyword(systemKeywords.filter((el) => el.checked && !el.nftId));
        openFormMultipleSell.setValue(true);
    };
    const handleChangeMultipleCancelSell = () => {
        setSelectMultipleKeyword(systemKeywords.filter((el) => el.checked && !el.nftId));
        openFormMultipleCallSell.setValue(true);
    };
    const handleCloseViewKeyword = () => {
        openViewKeyword.setValue(false);
        setDataFormChange(defaultEmptySystemKeywordDetail);
    };
    return (<PageLayout title="Keywords" childrenAction={<div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
            <ButtonDefault widthButton="w-140-custom" onClick={handleOpenPopupAddKeyword}>
              Add keyword
            </ButtonDefault>
            <ButtonDefault widthButton="w-140-custom ml-2" onClick={() => openFormImport.setValue(true)}>
              Import
            </ButtonDefault>

            <ButtonDefault widthButton="w-140-custom ml-2" onClick={() => pushTo(PATH.settings, {}, {
                value: TYPE_SETTING.SET_KEYWORD_CATEGORY,
            })}>
              Keyword Categories
            </ButtonDefault>

            {selectMultipleKeyword.length ? (<React.Fragment>
                <ButtonDefault widthButton="w-140-custom ml-2" onClick={handleChangeMultipleSetCosts}>
                  Multiple Set Price
                </ButtonDefault>
                <ButtonDefault widthButton="w-140-custom ml-2" onClick={handleChangeMultipleSell}>
                  Multiple Sell
                </ButtonDefault>
                <ButtonDefault widthButton="w-140-custom ml-2" onClick={handleChangeMultipleCancelSell}>
                  Multiple Cancel Sell
                </ButtonDefault>
              </React.Fragment>) : null}
          </div>
          <FilterTable search={search.value} listFilter={filterKeyword} queryFilter={filter} handleChangeInputSearch={handleChangeInputSearch} handleChangeChecked={handleChangeCheckedFilter} category={{
                categories,
                filterCategory,
                setFilterCategory,
            }}/>
        </div>}>
      <div className="h-40-custom">
        <ShowFilterCard dataFilter={[
            {
                field: FiledFilterItem.OWNER,
                dataItem: filter.owner_status?.length ? filter.owner_status : [],
            },
            {
                field: FiledFilterItem.MARKET,
                dataItem: filter.market_status?.length
                    ? filter.market_status
                    : [],
            },
            {
                field: FiledFilterItem.LINK_WITH_STAR,
                dataItem: filter.link_with_star?.length
                    ? filter.link_with_star
                    : [],
            },
            {
                field: FiledFilterItem.TYPES,
                dataItem: filter.types?.length ? filter.types : [],
            },
            {
                field: FiledFilterItem.CATEGORY,
                dataItem: filterCategory?.length
                    ? filterCategory.map((el) => el.label)
                    : [],
            },
        ]} handleRemoveFilter={handleRemoveFilter}/>
      </div>
      <div className="custom-height-table-filter">
        <Table limit={limit.value} page={page.value} countItems={total.value} headers={dataHeaderKeyword(handleOpenUpdateList)} handleChangePage={handleChangePage} data={systemKeywords.length ? systemKeywords : []} orderBy={orderBy.value} orderDirection={orderDirection.value} handleChangeSort={handleChangeSort} checkedAdd={checkedAll.value} handleChangeChecked={handleChangeChecked} isLoadingTable={isLoadingTable.value}/>
      </div>
      {openViewKeyword.value ? (<ViewKeyword openView={openViewKeyword.value} dataItem={dataFormChange} handleClose={handleCloseViewKeyword}/>) : null}

      {openFormChange.value ? (<FormChange handleUpdateList={handleUpdateList} dataItem={dataFormChange} openFormChange={openFormChange.value} onClose={() => openFormChange.setValue(false)} categories={categories}/>) : null}

      {openFormImport.value ? (<FormImport openForm={openFormImport.value} onClose={() => openFormImport.setValue(false)} updateListKeywordWhenImport={updateListKeyword}/>) : null}

      {openDestroy.value ? (<DestroyDialog url={`/api/system-keywords/${dataFormChange.id}`} label="Destroy keyword" message="Destroy keyword successfully!" handleUpdateWhenDestroy={handleUpdateList} onClose={() => openDestroy.setValue(false)} openPopup={openDestroy.value}/>) : null}

      {openFormIncreaseAllowance.value ? (<FormIncreaseAllowance dataItem={{
                allowanceValue: allowanceValue.value,
            }} openForm={openFormIncreaseAllowance.value} onClose={onCloseFormIncreaseAllowance}/>) : null}

      {openFormSetCost.value ? (<FormSetCost onClose={handleCloseFormSetCost} openForm={openFormSetCost.value} dataItem={{
                keywords: selectKeyword,
                defaultMintCost: defaultMintCost.value,
            }} updateListKeyword={updateListKeyword}/>) : null}

      {openFormSell.value ? (<FormSellAndCancelKeyword dataItem={{
                keyForm: "sell",
                title: "Sell Keyword",
                label: "You want to sell keywords?",
                keywords: selectKeyword,
            }} openForm={openFormSell.value} onClose={handleCloseFormSellKeyword} updateListKeyword={updateListKeyword}/>) : null}

      {openFormCallSell.value ? (<FormSellAndCancelKeyword dataItem={{
                keyForm: "cancel",
                title: "Cancel Sell Keyword",
                label: "You want to cancel sell keywords?",
                keywords: selectKeyword,
            }} openForm={openFormCallSell.value} onClose={handleCloseFormCancelSellKeyword} updateListKeyword={updateListKeyword}/>) : null}

      {openMultipleSetCost.value ? (<FormSetCost onClose={() => openMultipleSetCost.setValue(false)} openForm={openMultipleSetCost.value} dataItem={{
                keywords: selectMultipleKeyword,
                defaultMintCost: defaultMintCost.value,
            }} updateListKeyword={updateListKeyword}/>) : null}

      {openFormMultipleSell.value ? (<FormSellAndCancelKeyword dataItem={{
                keyForm: "sell",
                title: "Sell Keyword",
                label: "You want to sell keywords?",
                keywords: selectMultipleKeyword,
            }} openForm={openFormMultipleSell.value} onClose={() => openFormMultipleSell.setValue(false)} updateListKeyword={updateListKeyword}/>) : null}

      {openFormMultipleCallSell.value ? (<FormSellAndCancelKeyword dataItem={{
                keyForm: "cancel",
                title: "Cancel Sell Keyword",
                label: "You want to cancel sell keywords?",
                keywords: selectMultipleKeyword,
            }} openForm={openFormMultipleCallSell.value} onClose={() => openFormMultipleCallSell.setValue(false)} updateListKeyword={updateListKeyword}/>) : null}
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>);
};
export default KeywordsPage;
