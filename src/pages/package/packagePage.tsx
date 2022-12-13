import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import { ParamsRequest, PackageDetail } from "./types";
import { getPackageMiddleware } from "./services/api";
import { dataHeaderUser } from "./utils";
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

const packagePage = (): JSX.Element => {
  const [gymPackage, setPackage] = useState<PackageDetail[]>([]);

  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();
  const openFormAdd = useBoolean();
  const updatePackage = useBoolean();

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

  const { gyms } = useSelector((state: any) => state.subject);

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();
    getGymMiddleware();

    gyms?.map((gym: any) => {
      getPackage(source, gym);
    })
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.value, orderBy.value, gyms.length]);

  console.log("gyms", gyms)

  const getPackage = async (source?: CancelTokenSource, gym?: any) => {
    try {
      const gymId = gym ? gym?._id : null;
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
      };
      // if (orderBy.value) {
      //   params.sort = orderBy.value;
      // }

      const dataRes = await getPackageMiddleware(params, source, gymId);

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
      title="Client"
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
        headers={dataHeaderUser(handleOpenUpdateList)}
        handleChangePage={handleChangePage}
        // data={notifications.length ? notifications : []}
        data={gymPackage.length ? gymPackage : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />

      {isLoadingPage.value ? <BackdropCustomize /> : null}
      {
        openFormAdd.value ?
          <FormAddPackage
            onClose={closeFormAddNewClient}
            openFormChange={openFormAdd.value}
            handleUpdateList={handleUpdate}
          /> : null
      }
    </PageLayout >
  );
};

export default packagePage;
