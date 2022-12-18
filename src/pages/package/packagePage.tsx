import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import React, { useEffect, useState } from "react";
import { ParamsRequest, PackageDetail } from "./types";
import { getPackageMiddleware } from "./services/api";
import { dataHeaderPackage } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import ButtonDefault from "components/Button/ButtonDefault";
import FormDialog from "./organisms/FormDialog";
import SelectDefault from "components/Select/SelectDefault";
import { cloneDeep } from "lodash";
import Axios, { CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";
import FormAddPackage from "./organisms/FormAddPackage";
import { useSelector } from "react-redux";
import { getGymMiddleware } from "pages/gym/services/api";
import ModalGyms from "pages/merchant/organisms/ModalGyms";
import FormUpdatePackage from "./organisms/FormUpdatePackage";
import DestroyDialog from "./organisms/DialogDestroy";

const packagePage = (): JSX.Element => {
  const [gymPackage, setPackage] = useState<PackageDetail[]>([]);
  const [dataGymsPackage, setDataGymsPackage] = useState<any>([]);
  const [selected, setSelected] = useState<any>();
  const [refetch, setRefetch] = useState(0);

  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();
  const openFormAdd = useBoolean();
  const updatePackage = useBoolean();
  const openPackage = useBoolean();

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

  const closeDialog = () => {
    openFormAdd.setValue(false);
    openFormUpdate.setValue(false);
    openFormDestroy.setValue(false);
    setSelected(null);
  };

  const onRefetch = React.useCallback(
    () => setRefetch(new Date().getTime()),
    []
  );

  const onEdit = (item: PackageDetail) => {
    openFormUpdate.setValue(true);
    setSelected(item);
  };

  const onDelete = (item: PackageDetail) => {
    openFormDestroy.setValue(true);
    setSelected(item);
  };

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();

    getPackage(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value, orderBy.value, refetch]);

  const getPackage = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
      };

      const dataRes = await getPackageMiddleware(params, source);

      if (dataRes?.data?.length) {
        setPackage(dataRes.data);

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
    (key: "edit" | "delete" | "view-detail", value: PackageDetail) => () => {
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

  const openFormAddPackage = () => {
    openFormAdd.setValue(true);
  };

  const closeFormAddNewClient = () => {
    openFormAdd.setValue(false);
  };

  const handleUpdate = () => {
    updatePackage.setValue(!updatePackage.value)
  };

  return (
    <PageLayout
      title="Package"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
            <ButtonDefault
              onClick={openFormAddPackage}
              buttonClass="form-btn"
            >
              Add New Package
            </ButtonDefault>
          </div>
        </div >
      }
    >
      <Table
        limit={limit.value}
        page={page.value}
        countItems={total.value}
        headers={dataHeaderPackage(setDataGymsPackage, openPackage, handleOpenUpdateList, onEdit, onDelete)}
        handleChangePage={handleChangePage}
        // data={notifications.length ? notifications : []}
        data={gymPackage.length ? gymPackage : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />

      {
        openFormAdd.value ?
          <FormAddPackage
            onClose={closeDialog}
            openFormChange={openFormAdd.value}
            onRefetch={onRefetch}
          /> : null
      }
      {
        openFormUpdate.value ?
          <FormUpdatePackage
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
      {
        openPackage.value ?
          <ModalGyms
            onClose={() => openPackage.setValue(false)}
            openFormChange={openPackage.value}
            onRefetch={onRefetch}
            data={dataGymsPackage ? dataGymsPackage : {}}
          /> : null
      }
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout >
  );
};

export default packagePage;
