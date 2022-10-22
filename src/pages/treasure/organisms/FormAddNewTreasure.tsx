import BackdropCustomize from 'components/BackdropCustomize';
import IconAddAvatar from 'assets/images/icons/add-avatar.svg';
import { DEFAULT_IMAGE } from '../utils';
import ButtonDefault from 'components/Button/ButtonDefault';
import DialogCard from 'components/Dialog/DialogCard';
import InputDefault from 'components/Input/InputDefault';
import { useBoolean, useString } from 'helpers/hooks';
import { tokenContractOpitons, TYPE } from '../constants';
import React, { FC } from 'react';
import {
  postNewStar,
  updateImageStarMiddleware,
  getStarDetailMiddleware,
} from '../services/api';
import '../styles/index.css';
import { useState, useEffect } from 'react';
import { TypeTreasureOption } from '../types';
import { STATUS_RESPONSE_CODE } from 'types';
import { cloneDeep } from 'lodash';
import { defaultAddTreasureInput, FormAddNewTreasureProps } from '../types';
import FormSelectNewTreasure from './FormSelectStar';
import SelectDefault from 'components/Select/SelectDefault';
import Typography from 'components/Typography';
import '../styles/index.css';

const IMG_DEFAULT = 'https://taxidatviet.com/template/images/default-img.jpg';

