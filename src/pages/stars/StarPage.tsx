/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import BackdropCustomize from 'components/BackdropCustomize';
import Table from 'components/Table/Table';
import { useBoolean, useFilter, useString, useTable } from 'helpers/hooks';
import { cloneDeep } from 'lodash';
import PageLayout from 'pages/layout/organisms/PageLayout';
import { getSystemStarMiddleware, lockStarMiddleware, updateFamousStarMiddleware } from './services/api';
import {
  defaultEmptyStarDetail,
  ParamsStarRequest,
  SetMintPriceBody,
  StarDetail,
  UpdateFieldStarWhenViewDetail,
} from './types';
import { dataHeaderStar, filterStar } from './utils';
import FilterTable from 'components/Filter/FilterTable';
import ViewDetailStar from './organisms/ViewDetailStar';
import FormSetCost from './organisms/FormSetCost';
import ButtonDefault from 'components/Button/ButtonDefault';
import { ORDER_DIRECTION, STATUS_RESPONSE_CODE } from 'types';
import { showNotification, web3Instance } from 'helpers/util';
import ShowFilterCard from 'components/Filter/ShowFilterCard';
import { FiledFilterItem } from 'components/Filter/types';
import Axios, { CancelTokenSource } from 'axios';
import { FormAddNewStar } from './organisms/FormAddNewStar';
import React from 'react';
import DestroyDialog from './organisms/DeleteDialog';

