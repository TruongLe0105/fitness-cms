import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import Axios, { CancelTokenSource } from "axios";

import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useFilterFitness, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { OrderDetail, ParamsRequest } from "./types";
import { dataHeaderUser, filterOrder } from "./utils";
import { showNotification } from "helpers/util";
import { getOrderMiddleware } from "./services/api";
import ShowFilterCard from "components/Filter/ShowFilterCard";
import { ItemFilter } from "components/Filter/types";
import FilterItem from "components/Filter/FilterItem";
import { ReactComponent as IconFilter } from "assets/images/icons/filter.svg";


const orderPage = (): JSX.Element => {
    const [orders, setOrders] = useState<OrderDetail[]>([]);
    const [selected, setSelected] = useState<any>();
    const [refetch, setRefetch] = useState(0);

    const openFormUpdate = useBoolean();
    const openFormAdd = useBoolean(false);

    const {
        handleChangePage,
        limit,
        orderBy,
        orderDirection,
        page,
        total,
        isLoadingPage,
        isLoadingTable,
    } = useTable();

    const { filterFitness, handleChangeCheckedFilterFitness, handleRemoveFilterFitness } = useFilterFitness(
        page,
        isLoadingTable
    );

    const closeDialog = () => {
        openFormAdd.setValue(false);
        openFormUpdate.setValue(false);
        setSelected(null);
    }

    const onRefetch = React.useCallback(
        () => setRefetch(new Date().getTime()),
        []
    );

    useEffect(() => {
        const source: CancelTokenSource = Axios.CancelToken.source();

        getOrders(source);
        return () => source.cancel();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.value, orderBy.value, refetch, filterFitness]);


    const getOrders = async (source?: CancelTokenSource) => {
        try {
            const params: ParamsRequest = {
                limit: limit.value,
                page: page.value,
            };
            // if (orderBy.value) {
            //   params.sort = orderBy.value;
            // }

            if (filterFitness.order_status) {
                params.status = filterFitness.order_status
            }

            const dataRes = await getOrderMiddleware(params, source);


            console.log("data", dataRes)
            if (dataRes?.data?.length) {
                setOrders(dataRes.data);

                total.setValue(dataRes.total);
            }

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

    const openFormOrder = () => {
        openFormAdd.setValue(true);
    };

    const closeFormAddNewClient = () => {
        openFormAdd.setValue(false);
    };

    return (
        <PageLayout
            title="Order"
            childrenAction={
                <div className="flex items-center justify-between h-full pr-8">
                    <div className="flex items-center">
                    </div>
                    {filterOrder && filterOrder.length ? (
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
                            <div style={{ position: 'absolute', right: '-4rem' }} className="flex flex-col card-filter">
                                {filterOrder?.map((el, index) => (
                                    <FilterItem
                                        dataItem={el}
                                        key={index}
                                        queryFilter={filterFitness}
                                        handleChangeChecked={handleChangeCheckedFilterFitness}
                                    />
                                ))}
                            </div>
                        </Popup>
                    ) : null
                    }
                </div >
            }
        >
            <div className='h-40-custom' >
                <ShowFilterCard
                    dataFilter={[
                        {
                            field: ItemFilter.ORDER,
                            dataItem: filterFitness.order_status ? filterFitness.order_status : "",
                        },
                        // {
                        //   field: FiledFilterItem.MARKET,
                        //   dataItem: filter.market_status?.length
                        //     ? filter.market_status
                        //     : [],
                        // },
                        // {
                        //   field: FiledFilterItem.TYPES,
                        //   dataItem: filter.types?.length ? filter.types : [],
                        // },
                    ]}
                    handleRemoveFilter={handleRemoveFilterFitness}
                />
            </div>
            <Table
                limit={limit.value}
                page={page.value}
                countItems={total.value}
                headers={dataHeaderUser()}
                handleChangePage={handleChangePage}
                data={orders.length ? orders : []}
                orderBy={orderBy.value}
                orderDirection={orderDirection.value}
                isLoadingTable={isLoadingTable.value}
            />

            {isLoadingPage.value ? <BackdropCustomize /> : null}

        </PageLayout >
    );
};

export default orderPage;
