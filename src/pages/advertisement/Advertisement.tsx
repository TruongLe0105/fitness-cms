/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import TableCreateAdvertisement from './types/TableCreateAdvertisement';
import { useBoolean, useTable } from 'helpers/hooks';
import PageLayout from 'pages/layout/organisms/PageLayout';
import { getAdvertisementMiddleware } from './services/api';
import { AdvertisementDetail, ParamsAdvertisementRequest } from './types';
import { dataHeaderAdvertisement } from './utils';
import ButtonDefault from 'components/Button/ButtonDefault';
import { ORDER_DIRECTION } from 'types';
import { showNotification } from 'helpers/util';
import Axios, { CancelTokenSource } from 'axios';
import { FormCreateAdvertisement } from './organisms/FormCreateAdvertisement';
import React from 'react';

const AdvertisementPage = (): JSX.Element => {
  const [systemAdvertisement, setSystemAdvertisement] = useState<
    AdvertisementDetail[]
  >([]);
  const checkedAll = useBoolean();
  const openFormCreateAdvertisement = useBoolean();
  const openFormDeleteAdvertisement = useBoolean();
  const [refetch, setRefetch] = React.useState(0);

  const {
    handleChangePage,
    limit,
    orderBy,
    orderDirection,
    page,
    total,
    isLoadingPage,
    isLoadingTable,
    handleChangeSort,
  } = useTable('createdAt', ORDER_DIRECTION.ASC);

  const [selected, setSelected] = React.useState<AdvertisementDetail | null>(
    null
  );

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();
    getSystemAdvertisement(source);
    return () => source.cancel();
  }, [page.value, orderBy.value, orderDirection.value]);

  const getSystemAdvertisement = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsAdvertisementRequest = {
        limit: limit.value,
        page: page.value,
      };
      if (orderBy.value) {
        params.orderBy = orderBy.value;
        params.orderDirection = orderDirection.value;
      }
      const dataRes = await getAdvertisementMiddleware(params, source);

      total.setValue(dataRes ? dataRes.total : 0);
      setSystemAdvertisement(dataRes ? dataRes.items : []);
      cleanStateRequest();
    } catch (error) {
      if (!Axios.isCancel(error)) {
        cleanStateRequest();
        showNotification('error', 'Server Error');
      }
    }
  };

  const cleanStateRequest = () => {
    checkedAll.setValue(false);
    isLoadingPage.setValue(false);
    isLoadingTable.setValue(false);
  };

  const onCloseDialog = () => {
    openFormCreateAdvertisement.setValue(false);
    openFormDeleteAdvertisement.setValue(false);
    setSelected(null);
  };

  const onRefetch = React.useCallback(
    () => setRefetch(new Date().getTime()),
    []
  );

  return (
    <PageLayout
      title='Advertisement'
      childrenAction={
        <div className='flex items-center justify-between h-full pr-8'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ButtonDefault
              widthButton='w-180-custom'
              onClick={() => {
                openFormCreateAdvertisement.setValue(true);
              }}
              style={{ marginRight: 10 }}
            >
              Create Advertisement
            </ButtonDefault>
          </div>
        </div>
      }
    >
      <div>
        <TableCreateAdvertisement
          limit={limit.value}
          page={page.value}
          countItems={total.value}
          headers={dataHeaderAdvertisement()}
          handleChangePage={handleChangePage}
          data={systemAdvertisement.length ? systemAdvertisement : []}
          handleChangeSort={handleChangeSort}
          orderBy={orderBy.value}
          orderDirection={orderDirection.value}
          checkedAdd={checkedAll.value}
          isLoadingTable={isLoadingTable.value}
        />
      </div>

      {openFormCreateAdvertisement.value && (
        <FormCreateAdvertisement
          openForm={openFormCreateAdvertisement.value}
          onClose={onCloseDialog}
          item={selected}
          headers={dataHeaderAdvertisement()}
          countItems={total.value}
          orderDirection={orderDirection.value}
          onRefetch={onRefetch}
        />
      )}
    </PageLayout>
  );
};

export default AdvertisementPage;