export const FormAddNewTreasure: FC<FormAddNewTreasureProps> = ({
  openForm,
  onClose,
  item,
  headers,
  dataItem,
  onRefresh,
  handleChangeInputSearch,
}) => {
  const [treasureDetail, setTreasureDetail] = useState<any>(dataItem);
  // const newStatus = useString(dataItem.statusCode ?? "");
  const keyInputFile = useString();
  const openFormSelectTreasure = useBoolean();
  const [starDetail, setStarDetail] = useState<any>({});

  useEffect(() => {
    // newStatus.setValue(
    //   dataItem.statusCode ? dataItem.statusCode : DEFAULT_STATUS
    // );
    setTreasureDetail({
      ...dataItem,
    });
  }, [dataItem]);

  useEffect(() => {
    if (treasureDetail?.starId) {
      getDataStarDetail();
    }
  }, [treasureDetail?.starId]);

  const getDataStarDetail = async () => {
    const starData = await getStarDetailMiddleware(treasureDetail?.starId);
    setStarDetail(starData);
  };

  const isLoading = useBoolean();

  const onCloseDialog = () => {
    openFormSelectTreasure.setValue(false);
  };

  const handleChangeInput =
    (fieldName: string, subField?: string, splitValue = false) =>
    (e) => {
      const { value } = e.target;
      if (!subField) {
        setTreasureDetail({
          ...treasureDetail,
          [fieldName]: splitValue ? value.split(',') : value,
        });
      } else {
        setTreasureDetail({
          ...treasureDetail,
          [fieldName]: {
            ...treasureDetail[fieldName],
            [subField]: splitValue ? value.split(',') : value,
          },
        });
      }
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
    const newTreasure = cloneDeep(treasureDetail);
    // newTreasure.imgUrl = dataItem.imgUrl;
    setTreasureDetail(newTreasure);

    updateImageStarMiddleware(
      dataItem.id,
      {
        image: currentFiles[0],
      },
      (status: STATUS_RESPONSE_CODE, dataRes?: string | undefined) => {
        if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
          const newStar = cloneDeep(treasureDetail);
          newStar.imgUrl = dataRes;
          setTreasureDetail(newStar);
        }
        isLoading.setValue(false);
        setTreasureDetail({ ...treasureDetail, imgUrl: dataRes });
      }
    );
  };

  const onSubmitButton = () => {
    isLoading.setValue(true);
    const { name, description, starId, type, tokenContract, total, imgUrl } =
      treasureDetail;

    const request = {
      name,
      description,
      tokenContract,
      type,
      total: +total,
      starId: starId,
      imgUrl: imgUrl,
    };
    const onSuccess = () => {
      isLoading.setValue(false);
      setTreasureDetail(defaultAddTreasureInput);
      onClose();
      onRefresh?.();
    };

    const onError = () => {
      isLoading.setValue(false);
    };

    if (!item) {
      postNewStar(request, onSuccess, onError);
    } else {
      // updateStar(item.id, request, onSuccess, onError);
    }
  };

  const inputStyle: React.CSSProperties = {
    border: '1px solid #e5e5e5',
    backgroundColor: 'rgba(0,0,0,0.01)',
    borderRadius: '4px',
    padding: '0px 10px',
    marginTop: 5,
  };

  const getImage = () => {
    if (treasureDetail.imgUrl) {
      return treasureDetail.imgUrl;
    }
    return IMG_DEFAULT;
  };

  const onSelectChangeType = (value: TypeTreasureOption) => {
    setTreasureDetail({ ...treasureDetail, type: value.value });
  };
  const onSelectChangeTokenContract = (value: TypeTreasureOption) => {
    setTreasureDetail({
      ...treasureDetail,
      tokenContract: value.value,
    });
  };

  const isDisabled =
    !treasureDetail?.imgUrl ||
    !treasureDetail?.name ||
    !treasureDetail?.description ||
    !treasureDetail?.tokenContract ||
    !treasureDetail?.total ||
    !treasureDetail?.starId;

  return (
    <DialogCard
      openPopup={openForm}
      disablePopup
      handleCLoseDialog={onClose}
      title={item ? 'Update treasure' : `Add new treasure`}
      size='md'
      rootStyle={{
        width: '90vw',
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <p
        style={{
          color: 'rgba(239, 68, 68)',
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        *Please ensure that the data entered matches the actual data.
      </p>
      <p
        style={{
          marginBottom: 20,
          width: 'fit-content',
          color: '#1a1f36',
          fontSize: 20,
          letterSpacing: 0.6,
        }}
      >
        Basic information
      </p>
      <div className='grid grid-cols-5 mb-6 gap-5'>
        <InputDefault
          label='Name'
          required
          value={treasureDetail.name}
          onChange={handleChangeInput('name')}
          placeholder='Sun'
          inputStyle={inputStyle}
        />
        <InputDefault
          label='Description'
          value={treasureDetail.description}
          onChange={handleChangeInput('description')}
          placeholder=''
          inputStyle={inputStyle}
        />
        <SelectDefault
          label='Token Contract'
          required
          options={tokenContractOpitons}
          handleChange={onSelectChangeTokenContract}
          styleControl={inputStyle}
          styleSingleValue={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            maxWidth: 'inherit',
          }}
          controlWidth={1}
        />
        <InputDefault
          label='Total Reward'
          value={treasureDetail.total}
          onChange={handleChangeInput('total')}
          placeholder=''
          inputStyle={inputStyle}
        />
        <SelectDefault
          label='Treasure Type'
          required
          options={TYPE}
          handleChange={onSelectChangeType}
          styleControl={inputStyle}
          styleSingleValue={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 14,
            maxWidth: 'inherit',
          }}
          controlWidth={1}
        />
      </div>
      <div
        className='mb-6 mt-10 flex justify-between w-full'
        style={{ display: 'flex' }}
      >
        <div className='flex  items-center border-2' style={{ padding: 10 }}>
          <div className='treasure-show'>
            {starDetail.id ? (
              <div
                style={{
                  backgroundImage: `url(${starDetail?.imgUrl})`,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                }}
              ></div>
            ) : (
              <img
                style={{
                  backgroundImage: `url(${starDetail?.imgUrl})`,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                }}
                src='https://i.pinimg.com/originals/66/31/a8/6631a844feea41e8b0100d6512a11e04.jpg'
                alt='default planet'
              />
            )}
            <div className='ml-2 mr-5'>
              <p
                style={{
                  // width: '100px',
                  // height: '20px',
                  fontWeight: 'bold',
                  fontSize: '17px',
                }}
              >
                {starDetail.id ? starDetail?.name : 'Name Star'}
              </p>
              {starDetail.id ? <p>{starDetail?.model}</p> : <p>Model Star</p>}
            </div>
          </div>
          <button
            onClick={() => openFormSelectTreasure.setValue(true)}
            className='border-2 rounded cursor-pointer py-3 px-10'
          >
            <Typography
              fontWeight='font-semibold'
              textColor='text-gray-custom'
              textClass='text-xs'
            >
              Select Star
            </Typography>
          </button>
        </div>
        <div className='relative'>
          <img
            src={getImage()}
            style={{
              maxWidth: 200,
              maxHeight: 200,
              borderRadius: 5,
              marginLeft: 'auto',
            }}
          />
          <React.Fragment>
            <input
              id='container-files'
              onChange={fileSelectedHandler}
              accept={'image*'}
              type='file'
              style={{ display: 'none' }}
              key={keyInputFile.value || ''}
            />
            <label htmlFor='container-files'>
              <div>
                <img
                  src={IconAddAvatar}
                  alt='icon'
                  className='absolute bottom-2 right-2 cursor-pointer'
                />
              </div>
            </label>
          </React.Fragment>
        </div>
        <FormSelectNewTreasure
          openForm={openFormSelectTreasure.value}
          onClose={onCloseDialog}
          headers={headers}
          handleChange={(idTemp) => {
            if (treasureDetail.starId === idTemp) {
              setTreasureDetail({ ...treasureDetail, starId: '' });
            } else {
              setTreasureDetail({
                ...treasureDetail,
                starId: idTemp,
              });
            }
          }}
          starId={treasureDetail.starId}
          handleChangeInputSearch={handleChangeInputSearch}
        />
      </div>
      <ButtonDefault
        widthButton='w-140-custom'
        onClick={onSubmitButton}
        disabled={isDisabled}
        style={{
          minHeight: 37,
        }}
      >
        {item ? 'Update' : 'Add'}
      </ButtonDefault>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>
  );
};
