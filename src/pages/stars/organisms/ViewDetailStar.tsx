/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Popup from 'reactjs-popup';
import IconClose from 'assets/images/icons/close.svg';
import Typography from 'components/Typography';
import React, { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_STATUS,
  ParamsStarHistoryRequest,
  StarDetail,
  StarInfo,
  ViewDetailStarProps,
} from '../types';
import StatusStarCard from '../molecules/StatusStarCard';
import { useBoolean, useString } from 'helpers/hooks';
import { STATUS_RESPONSE_CODE } from 'types';
import {
  getHistoryStarMiddleware,
  updateImagePreviewStarMiddleware,
  updateImageStarMiddleware,
  updateStatusStarMiddleware,
} from '../services/api';
import { cloneDeep, concat } from 'lodash';
import BackdropCustomize from 'components/BackdropCustomize';
import UpdateStatusStar from '../molecules/UpdateStatusStar';
import NameRegisterCard from './NameRegisterCard';
import OwnerStarCard from './OwnerStarCard';
import MarketStarCard from './MarketStarCard';
import ImagePreviewCard from './ImagePreviewCard';
import FormSetCostStarDetail from './FormSetCostStarDetail';
import FormChangeNameRegister from './FormChangeNameRegister';
import HistoryDefaultCard from 'components/History/HistoryDefaultCard';
import { HistoryDefaultDetail } from 'components/History/types';

