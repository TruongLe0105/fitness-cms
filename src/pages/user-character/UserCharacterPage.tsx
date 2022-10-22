import BackdropCustomize from "components/BackdropCustomize";
import Table from "components/Table/Table";
import { useBoolean, useTable } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import {
  emptyNotificationDetail,
  emptyUserCharacterDetail,
  emptyUserDetail,
  ListOptionToSendSelect,
  ListSentSelect,
  NotificationDetail,
  ParamsRequest,
  SelectToSendDetail,
  SentSelectDetail,
  TYPE_NOTIFICATION,
  UserCharacterDetail,
  UserDetail,
} from "./types";
import {
  getNotificationsMiddleware,
  getUserCharactersMiddleware,
} from "./services/api";
import { dataHeaderUser } from "./utils";
import FilterTable from "components/Filter/FilterTable";
import ButtonDefault from "components/Button/ButtonDefault";
import FormDialog from "./organisms/FormDialog";
import SelectDefault from "components/Select/SelectDefault";
import { cloneDeep } from "lodash";
import DestroyDialog from "components/Dialog/DestroyDialog";
import ViewDetail from "./organisms/ViewDetail";
import Axios, { CancelTokenSource } from "axios";
import { showNotification } from "helpers/util";

const UserCharacterPage = (): JSX.Element => {
  const [notifications, setNotifications] = useState<NotificationDetail[]>([]);
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [userCharacters, setUserCharacters] = useState<UserCharacterDetail[]>(
    []
  );

  const openFormAdd = useBoolean();
  const [osSelect, setOsSelect] = useState<SelectToSendDetail>(
    ListOptionToSendSelect[0]
  );
  const [sentSelect, setSentSelect] = useState<SentSelectDetail>(
    ListSentSelect[0]
  );
  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openViewDetail = useBoolean();
  const [formDataNotification, setFormDataNotification] =
    useState<NotificationDetail>(emptyNotificationDetail);

  const [formDataUser, setFormDataUser] = useState<UserDetail>(emptyUserDetail);

  const [formDataUserCharacter, setFormDataUserCharacter] =
    useState<UserCharacterDetail>(emptyUserCharacterDetail);

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
    handleChangeSort,
    isLoadingPage,
    isLoadingTable,
  } = useTable();

  // useEffect(() => {
  //   const source: CancelTokenSource = Axios.CancelToken.source();

  //   getNotifications(source);
  //   return () => source.cancel();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   page.value,
  //   searchParamRequest.value,
  //   orderBy.value,
  //   orderDirection.value,
  //   osSelect.value,
  //   sentSelect.value,
  // ]);

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();

    getUserCharacters(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page.value,
    searchParamRequest.value,
    orderBy.value,
    orderDirection.value,
    osSelect.value,
    sentSelect.value,
  ]);

  const getNotifications = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
        search: searchParamRequest.value,
      };
      if (orderBy.value) {
        params.orderBy = orderBy.value;
        params.orderDirection = orderDirection.value;
      }
      if (sentSelect.value) {
        params.isSent = sentSelect.value === "true" ? true : false;
      }
      const newTypes: string[] = [];
      switch (osSelect.value) {
        case TYPE_NOTIFICATION.ALL:
          newTypes.push(TYPE_NOTIFICATION.ALL);
          newTypes.push(TYPE_NOTIFICATION.IOS);
          newTypes.push(TYPE_NOTIFICATION.ANDROID);
          break;
        case TYPE_NOTIFICATION.IOS:
          newTypes.push(TYPE_NOTIFICATION.IOS);
          break;
        case TYPE_NOTIFICATION.ANDROID:
          newTypes.push(TYPE_NOTIFICATION.ANDROID);
          break;
      }
      params.types = newTypes;
      const dataRes = await getNotificationsMiddleware(params, source);
      setNotifications(dataRes.items);
      total.setValue(dataRes.total);
      cleanStateRequest();
    } catch (error) {
      if (!Axios.isCancel(error)) {
        cleanStateRequest();
        showNotification("error", "Server Error");
      }
    }
  };

  const getUserCharacters = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
        search: searchParamRequest.value,
      };
      if (orderBy.value) {
        params.orderBy = orderBy.value;
        params.orderDirection = orderDirection.value;
      }

      const dataRes = await getUserCharactersMiddleware(params, source);
      console.log("dataRes:", dataRes);
      setUserCharacters(dataRes.items);
      total.setValue(dataRes.total);
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
  const handleUpdateListNotification = (dataRes?: NotificationDetail) => {
    if (dataRes) {
      const newData = cloneDeep(notifications);
      const index = newData.findIndex((el) => el.id === dataRes.id);
      newData[index] = dataRes;
      setNotifications(newData);
      return;
    }
    isLoadingTable.setValue(true);
    if (page.value !== 1) {
      page.setValue(1);
      return;
    }
    getNotifications();
  };

  // const handleUpdateListUser = (dataRes?: UserDetail) => {
  //   if (dataRes) {
  //     const newData = cloneDeep(users);
  //     const index = newData.findIndex((el) => el.id === dataRes.id);
  //     newData[index] = dataRes;
  //     // setNotifications(newData);
  //     setUsers(newData);

  //     return;
  //   }
  //   isLoadingTable.setValue(true);
  //   if (page.value !== 1) {
  //     page.setValue(1);
  //     return;
  //   }
  //   getUsers();
  // };

  const handleChangeSelectOs = (value: SelectToSendDetail) => {
    setOsSelect(value);
    isLoadingTable.setValue(true);
  };
  const handleChangeSentSelect = (value: SentSelectDetail) => {
    setSentSelect(value);
    isLoadingTable.setValue(true);
  };
  // const handleOpenUpdateList =
  //   (key: "edit" | "delete" | "view-detail", value: NotificationDetail) =>
  //   () => {
  //     if (key !== "view-detail" && value.send) {
  //       return;
  //     }
  //     setFormDataNotification(value);
  //     switch (key) {
  //       case "edit":
  //         openFormUpdate.setValue(true);
  //         break;
  //       case "delete":
  //         openFormDestroy.setValue(true);
  //         break;
  //       case "view-detail":
  //         openViewDetail.setValue(true);
  //         break;
  //     }
  //   };

  const handleOpenUpdateList =
    (key: "edit" | "delete" | "view-detail", value: UserCharacterDetail) =>
    () => {
      console.log("key:", key);
      if (key !== "view-detail" && value.id) {
        return;
      }
      // setFormDataUser(value);
      setFormDataUserCharacter(value);
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

  const handleOpenFormAdd = () => {
    openFormAdd.setValue(true);
    setFormDataUser(emptyUserDetail);
  };
  const onCloseViewDetail = () => {
    openViewDetail.setValue(false);
    setFormDataUser(emptyUserDetail);
  };

  return (
    <PageLayout
      title="User-Character"
      childrenAction={
        <div className="flex items-center justify-between h-full pr-8">
          {/* <ButtonDefault widthButton="w-140-custom" onClick={handleOpenFormAdd}>
            Add notification
          </ButtonDefault> */}

          <div className="flex items-center">
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
            />
            <SelectDefault
              options={ListOptionToSendSelect}
              selectedOption={osSelect}
              handleChange={handleChangeSelectOs}
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
              placeholder="walletAddress"
              search={search.value}
              handleChangeInputSearch={handleChangeInputSearch}
            />
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
        data={userCharacters.length ? userCharacters : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />
      {openFormAdd.value ? (
        <FormDialog
          onClose={() => openFormAdd.setValue(false)}
          openPopup={openFormAdd.value}
          handleUpdateListNotification={handleUpdateListNotification}
          dataItem={formDataNotification}
        />
      ) : null}
      {openFormUpdate.value ? (
        <FormDialog
          onClose={() => openFormUpdate.setValue(false)}
          openPopup={openFormUpdate.value}
          // handleUpdateListNotification={handleUpdateListNotification}
          handleUpdateListNotification={handleUpdateListNotification}
          dataItem={formDataNotification}
        />
      ) : null}
      {openFormDestroy.value ? (
        <DestroyDialog
          url={`/api/notifications/${formDataNotification.id}`}
          label="Destroy notification"
          message="Destroy notification successfully!"
          handleUpdateWhenDestroy={handleUpdateListNotification}
          onClose={() => openFormDestroy.setValue(false)}
          openPopup={openFormDestroy.value}
        />
      ) : null}
      {openViewDetail.value ? (
        <ViewDetail
          dataItem={formDataNotification}
          openPopup={openViewDetail.value}
          onClose={onCloseViewDetail}
        />
      ) : null}
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>
  );
};

export default UserCharacterPage;
