import BackdropCustomize from 'components/BackdropCustomize';
import Table from 'components/Table/Table';
import { useBoolean, useTable } from 'helpers/hooks';
import PageLayout from 'pages/layout/organisms/PageLayout';
import { useEffect, useState } from 'react';
import {
  emptyEventDetail,
  EventDetail,
  ListEventStatusSelect,
  ParamsRequest,
  SelectEventStatusProp,
} from './types';
import ButtonDefault from 'components/Button/ButtonDefault';
import FormDialog from './organisms/FormDialog';
import { cloneDeep } from 'lodash';
import DestroyDialog from 'components/Dialog/DestroyDialog';
import { dataHeaderEvent } from './utils';
import { getEventsMiddleware, putPauseEvent } from './services/api';
import ViewDetail from './organisms/ViewDetail';
import Axios, { CancelTokenSource } from 'axios';
import { showNotification } from 'helpers/util';
import { STATUS_RESPONSE_CODE } from 'types';
import SelectDefault from 'components/Select/SelectDefault';

const EventPage = (): JSX.Element => {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const openFormAdd = useBoolean();
  const openFormUpdate = useBoolean();
  const openFormDestroy = useBoolean();
  const openFormViewDetail = useBoolean();

  const [eventStatusSelect, setEventStatusSelect] =
    useState<SelectEventStatusProp>(ListEventStatusSelect[0]);

  const [formDataEvent, setFormDataEvent] =
    useState<EventDetail>(emptyEventDetail);

  const {
    handleChangePage,
    limit,
    orderBy,
    orderDirection,
    page,
    searchParamRequest,
    total,
    handleChangeSort,
    isLoadingPage,
    isLoadingTable,
  } = useTable();

  useEffect(() => {
    const source: CancelTokenSource = Axios.CancelToken.source();
    getEvents(source);
    return () => source.cancel();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page.value,
    searchParamRequest.value,
    orderBy.value,
    orderDirection.value,
    eventStatusSelect,
  ]);

  const getEvents = async (source?: CancelTokenSource) => {
    try {
      const params: ParamsRequest = {
        limit: limit.value,
        page: page.value,
        search: searchParamRequest.value,
        status: eventStatusSelect.value,
      };
      if (orderBy.value) {
        params.orderBy = orderBy.value;
        params.orderDirection = orderDirection.value;
      }
      const dataRes = await getEventsMiddleware(params, source);
      setEvents(dataRes.items);
      total.setValue(dataRes.total);
      cleanStateRequest();
    } catch (error) {
      if (!Axios.isCancel(error)) {
        cleanStateRequest();
        showNotification('error', 'Server Error');
      }
    }
  };

  const cleanStateRequest = () => {
    isLoadingPage.setValue(false);
    isLoadingTable.setValue(false);
  };

  const handleUpdateListEvent = (dataRes?: EventDetail) => {
    if (dataRes) {
      const newData = cloneDeep(events);
      const index = newData.findIndex((el) => el.id === dataRes.id);
      newData[index] = dataRes;
      setEvents(newData);
      return;
    }
    isLoadingTable.setValue(true);
    if (page.value !== 1) {
      page.setValue(1);
      return;
    }
    getEvents();
  };

  const handleOpenUpdateList =
    (key: 'edit' | 'delete' | 'viewDetail', value: EventDetail) => () => {
      setFormDataEvent(value);
      switch (key) {
        case 'edit':
          openFormUpdate.setValue(true);
          break;
        case 'delete':
          openFormDestroy.setValue(true);
          break;
        case 'viewDetail':
          openFormViewDetail.setValue(true);
          break;
      }
    };

  const handlePauseEvent = (value: EventDetail) => async () => {
    const request = {
      pause: !value.send,
    };
    isLoadingTable.setValue(true);
    putPauseEvent(
      value.id,
      request,
      (status: STATUS_RESPONSE_CODE, dataRes?: EventDetail) => {
        isLoadingTable.setValue(false);
        if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
          handleUpdateListEvent(dataRes);
          showNotification(
            'success',
            `${value.send ? 'Pause' : 'Resume'} event successfully!`
          );
        }
      }
    );
  };

  const handleOpenFormAdd = () => {
    openFormAdd.setValue(true);
    setFormDataEvent(emptyEventDetail);
  };

  const handleSelectEventStatus = (event: SelectEventStatusProp) => {
    isLoadingTable.setValue(true);
    setEventStatusSelect(event);
  };

  return (
    <PageLayout
      title='Events'
      childrenAction={
        <div className='flex items-center justify-between h-full pr-8'>
          <ButtonDefault widthButton='w-140-custom' onClick={handleOpenFormAdd}>
            Add event
          </ButtonDefault>

          <div className='flex items-center'>
            <SelectDefault
              options={ListEventStatusSelect}
              selectedOption={eventStatusSelect}
              handleChange={handleSelectEventStatus}
              filed='name'
              rootClasses='mr-3 custom-select-param bg-gray-02-custom rounded-xl pl-4 border-0 font-medium text-xs-custom'
              styleSingleValue={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
                maxWidth: 'inherit',
              }}
              styleControl={{
                borderBottom: 'none',
              }}
            />
          </div>
        </div>
      }
    >
      <Table
        limit={limit.value}
        page={page.value}
        countItems={total.value}
        headers={dataHeaderEvent(handleOpenUpdateList, handlePauseEvent)}
        handleChangePage={handleChangePage}
        data={events.length ? events : []}
        handleChangeSort={handleChangeSort}
        orderBy={orderBy.value}
        orderDirection={orderDirection.value}
        isLoadingTable={isLoadingTable.value}
      />
      {openFormAdd.value ? (
        <FormDialog
          onClose={() => openFormAdd.setValue(false)}
          openPopup={openFormAdd.value}
          handleUpdateListEvent={handleUpdateListEvent}
          dataItem={formDataEvent}
        />
      ) : null}
      {openFormUpdate.value ? (
        <FormDialog
          onClose={() => openFormUpdate.setValue(false)}
          openPopup={openFormUpdate.value}
          handleUpdateListEvent={handleUpdateListEvent}
          dataItem={formDataEvent}
        />
      ) : null}
      {openFormDestroy.value ? (
        <DestroyDialog
          url={`/api/events/${formDataEvent.id}`}
          label='Destroy event'
          message='Destroy event successfully!'
          handleUpdateWhenDestroy={handleUpdateListEvent}
          onClose={() => openFormDestroy.setValue(false)}
          openPopup={openFormDestroy.value}
        />
      ) : null}
      {openFormViewDetail.value ? (
        <ViewDetail
          openPopup={openFormViewDetail.value}
          dataItem={formDataEvent}
          onClose={() => openFormViewDetail.setValue(false)}
        />
      ) : null}
      {isLoadingPage.value ? <BackdropCustomize /> : null}
    </PageLayout>
  );
};

export default EventPage;