const StarPage = (): JSX.Element => {
  const [systemStars, setSystemStars] = useState<StarDetail[]>([]);
  const [systemStarDetail, setSystemStarDetail] = useState<StarDetail>(
    defaultEmptyStarDetail
  );
  const openViewDetail = useBoolean();
  const checkedAll = useBoolean();
  const [listSetCost, setListSetCost] = useState<StarDetail[]>([]);
  const [listMultipleSetCost, setMultipleListSetCost] = useState<StarDetail[]>(
    []
  );
  const openFormSetCost = useBoolean();
  const openFormMultipleSetCost = useBoolean();
  const defaultMintCost = useString();
  const openFormAddStar = useBoolean();
  const openFormDeleteStar = useBoolean();

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
  const [refetch, setRefetch] = React.useState(0);
  const { filter, handleChangeCheckedFilter, handleRemoveFilter } = useFilter(
    page,
    isLoadingTable
  );
  const [selected, setSelected] = React.useState<StarDetail | null>(null);

  const onEdit = (item: StarDetail) => {
    openFormAddStar.setValue(true);
    setSelected(item);
  };

  const onDelete = (item: StarDetail) => {
    openFormDeleteStar.setValue(true);
    setSelected(item);
  };

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();
    getSystemStar(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page.value,
    searchParamRequest.value,
    orderBy.value,
    orderDirection.value,
    filter,
    refetch,
  ]);

  const getSystemStar = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsStarRequest = {
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
      if (filter.types?.length) {
        params.types = filter.types;
      }
      const dataRes = await getSystemStarMiddleware(params, source);

      total.setValue(dataRes ? dataRes.total : 0);
      setSystemStars(dataRes ? dataRes.items : []);
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
    setMultipleListSetCost([]);
    setListSetCost([]);
    isLoadingPage.setValue(false);
    isLoadingTable.setValue(false);
  };

  const handleUpdateSystemStarWhenOpenViewDetail = (
    dataRes: UpdateFieldStarWhenViewDetail
  ) => {
    const newStars = cloneDeep(systemStars);
    const index = newStars.findIndex((el) => el.id === dataRes.id);
    if (index > -1) {
      newStars[index] = {
        ...newStars[index],
        ...dataRes,
      };
      setSystemStars(newStars);
    }
    openViewDetail.setValue(false);
  };

  const handleOpenFormStar =
    (key: 'cost' | 'viewStar', dataRes: StarDetail) => () => {
      switch (key) {
        case 'viewStar':
          openViewDetail.setValue(true);
          setSystemStarDetail(dataRes);
          break;
        case 'cost':
          if (dataRes.nftId) {
            return;
          }
          changeSetCostKeyword(dataRes);
          break;
      }
    };

  const handleChangeChecked =
    (key: 'all' | 'one', newChecked: boolean, newIndex: number) => () => {
      if (key === 'all') {
        checkedAll.setValue(!newChecked);
        const newData = cloneDeep(systemStars).map((el) => {
          return {
            ...el,
            checked: !newChecked,
          };
        });
        setMultipleListSetCost(newData.filter((el) => el.checked && !el.nftId));
        setSystemStars(newData);
        return;
      }
      const newSystem = cloneDeep(systemStars);
      newSystem[newIndex].checked = !newChecked;
      setSystemStars(newSystem);
      setMultipleListSetCost(newSystem.filter((el) => el.checked && !el.nftId));
      checkedAll.setValue(
        newSystem.find((el) => !el.checked && !el.nftId) ? false : true
      );
    };

  const changeSetCostKeyword = async (dataRes: StarDetail) => {
    //const isCheck = await checkConnectMetamask();
    //if (isCheck) {
    setListSetCost([dataRes]);
    openFormSetCost.setValue(true);
    //}
  };

  const handleCloseFormSetCost = () => {
    openFormSetCost.setValue(false);
  };

  const handleChangeMultipleSetCosts = async () => {
    //const isCheck = await checkConnectMetamask();
    //if (isCheck) {
    setMultipleListSetCost(systemStars.filter((el) => el.checked && !el.nftId));
    openFormMultipleSetCost.setValue(true);
    //}
  };

  const handleCloseFormMultipleSetCost = () => {
    openFormMultipleSetCost.setValue(false);
  };
  const updateListWhenSetCost = (data: SetMintPriceBody[]) => {
    const newData = cloneDeep(systemStars).map((item) => {
      const existed = data.find((el) => el.id === item.id);
      return {
        ...item,
        purchasePrice: existed
          ? web3Instance.utils.toWei(existed.price.toString())
          : item.purchasePrice,
      };
    });
    setSystemStars(newData);
    // isLoadingTable.setValue(true);
    // if (page.value > 1) {
    //   page.setValue(1);
    //   return;
    // }
    // getSystemStar();
  };

  const handleLockStar = (star: StarDetail) => {
    isLoadingPage.setValue(true);
    lockStarMiddleware(star.id, !star.isLocked, (status) => {
      isLoadingPage.setValue(false);
      if (status === STATUS_RESPONSE_CODE.SUCCESS) {
        const newStars = cloneDeep(systemStars);
        const idx = newStars.findIndex((el) => el.id === star.id);
        if (idx > -1) {
          newStars[idx] = {
            ...newStars[idx],
            isLocked: !newStars[idx].isLocked,
          };
        }
        setSystemStars(newStars);
      }
    });
  };

  const handleUpdateFamousStar = (starId: string) => () => {
    isLoadingPage.setValue(true);
    updateFamousStarMiddleware(starId, (status) => {
      isLoadingPage.setValue(false);
      if (status === STATUS_RESPONSE_CODE.SUCCESS) {
        const newStars = cloneDeep(systemStars);
        const idx = newStars.findIndex((el) => el.id === starId);
        if (idx > -1) {
          newStars[idx] = {
            ...newStars[idx],
            isFamous: !newStars[idx].isFamous,
          };
        }
        setSystemStars(newStars);
      }
    });
  };



  const onRefetch = React.useCallback(
    () => setRefetch(new Date().getTime()),
    []
  );

  const onCloseDialog = () => {
    openFormAddStar.setValue(false);
    openFormDeleteStar.setValue(false);
    setSelected(null);
  };

  return (
    <PageLayout
      title='Stars'
      childrenAction={
        <div className='flex items-center justify-between h-full pr-8'>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ButtonDefault
              widthButton='w-140-custom'
              onClick={() => openFormAddStar.setValue(true)}
              style={{ marginRight: 10 }}
            >
              Add Star
            </ButtonDefault>
            {listMultipleSetCost.length ? (
              <ButtonDefault
                widthButton='w-140-custom ml-2'
                onClick={handleChangeMultipleSetCosts}
              >
                Multiple Set Price
              </ButtonDefault>
            ) : null}
          </div>

          <FilterTable
            listFilter={filterStar}
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
              field: FiledFilterItem.TYPES,
              dataItem: filter.types?.length ? filter.types : [],
            },
          ]}
          handleRemoveFilter={handleRemoveFilter}
        />
      </div>
      <div className='custom-height-table-filter'>
        <Table
          limit={limit.value}
          page={page.value}
          countItems={total.value}
          headers={dataHeaderStar(
            handleOpenFormStar,
            onEdit,
            onDelete,
            handleLockStar,
            handleUpdateFamousStar
          )}
          handleChangePage={handleChangePage}
          data={systemStars.length ? systemStars : []}
          handleChangeSort={handleChangeSort}
          orderBy={orderBy.value}
          orderDirection={orderDirection.value}
          checkedAdd={checkedAll.value}
          handleChangeChecked={handleChangeChecked}
          
          isLoadingTable={isLoadingTable.value}
        />
      </div>

      {openViewDetail.value ? (
        <ViewDetailStar
          dataItem={systemStarDetail}
          handleUpdateSystemStarWhenOpenViewDetail={
            handleUpdateSystemStarWhenOpenViewDetail
          }
          openViewDetail={openViewDetail.value}
        />
      ) : null}

      {openFormSetCost.value ? (
        <FormSetCost
          onClose={handleCloseFormSetCost}
          openForm={openFormSetCost.value}
          dataItem={{
            stars: listSetCost,
            defaultMintCost: defaultMintCost.value,
          }}
          updateList={updateListWhenSetCost}
        />
      ) : null}

      {openFormMultipleSetCost.value ? (
        <FormSetCost
          onClose={handleCloseFormMultipleSetCost}
          openForm={openFormMultipleSetCost.value}
          dataItem={{
            stars: listMultipleSetCost,
            defaultMintCost: defaultMintCost.value,
          }}
          updateList={updateListWhenSetCost}
        />
      ) : null}
      {openFormAddStar.value && (
        <FormAddNewStar
          openForm={openFormAddStar.value}
          onClose={onCloseDialog}
          onRefetch={onRefetch}
          item={selected}
        />
      )}
      {openFormDeleteStar.value && (
        <DestroyDialog
          openPopup={openFormDeleteStar.value}
          onClose={onCloseDialog}
          onRefetch={onRefetch}
          item={selected}
        />
      )}
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>
  );
};

export default StarPage;
