import BackdropCustomize from 'components/BackdropCustomize';
import Table from 'components/Table/Table';
import { useTable } from 'helpers/hooks';
import PageLayout from 'pages/layout/organisms/PageLayout';
import { useEffect, useState } from 'react';
import FilterTable from 'components/Filter/FilterTable';
import { getUserMobileMiddleware } from './services/api';
import { dataHeaderUserMobile } from './utils';
import ViewDetailUserMobile from './organisms/ViewDetailUserMobile';
import Axios from 'axios';
import { showNotification } from 'helpers/util';
const UsersMobilePage = () => {
    const [users, setUsers] = useState([]);
    const [formOpenViewDetail, setFormOpenViewDetail] = useState({
        email: '',
        id: '',
    });
    const { handleChangeInputSearch, handleChangePage, limit, orderBy, orderDirection, page, search, searchParamRequest, total, handleChangeSort, isLoadingPage, isLoadingTable, } = useTable();
    useEffect(() => {
        const source = Axios.CancelToken.source();
        getUser(source);
        return () => source.cancel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        page.value,
        searchParamRequest.value,
        orderBy.value,
        orderDirection.value,
    ]);
    const getUser = async (source) => {
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
            const dataRes = await getUserMobileMiddleware(params, source);
            total.setValue(dataRes ? dataRes.total : 0);
            setUsers(dataRes ? dataRes.items : []);
            cleanStateRequest();
        }
        catch (error) {
            if (!Axios.isCancel(error)) {
                cleanStateRequest();
                showNotification('error', 'Server Error');
            }
        }
    };
    const cleanStateRequest = () => {
        isLoadingPage.setValue(false);
        isLoadingTable.setValue(false);
    };
    const handleClosePopup = () => {
        setFormOpenViewDetail({
            email: '',
            id: '',
        });
    };
    const handleOpenViewUserDetail = (id, email) => () => {
        setFormOpenViewDetail({
            email,
            id,
        });
    };
    return (<PageLayout title='Mobile Users' childrenAction={<div className='flex items-center justify-end h-full pr-8'>
          <FilterTable search={search.value} handleChangeInputSearch={handleChangeInputSearch}/>
        </div>}>
      <Table limit={limit.value} page={page.value} countItems={total.value} headers={dataHeaderUserMobile(handleOpenViewUserDetail)} handleChangePage={handleChangePage} data={users.length ? users : []} handleChangeSort={handleChangeSort} orderBy={orderBy.value} orderDirection={orderDirection.value} isLoadingTable={isLoadingTable.value}/>

      {isLoadingPage.value ? <BackdropCustomize /> : null}
      {formOpenViewDetail.id ? (<ViewDetailUserMobile formOpenViewDetail={formOpenViewDetail} openPopup={true} handleClosePopup={handleClosePopup}/>) : null}
    </PageLayout>);
};
export default UsersMobilePage;
