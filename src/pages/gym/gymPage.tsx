import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import { ParamsRequest, ClientDetail, GymDetail, emptySubjectDetail } from "./types";
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

const gymPage = (): JSX.Element => {
  const [gym, setGym] = useState<GymDetail[]>([]);

  const [formDataHost, setFormDataHost] =
    useState<GymDetail>(emptySubjectDetail);

  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();
  const openFormAdd = useBoolean();
  const updateData = useBoolean();

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

    getGym(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value, orderBy.value, updateData.value]);

  const openFormAddHost = () => {
    openFormAdd.setValue(true);
  };

  const closeFormAddHost = () => {
    openFormAdd.setValue(false);
  };

  const handleUpdate = () => {
    updateData.setValue(!updateData.value);
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
      title="Gym"
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
          handleUpdateList={handleUpdate}
          dataItem={formDataHost}
        />
      }
    </PageLayout>
  );
};

export default gymPage;
