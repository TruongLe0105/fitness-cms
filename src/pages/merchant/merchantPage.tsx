import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import { ParamsRequest, MerchantDetail } from "./types";
import { getMerchantMiddleware } from "./services/api";
import { dataHeaderUser } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import ButtonDefault from "components/Button/ButtonDefault";
import FormDialog from "./organisms/FormDialog";
import SelectDefault from "components/Select/SelectDefault";
import { cloneDeep } from "lodash";
import Axios, { CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";
import FormAddNewClient from "components/form/FormAddNewClient";

const merchantPage = (): JSX.Element => {
  const [merchant, setMerchant] = useState<MerchantDetail[]>([]);

  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();
  const openFormAdd = useBoolean(false);
  const updateMerchant = useBoolean(false);

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

    getMerchant(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value, orderBy.value, updateMerchant.value]);

  const handleUpdate = () => {
    updateMerchant.setValue(true);
  }

  const getMerchant = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
      };
      // if (orderBy.value) {
      //   params.sort = orderBy.value;
      // }

      const dataRes = await getMerchantMiddleware(params, source);

      if (dataRes?.data?.length) {
        setMerchant(dataRes.data);

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

  const openFormAddNewClient = () => {
    openFormAdd.setValue(true);
  };

  const closeFormAddNewClient = () => {
    openFormAdd.setValue(false);
  };

  const handleOpenUpdateList =
    (key: "edit" | "delete" | "view-detail", value: MerchantDetail) => () => {
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
      title="Client"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          <div className="flex items-center">
            <ButtonDefault
              onClick={openFormAddNewClient}
              buttonClass="form-btn"
            >
              Add New Client
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
        data={merchant.length ? merchant : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />

      {isLoadingPage.value ? <BackdropCustomize /> : null}
      {openFormAdd.value ?
        <FormAddNewClient
          onClose={closeFormAddNewClient}
          openFormChange={openFormAdd.value}
          handleUpdateList={handleUpdate}
        /> : null}
    </PageLayout>
  );
};

export default merchantPage;