const ViewDetailStar = (props: ViewDetailStarProps): JSX.Element => {
  const { dataItem, handleUpdateSystemStarWhenOpenViewDetail, openViewDetail } =
    props;
  const refHistory = useRef<any>(null);
  const newStatus = useString(dataItem.status ?? '');
  const isLoading = useBoolean();
  const [starDetail, setStarDetail] = useState(dataItem);
  const popupUpdateRef = useRef<any>();
  const popupUpdateNameRegister = useRef<any>();
  const keyInputFileImagePreview = useString();
  const keyInputFile = useString();
  const [histories, setHistories] = useState<HistoryDefaultDetail[]>([]);
  const [paramsHistory, setParamsHistory] = useState<ParamsStarHistoryRequest>({
    limit: 20,
    page: 1,
  });
  const isLoadMoreHistory = useBoolean();
  const isLoadingPageHistory = useBoolean();
  useEffect(() => {
    newStatus.setValue(dataItem.status ? dataItem.status : DEFAULT_STATUS);
    setStarDetail({
      ...dataItem,
      status: dataItem.status ? dataItem.status : DEFAULT_STATUS,
    });
  }, [dataItem]);

  useEffect(() => {
    if (!dataItem.nftId) {
      return;
    }
    isLoading.setValue(true);
    getHistory();
  }, [dataItem.nftId]);

  const getHistory = async () => {
    try {
      const dataHistoryResponse = await getHistoryStarMiddleware(
        dataItem.nftId,
        paramsHistory
      );
      if (dataHistoryResponse.items.length) {
        setHistories(dataHistoryResponse.items);
        isLoadMoreHistory.setValue(
          dataHistoryResponse.items.length === paramsHistory.limit
            ? true
            : false
        );
      }
      isLoading.setValue(false);
    } catch (error) {
      isLoading.setValue(false);
    }
  };

  const handleClose = () => {
    handleUpdateSystemStarWhenOpenViewDetail({
      id: starDetail.id,
      status: starDetail.status,
      nameRegister: starDetail.nameRegister,
      imgUrl: starDetail.imgUrl,
      imgUrlPreview: starDetail.imgUrlPreview,
      purchasePrice: starDetail.purchasePrice,
      info: starDetail.info,
    });
  };

  const handleChangeStatus = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    newStatus.setValue(event.target.value);
  };

  const handleClosePopupUpdateStatus = () => {
    popupUpdateRef.current.close();
    newStatus.setValue(starDetail.status ? starDetail.status : DEFAULT_STATUS);
  };

  const onSubmitUpdateStatus = () => {
    if (!dataItem.id) {
      return;
    }
    isLoading.setValue(true);
    updateStatusStarMiddleware(
      dataItem.id,
      {
        status: newStatus.value,
      },
      (status: STATUS_RESPONSE_CODE) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS) {
          const newStar = cloneDeep(starDetail);
          newStar.status = newStatus.value;
          setStarDetail(newStar);
          popupUpdateRef.current.close();
        }
        isLoading.setValue(false);
      }
    );
  };

  const fileSelectedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles: any = [];
    if (event.target.files) {
      for (const [, file] of Object.entries(event.target.files)) {
        currentFiles.push(file);
      }
    }
    keyInputFile.setValue(Math.random().toString(36));
    isLoading.setValue(true);
    updateImageStarMiddleware(
      dataItem.id,
      {
        image: currentFiles[0],
      },
      (status: STATUS_RESPONSE_CODE, dataRes?: StarDetail) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
          const newStar = cloneDeep(starDetail);
          newStar.imgUrl = dataRes.imgUrl;
          setStarDetail(newStar);
        }
        isLoading.setValue(false);
      }
    );
  };
  const fileSelectedHandlerImagePreview = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentFiles: any = [];
    if (event.target.files) {
      for (const [, file] of Object.entries(event.target.files)) {
        currentFiles.push(file);
      }
    }
    keyInputFileImagePreview.setValue(Math.random().toString(36));
    isLoading.setValue(true);

    updateImagePreviewStarMiddleware(
      dataItem.id,
      {
        imagePreview: currentFiles[0],
      },
      (status: STATUS_RESPONSE_CODE, dataRes?: StarDetail) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
          const newStar = cloneDeep(starDetail);
          newStar.imgUrlPreview = dataRes.imgUrlPreview;
          setStarDetail(newStar);
        }
        isLoading.setValue(false);
      }
    );
  };
  const updateStarDetailWhenSetCost = (minPrice: string) => {
    const newStar = cloneDeep(starDetail);
    newStar.purchasePrice = minPrice;
    setStarDetail(newStar);
  };
  const updateStarDetailWhenUpdateBIO = (dataRes: StarInfo) => {
    const newStar = cloneDeep(starDetail);
    newStar.info = dataRes;
    setStarDetail(newStar);
  };
  const updateStarDetailWhenUpdateNameRegister = (newName: string) => {
    const newStar = cloneDeep(starDetail);
    newStar.nameRegister = newName;
    setStarDetail(newStar);
  };

  const onScroll = async () => {
    if (!dataItem.nftId || !isLoadMoreHistory.value) {
      return;
    }
    if (refHistory.current) {
      const { scrollTop, scrollHeight, clientHeight } = refHistory.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setParamsHistory({
          ...paramsHistory,
          page: paramsHistory.page + 1,
        });

        const newParams: ParamsStarHistoryRequest = {
          limit: paramsHistory.limit,
          page: paramsHistory.page + 1,
        };
        isLoadingPageHistory.setValue(true);
        const dataHistoryResponse = await getHistoryStarMiddleware(
          dataItem.nftId,
          newParams
        );
        isLoadingPageHistory.setValue(false);
        if (dataHistoryResponse.items.length) {
          const oldHistories = cloneDeep(histories);
          const newHistories = concat(oldHistories, dataHistoryResponse.items);
          setHistories(newHistories);
          isLoadMoreHistory.setValue(
            dataHistoryResponse.items.length === paramsHistory.limit
              ? true
              : false
          );
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Popup open={openViewDetail} className='dialog' nested modal disabled>
        <div className='view-dialog-body-star'>
          <div className='flex justify-between mb-3 pr-30-custom'>
            <div className='flex flex-col'>
              <div className='flex items-center pb-2'>
                <Typography
                  variant='h3'
                  fontWeight='font-bold'
                  textColor='text-primary-custom'
                >
                  {dataItem.name}
                </Typography>
                {starDetail.nameRegister ? (
                  <Typography
                    variant='h5'
                    fontWeight='font-bold'
                    textColor='text-gray-custom'
                    textClass='ml-2'
                  >
                    ( {starDetail.nameRegister} )
                  </Typography>
                ) : null}
              </div>
              {dataItem.nftId ? (
                <StatusStarCard title={starDetail.status} isUpdate={false} />
              ) : (
                <UpdateStatusStar
                  handleChangeStatus={handleChangeStatus}
                  onSubmitUpdateStatus={onSubmitUpdateStatus}
                  handleClosePopupUpdateStatus={handleClosePopupUpdateStatus}
                  popupUpdateRef={popupUpdateRef}
                  oldStatus={starDetail.status}
                  newStatus={newStatus.value}
                />
              )}
            </div>
            <div className='flex items-start'>
              <img
                src={IconClose}
                alt='icon'
                className='cursor-pointer'
                onClick={handleClose}
              />
            </div>
          </div>

          <div className='grid grid-body-view-star-detail'>
            <div className='max-height-dialog'>
              <NameRegisterCard
                starDetail={starDetail}
                dataItem={dataItem}
                keyInputFile={keyInputFile.value}
                popupUpdateNameRegister={popupUpdateNameRegister}
                fileSelectedHandler={fileSelectedHandler}
              />
              {dataItem.market || dataItem.owner ? (
                <OwnerStarCard
                  market={dataItem.market}
                  owner={dataItem.owner}
                  ownerBoughtAt={dataItem.ownerBoughtAt}
                  purchasePrice={dataItem.purchasePrice}
                />
              ) : null}
              {!dataItem.nftId ? (
                <FormSetCostStarDetail
                  purchasePrice={starDetail.purchasePrice}
                  updateStarDetailWhenSetCost={updateStarDetailWhenSetCost}
                  id={dataItem.id}
                />
              ) : null}
              {!dataItem.nftId ? (
                <FormChangeNameRegister
                  oldNameRegister={
                    starDetail.nameRegister ? starDetail.nameRegister : ''
                  }
                  idStar={dataItem.id}
                  updateStarDetailWhenUpdateNameRegister={
                    updateStarDetailWhenUpdateNameRegister
                  }
                />
              ) : null}
            </div>
            <div
              className='pr-30-custom max-height-dialog'
              onScroll={onScroll}
              ref={refHistory}
            >
              <div
                className={`flex flex-col p-4 card-info-star min-h-524-custom`}
              >
                <ImagePreviewCard
                  starDetail={starDetail}
                  fileSelectedHandlerImagePreview={
                    fileSelectedHandlerImagePreview
                  }
                  keyInputFileImagePreview={keyInputFileImagePreview.value}
                  dataItem={dataItem}
                  updateStarDetailWhenUpdateBIO={updateStarDetailWhenUpdateBIO}
                />
              </div>
              {dataItem.market ? (
                <div className='card-info-star p-4 mt-8'>
                  <MarketStarCard
                    dataItem={dataItem.market}
                    nameLinked={dataItem.keyword ? dataItem.keyword.name : ''}
                    title={'Include with Keyword:'}
                  />
                </div>
              ) : null}
              {dataItem.nftId && histories.length ? (
                <HistoryDefaultCard
                  dataItem={histories}
                  isLoading={isLoadingPageHistory.value}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Popup>
      {isLoading.value ? <BackdropCustomize /> : null}
    </React.Fragment>
  );
};
export default ViewDetailStar;
