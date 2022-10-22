/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import TableAddNewTreasureForm from './types/TableAddNewTreasureForm';
import { useBoolean, useFilter, useTable } from 'helpers/hooks';
import PageLayout from 'pages/layout/organisms/PageLayout';
import { getSystemTreasureMiddleware } from './services/api';
import {
  defaultEmptyTreasureDetail,
  TreasureDetail,
  ParamsTreasureRequest,
} from './types';
import { dataHeaderStar, filterTreasure } from './utils';
import FilterTable from 'components/Filter/FilterTable';
import ButtonDefault from 'components/Button/ButtonDefault';
import { ORDER_DIRECTION } from 'types';
import { showNotification } from 'helpers/util';
import ShowFilterCard from 'components/Filter/ShowFilterCard';
import { FiledFilterItem } from './types';
import Axios, { CancelTokenSource } from 'axios';
import { FormAddNewTreasure } from './organisms/FormAddNewTreasure';
import React from 'react';
import DestroyDialog from './organisms/DeleteDialog';

const TreasurePage = (): JSX.Element => {
  const [systemTreasure, setSystemTreasure] = useState<TreasureDetail[]>([]);
  const [systemTreasureDetail, setSystemTreasureDetail] =
    useState<TreasureDetail>(defaultEmptyTreasureDetail);
  const checkedAll = useBoolean();
  const openFormAddTreasure = useBoolean();
  const openFormDeleteTreasure = useBoolean();

  const {
    handleChangeInputSearch,
    handleChangePage,
    limit,
    orderBy,
    orderDirection,
    page,
    search,
    searchParamRequest,
    total,
    isLoadingPage,
    isLoadingTable,
    handleChangeSort,
  } = useTable('createdAt', ORDER_DIRECTION.ASC);
  const [isDataRes, setIsDataRes] = React.useState('');
  const { filter, handleRemoveFilter, handleChangeCheckedFilter } = useFilter(
    page,
    isLoadingTable
  );
  const [selected, setSelected] = React.useState<TreasureDetail | null>(null);

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();
    getSystemTreasure(source);
    return () => source.cancel();
  }, [
    page.value,
    searchParamRequest.value,
    orderBy.value,
    orderDirection.value,
    filter,
  ]);

  const getSystemTreasure = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsTreasureRequest = {
        limit: limit.value,
        page: page.value,
        name: searchParamRequest.value,
      };
      if (orderBy.value) {
        params.orderBy = orderBy.value;
        params.orderDirection = orderDirection.value;
      }
      if (filter.tokens?.length) {
        params.tokens = filter.tokens;
      }
      if (filter.types?.length) {
        params.types = filter.types;
      }
      const dataRes = await getSystemTreasureMiddleware(params, source);

      total.setValue(dataRes ? dataRes.total : 0);
      setSystemTreasure(dataRes ? dataRes.items : []);
      cleanStateRequest();
    } catch (error) {
      if (!Axios.isCancel(error)) {
        cleanStateRequest();
        showNotification('error', 'Server Error');
      }
    }
  };

  const onRefresh = async () => {
    try {
      const params: ParamsTreasureRequest = {
        limit: limit.value,
        page: 1,
        name: searchParamRequest.value,
      };
      if (filter.tokens?.length) {
        params.tokens = filter.tokens;
      }
      if (filter.types?.length) {
        params.types = filter.types;
      }

      const dataRes = await getSystemTreasureMiddleware(params);
      total.setValue(dataRes ? dataRes.total : 0);
      setSystemTreasure(dataRes ? dataRes.items : []);
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

  const onEdit = (item: TreasureDetail) => {
    openFormAddTreasure.setValue(true);
    setSelected(item);
  };

  const onDelete = (item: TreasureDetail) => {
    openFormAddTreasure.setValue(true);
    setSelected(item);
  };

  const onCloseDialog = () => {
    openFormAddTreasure.setValue(false);
    openFormDeleteTreasure.setValue(false);
    setSelected(null);
  };

  return (
    <PageLayout
      title='Treasure'
      childrenAction={
        <div className='flex items-center justify-between h-full pr-8'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ButtonDefault
              widthButton='w-140-custom'
              onClick={() => {
                openFormAddTreasure.setValue(true);
                setIsDataRes(''); //Clear select treasure in Add new treasure
              }}
              style={{ marginRight: 10 }}
            >
              Add Treasure
            </ButtonDefault>
          </div>
          <FilterTable
            listFilter={filterTreasure}
            queryFilter={filter}
            search={search.value}
            handleChangeInputSearch={handleChangeInputSearch}
            handleChangeChecked={handleChangeCheckedFilter}
          />
        </div>
      }
    >
      <div className='h-40-custom'>
        <ShowFilterCard
          dataFilter={[
            {
              field: FiledFilterItem.TOKEN,
              dataItem: filter.tokens?.length ? filter.tokens : [],
            },
            {
              field: FiledFilterItem.TYPES,
              dataItem: filter.types?.length ? filter.types : [],
            },
          ]}
          handleRemoveFilter={handleRemoveFilter}
        />
      </div>
      <div className='custom-height-table-filter'>
        <TableAddNewTreasureForm
          limit={limit.value}
          page={page.value}
          countItems={total.value}
          headers={dataHeaderStar()}
          handleChangePage={handleChangePage}
          data={systemTreasure.length ? systemTreasure : []}
          handleChangeSort={handleChangeSort}
          orderBy={orderBy.value}
          orderDirection={orderDirection.value}
          checkedAdd={checkedAll.value}
          isLoadingTable={isLoadingTable.value}
          openForm={false}
        />
      </div>

      {openFormAddTreasure.value && (
        <FormAddNewTreasure
          openForm={openFormAddTreasure.value}
          onClose={onCloseDialog}
          item={selected}
          headers={dataHeaderStar()}
          dataItem={systemTreasureDetail}
          countItems={total.value}
          orderDirection={orderDirection.value}
          dataResName={isDataRes}
          handleChangeInputSearch={handleChangeInputSearch}
          onRefresh={onRefresh}
          data={systemTreasure.length ? systemTreasure : []}
        />
      )}
      {openFormDeleteTreasure.value && (
        <DestroyDialog
          openPopup={openFormDeleteTreasure.value}
          onClose={onCloseDialog}
          item={selected}
        />
      )}
      {/* {isLoadingPage.value ? <BackdropCustomize /> : null} */}
    </PageLayout>
  );
};

export default TreasurePage;
