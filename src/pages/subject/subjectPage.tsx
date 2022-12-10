import Axios, { CancelTokenSource } from 'axios';
import BackdropCustomize from 'components/BackdropCustomize';
import ButtonDefault from 'components/Button/ButtonDefault';
import Table from 'components/Table/Table';
import { useBoolean, useTable } from 'helpers/hooks';
import { showNotification } from 'helpers/util';
import PageLayout from 'pages/layout/organisms/PageLayout';
import React, { useEffect, useState } from 'react'
import FormAddNewSubject from './organisms/FormAddNewSubject';
import { getSubjectMiddleware } from './services/api';
import { emptySubjectDetail, ParamsRequest, SubjectDetail } from './types';
import { dataHeaderUser } from './utils';

const subjectPage = (): JSX.Element => {
    const [subject, setSubject] = useState<SubjectDetail[]>([]);
    const [formDataSubject, setFormDataSubject] =
        useState<SubjectDetail>(emptySubjectDetail);

    const updateSubject = useBoolean(false);
    const openFormAdd = useBoolean(false);
    const openFormUpdate = useBoolean();
    const openFormDestroy = useBoolean();
    const openViewDetail = useBoolean();

    const {
        handleChangeInputSearch,
        handleChangePage,
        limit,
        orderBy,
        orderDirection,
        page,
        search,
        total,
        handleChangeSort,
        isLoadingPage,
        isLoadingTable,
    } = useTable();


    useEffect(() => {
        const source: CancelTokenSource = Axios.CancelToken.source();

        getSubject(source);
        return () => source.cancel();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.value, orderBy.value, updateSubject.value]);

    const handleUpdate = () => {
        updateSubject.setValue(true);
    };

    const openFormAddNewSubject = () => {
        openFormAdd.setValue(true);
    };

    const closeFormAddNewSubject = () => {
        openFormAdd.setValue(false);
    };

    const getSubject = async (source?: CancelTokenSource) => {
        try {
            const params: ParamsRequest = {
                limit: limit.value,
                page: page.value,
            };
            // if (orderBy.value) {
            //   params.sort = orderBy.value;
            // }

            const dataRes = await getSubjectMiddleware(params, source);

            if (dataRes?.data?.length) {
                setSubject(dataRes.data);

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

    const handleOpenUpdateList =
        (key: "edit" | "delete" | "view-detail", value: SubjectDetail) => () => {
            if (key !== "view-detail" && value.id) {
                return;
            }
            setFormDataSubject(value);
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
            title="Subject"
            childrenAction={
                <div className="flex items-center justify-between h-full pr-8">
                    <div className="flex items-center">
                        <ButtonDefault
                            onClick={openFormAddNewSubject}
                            buttonClass="form-btn"
                        >
                            Add New Subject
                        </ButtonDefault>
                    </div>
                </div>
            }
        >
            <Table
                limit={limit.value}
                page={page.value}
                countItems={total.value}
                headers={dataHeaderUser(handleOpenUpdateList)}
                handleChangePage={handleChangePage}
                // data={notifications.length ? notifications : []}
                data={subject.length ? subject : []}
                handleChangeSort={handleChangeSort}
                orderBy={orderBy.value}
                orderDirection={orderDirection.value}
                isLoadingTable={isLoadingTable.value}
            />

            {isLoadingPage.value ? <BackdropCustomize /> : null}
            {openFormAdd.value ?
                <FormAddNewSubject
                    onClose={closeFormAddNewSubject}
                    openFormChange={openFormAdd.value}
                    handleUpdateList={handleUpdate}
                    dataItem={formDataSubject}
                /> : null}
        </PageLayout>
    )
}

export default subjectPage;