import Axios, { CancelTokenSource } from 'axios';
import BackdropCustomize from 'components/BackdropCustomize';
import ButtonDefault from 'components/Button/ButtonDefault';
import Table from 'components/Table/Table';
import { useBoolean, useTable } from 'helpers/hooks';
import { showNotification } from 'helpers/util';
import PageLayout from 'pages/layout/organisms/PageLayout';
import React, { useEffect, useState } from 'react'
import FormAddConvenience from './molecules/FormAddConvenience';
import FormUpdateConvenience from './molecules/FormUpdateConvenience';
import DestroyDialog from './organisms/DeleteDialog';
import { getConvenienceMiddleware } from './services/api';
import { ConvenienceDetail, emptyConvenienceDetail, ParamsRequest } from './types';
import { dataHeaderUser } from './utils';

const conveniencePage = (): JSX.Element => {
    const [convenience, setConvenience] = useState<ConvenienceDetail[]>([]);
    const [selected, setSelected] = useState<any>();
    const [refetch, setRefetch] = React.useState(0);

    const openFormAdd = useBoolean(false);
    const openFormUpdate = useBoolean();
    const openFormDestroy = useBoolean();
    const openViewDetail = useBoolean();

    const {
        handleChangePage,
        limit,
        orderBy,
        orderDirection,
        page,
        total,
        handleChangeSort,
        isLoadingPage,
        isLoadingTable,
    } = useTable();

    const onEdit = (item: ConvenienceDetail) => {
        openFormUpdate.setValue(true);
        setSelected(item);
    };

    const onDelete = (item: ConvenienceDetail) => {
        openFormDestroy.setValue(true);
        setSelected(item);
    };

    const onCloseDialog = () => {
        openFormAdd.setValue(false);
        openFormUpdate.setValue(false);
        openFormDestroy.setValue(false);
        setSelected(null);
    };

    const onRefetch = React.useCallback(
        () => setRefetch(new Date().getTime()),
        []
    );

    useEffect(() => {
        const source: CancelTokenSource = Axios.CancelToken.source();

        getConvenience(source);
        return () => source.cancel();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.value, orderBy.value, refetch]);

    const openFormAddConvenience = () => {
        openFormAdd.setValue(true);
    };

    const cleanStateRequest = () => {
        isLoadingPage.setValue(false);
        isLoadingTable.setValue(false);
    };

    const getConvenience = async (source?: CancelTokenSource) => {
        try {
            const params: ParamsRequest = {
                limit: limit.value,
                page: page.value,
            };
            // if (orderBy.value) {
            //   params.sort = orderBy.value;
            // }

            const dataRes = await getConvenienceMiddleware(params, source);

            if (dataRes?.data?.length) {
                setConvenience(dataRes.data);

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

    const handleOpenUpdateList =
        (key: "edit" | "delete" | "view-detail", value: ConvenienceDetail) => () => {
            if (key !== "view-detail" && value.id) {
                return;
            }
            // setFormDataUser(value);
            switch (key) {
                case "edit":
                    openFormUpdate.setValue(true);
                    break;
                case "delete":
                    openFormDestroy.setValue(true);
                    break;
                case "view-detail":
                    openViewDetail.setValue(true);
                    break;
            }
        };

    return (
        <PageLayout
            title="Convenience"
            childrenAction={
                <div className="flex items-center justify-between h-full pr-8">
                    <div className="flex items-center">
                        <ButtonDefault
                            onClick={openFormAddConvenience}
                            buttonClass="form-btn"
                        >
                            Add New Convenience
                        </ButtonDefault>
                    </div>
                </div>
            }
        >
            <Table
                limit={limit.value}
                page={page.value}
                countItems={total.value}
                headers={dataHeaderUser(handleOpenUpdateList, onEdit, onDelete)}
                handleChangePage={handleChangePage}
                // data={notifications.length ? notifications : []}
                data={convenience.length ? convenience : []}
                handleChangeSort={handleChangeSort}
                orderBy={orderBy.value}
                orderDirection={orderDirection.value}
                isLoadingTable={isLoadingTable.value}
            />
            {openFormAdd.value ?
                <FormAddConvenience
                    onClose={onCloseDialog}
                    openFormChange={openFormAdd.value}
                    onRefetch={onRefetch}
                /> : null}
            {openFormUpdate.value ?
                <FormUpdateConvenience
                    onClose={onCloseDialog}
                    openFormChange={openFormUpdate.value}
                    item={selected}
                    onRefetch={onRefetch}
                /> : null}
            {openFormDestroy.value && (
                <DestroyDialog
                    openPopup={openFormDestroy.value}
                    onClose={onCloseDialog}
                    onRefetch={onRefetch}
                    item={selected}
                />
            )}
            {isLoadingPage.value ? <BackdropCustomize /> : null}
        </PageLayout>
    )
}

export default conveniencePage;