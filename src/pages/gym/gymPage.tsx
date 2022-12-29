import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useFilterFitness, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import React, { useEffect, useState } from "react";
import { ParamsRequest, ClientDetail, GymDetail, emptyGymDetail } from "./types";
import { getGymMiddleware } from "./services/api";
import { dataHeaderUser } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import ButtonDefault from "components/Button/ButtonDefault";
import FormDialog from "./organisms/FormDialog";
import SelectDefault from "components/Select/SelectDefault";
import { cloneDeep } from "lodash";
import Axios, { CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";
import FormAddHost from "./organisms/FormAddhost";
import ShowFilterCard from "components/Filter/ShowFilterCard";
import DestroyDialog from "./organisms/DeleteDialog";
import FormUpdateGym from "./organisms/FormUpdateGym";

const gymPage = (): JSX.Element => {
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

  const [gym, setGym] = useState<GymDetail[]>([]);
  const [refetch, setRefetch] = useState(0);
  const [selected, setSelected] = useState<any>();
  const [formUpdateGym, setFormUpdateGym] =
    useState<GymDetail>(emptyGymDetail);

  const [formDataHost, setFormDataHost] =
    useState<GymDetail>(emptyGymDetail);

  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();
  const openFormAdd = useBoolean();

  const { filterFitness, handleChangeCheckedFilterFitness, handleRemoveFilterFitness } = useFilterFitness(
    page,
    isLoadingTable
  );

  const onRefetch = React.useCallback(
    () => setRefetch(new Date().getTime()),
    []
  );

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();

    getGym(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value, orderBy.value, refetch]);

  const openFormAddHost = () => {
    openFormAdd.setValue(true);
  };

  const closeFormAddHost = () => {
    openFormAdd.setValue(false);
  };

  const onEdit = (item: GymDetail) => {
    openFormUpdate.setValue(true);
    setSelected(item);
  };

  const onDelete = (item: GymDetail) => {
    openFormDestroy.setValue(true);
    setSelected(item);
  };

  const onCloseDialog = () => {
    openFormAdd.setValue(false);
    openFormUpdate.setValue(false);
    openFormDestroy.setValue(false);
    setSelected(null);
  };


  const getGym = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
      };
      // if (orderBy.value) {
      //   params.sort = orderBy.value;
      // }

      const dataRes = await getGymMiddleware(params, source);

      if (dataRes?.data?.length) {
        setGym(dataRes.data);

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
    (key: "edit" | "delete" | "view-detail", value: GymDetail) => () => {
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
      title="Gyms"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
            <ButtonDefault
              onClick={openFormAddHost}
              buttonClass="form-btn"
            >
              Add New Gym
            </ButtonDefault>
          </div>
          <FilterTable
            // listFilter={filterClient}
            // queryFilter={filterFitness}
            placeholder="Search"
            search={search.value}
            handleChangeInputSearch={handleChangeInputSearch}
            handleChangeChecked={handleChangeCheckedFilterFitness}
          />
        </div>
      }
    >
      <div className='h-40-custom'>
        <ShowFilterCard
          dataFilter={[
            // {
            //   field: FiledFilterItem.OWNER,
            //   dataItem: filter.owner_status?.length ? filter.owner_status : [],
            // },
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
        headers={dataHeaderUser(handleOpenUpdateList, onEdit, onDelete)}
        handleChangePage={handleChangePage}
        // data={notifications.length ? notifications : []}
        data={gym.length ? gym : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />

      {isLoadingPage.value ? <BackdropCustomize /> : null}
      {
        openFormAdd.value &&
        <FormAddHost
          onClose={closeFormAddHost}
          openFormChange={openFormAdd.value}
          onRefetch={onRefetch}
          dataItem={formDataHost}
        />
      }
      {openFormUpdate.value ?
        <FormUpdateGym
          onClose={onCloseDialog}
          openFormChange={openFormUpdate.value}
          onRefetch={onRefetch}
          item={selected}
        /> : null}
      {openFormDestroy.value ?
        <DestroyDialog
          openPopup={openFormDestroy.value}
          onClose={onCloseDialog}
          onRefetch={onRefetch}
          item={selected}
        /> : null}
    </PageLayout>
  );
};

export default gymPage;
