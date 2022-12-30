import Axios, { CancelTokenSource } from 'axios';

import BackdropCustomize from 'components/BackdropCustomize';
import ButtonDefault from 'components/Button/ButtonDefault';
import Table from 'components/Table/Table';
import { useBoolean, useTable } from 'helpers/hooks';
import { showNotification } from 'helpers/util';
import PageLayout from 'pages/layout/organisms/PageLayout';

import React, { useEffect, useState } from 'react'
import FormSendMailbox from './organisms/FormSendMailbox';
import { getMailboxMiddleware } from './services/api';
import { emptyMailboxDetail, MailboxDetail, ParamsRequest } from './types';
import { dataHeaderUser } from './utils';

const mailboxPage = (): JSX.Element => {
    const [mailbox, setMailbox] = useState<MailboxDetail[]>([]);
    const [refetch, setRefetch] = useState(0);

    const [formCreateMailbox, setFormCreateMailbox] =
        useState<MailboxDetail>(emptyMailboxDetail);

    const openMailbox = useBoolean();

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

    const onRefetch = React.useCallback(
        () => setRefetch(new Date().getTime()),
        []
    );

    const openFormMailbox = () => {
        openMailbox.setValue(true);
    }

    const onCloseDialog = () => {
        openMailbox.setValue(false);
    }

    useEffect(() => {
        const source: CancelTokenSource = Axios.CancelToken.source();

        getSubject(source);
        return () => source.cancel();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page.value, orderBy.value, refetch]);

    const getSubject = async (source?: CancelTokenSource) => {
        try {
            const params: ParamsRequest = {
                limit: limit.value,
                page: page.value,
            };
            // if (orderBy.value) {
            //   params.sort = orderBy.value;
            // }

            const dataRes = await getMailboxMiddleware(params, source);

            if (dataRes?.data?.length) {
                setMailbox(dataRes.data);

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

    return (
        <PageLayout
            title="Mailbox"
            childrenAction={
                <div className="flex items-center justify-between h-full pr-8">
                    <div className="flex items-center">
                        <ButtonDefault
                            onClick={openFormMailbox}
                            buttonClass="form-btn"
                        >
                            Create Mailbox
                        </ButtonDefault>
                    </div>
                </div>
            }
        >
            <Table
                limit={limit.value}
                page={page.value}
                countItems={total.value}
                headers={dataHeaderUser()}
                handleChangePage={handleChangePage}
                data={mailbox.length ? mailbox : []}
                handleChangeSort={handleChangeSort}
                orderBy={orderBy.value}
                orderDirection={orderDirection.value}
                isLoadingTable={isLoadingTable.value}
            />
            {
                openMailbox.value ?
                    <FormSendMailbox
                        openFormChange={openMailbox.value}
                        onClose={onCloseDialog}
                        // mailbox={mailbox}
                        onRefetch={onRefetch}
                    /> : null
            }
            {isLoadingPage.value ? <BackdropCustomize /> : null}
        </PageLayout>
    )
}

export default mailboxPage;