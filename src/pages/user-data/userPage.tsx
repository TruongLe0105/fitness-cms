import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useFilterFitness, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import React, { useEffect, useState } from "react";
import {
  NotificationDetail,
  ParamsRequest,
  UserDetail,
  ListPointSelect,
  ClientDetail,
  ListSentSelect,
  SentSelectDetail,
} from "./types";
import { getUserMiddleware } from "./services/api";
import { dataHeaderUser, filterClient } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import ButtonDefault from "components/Button/ButtonDefault";
import FormDialog from "./organisms/FormDialog";
import SelectDefault from "components/Select/SelectDefault";
import { cloneDeep } from "lodash";
import Axios, { CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";
import ShowFilterCard from "components/Filter/ShowFilterCard";
import DestroyDialog from "./organisms/DialogDestroy";
import FormUpdateUser from "./organisms/FormUpdateUser";
import { FiledFilterItem, ItemFilter } from "components/Filter/types";

const userPage = (): JSX.Element => {
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

  const [user, setUser] = useState<ClientDetail[]>([]);
  const [selected, setSelected] = useState<any>();
  const [refetch, setRefetch] = useState(0);
  const [sentSelect, setSentSelect] = useState<SentSelectDetail>(
    ListSentSelect[0]
  );

  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();

  const { filterFitness, handleChangeCheckedFilterFitness, handleRemoveFilterFitness } = useFilterFitness(
    page,
    isLoadingTable
  );

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();

    getUser(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page.value,
    orderBy.value,
    refetch,
    filterFitness,
  ]);

  const getUser = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
      };
      // if (orderBy.value) {
      //   params.sort = orderBy.value;
      // }

      if (filterFitness.client_status?.length) {
        params.status = filterFitness.client_status;
      }

      const dataRes = await getUserMiddleware(params, source);

      if (dataRes?.data?.length) {
        setUser(dataRes.data);

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
    (key: "edit" | "delete" | "view-detail", value: ClientDetail) => () => {
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

  const onEdit = (item: UserDetail) => {
    openFormUpdate.setValue(true);
    setSelected(item);
  };

  const onDelete = (item: UserDetail) => {
    openFormDestroy.setValue(true);
    setSelected(item);
  };

  const closeDialog = () => {
    openFormUpdate.setValue(false);
    openFormDestroy.setValue(false);
    setSelected(null);
  };

  const onRefetch = React.useCallback(
    () => setRefetch(new Date().getTime()),
    []
  );

  const handleChangeSentSelect = (value: SentSelectDetail) => {
    setSentSelect(value);
    isLoadingTable.setValue(true);
  };

  return (
    <PageLayout
      title="Client"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
          </div>
          {/* <SelectDefault
            options={ListSentSelect}
            selectedOption={sentSelect}
            handleChange={handleChangeSentSelect}
            filed="name"
            rootClasses="mr-3 custom-select-param bg-gray-02-custom rounded-xl pl-4 border-0 font-medium text-xs-custom"
            styleSingleValue={{
              display: "flex",
              alignItems: "center",
              fontSize: 12,
              maxWidth: "inherit",
            }}
            styleControl={{
              borderBottom: "none",
            }}
          /> */}
          <FilterTable
            listFilter={filterClient}
            queryFilter={filterFitness}
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
            {
              field: ItemFilter.CLIENT,
              dataItem: filterFitness.client_status?.length ? filterFitness.client_status : [],
            },
            // {
            //   field: ItemFilter.MARKET,
            //   dataItem: filter.market_status?.length
            //     ? filter.market_status
            //     : [],
            // },
            // {
            //   field: ItemFilter.TYPES,
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
        data={user.length ? user : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />
      {
        openFormUpdate.value ?
          <FormUpdateUser
            onClose={closeDialog}
            openFormChange={openFormUpdate.value}
            onRefetch={onRefetch}
            item={selected}
          /> : null
      }
      {
        openFormDestroy.value ?
          <DestroyDialog
            onClose={closeDialog}
            openPopup={openFormDestroy.value}
            onRefetch={onRefetch}
            item={selected}
          /> : null
      }
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>
  );
};

export default userPage;
