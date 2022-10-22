import React, { useEffect, useState } from 'react';
import DialogCard from 'components/Dialog/DialogCard';
import { getSystemStarMiddleware } from '../../stars/services/api';
import InputDefault from 'components/Input/InputDefault';
import { useTable, useFilter } from 'helpers/hooks';
import { ORDER_DIRECTION } from 'types';
import Axios from 'axios';
import { showNotification } from 'helpers/util';
import '../styles/index.css';
import BackdropCustomize from 'components/BackdropCustomize';
import { getArrayStarIdMiddleware } from '../services/api';
import { useBoolean } from 'helpers/hooks';
const FormSelectNewTreasure = ({ openForm, onClose, starId, handleChange, }) => {
    const isLoading = useBoolean();
    const { handleChangeInputSearch, orderBy, orderDirection, page, search, searchParamRequest, total, isLoadingTable, isLoadingPage, } = useTable('createdAt', ORDER_DIRECTION.ASC);
    const { filter } = useFilter(page, isLoadingTable);
    const [systemStars, setSystemStars] = useState([]);
    const [arrayStarId, setArrayStarId] = useState([]);
    useEffect(() => {
        const source = Axios.CancelToken.source();
        getSystemStar(source);
        getArrayStarId(source);
        return () => source.cancel();
    }, [
        page.value,
        searchParamRequest.value,
        orderBy.value,
        orderDirection.value,
        filter,
    ]);
    const getArrayStarId = async (source) => {
        const dataRes = await getArrayStarIdMiddleware(source);
        setArrayStarId(dataRes);
    };
    const getSystemStar = async (source) => {
        try {
            isLoading.setValue(true);
            const params = {
                limit: 100,
                page: 1,
                search: searchParamRequest.value,
            };
            if (orderBy.value) {
                params.orderBy = orderBy.value;
                params.orderDirection = orderDirection.value;
            }
            if (filter.owner_status?.length) {
                params.owner_status = filter.owner_status;
            }
            if (filter.market_status?.length) {
                params.market_status = filter.market_status;
            }
            if (filter.types?.length) {
                params.types = filter.types;
            }
            const dataRes = await getSystemStarMiddleware(params, source);
            total.setValue(dataRes ? dataRes.total : 0);
            setSystemStars(dataRes ? dataRes.items : []);
            cleanStateRequest();
        }
        catch (error) {
            if (!Axios.isCancel(error)) {
                cleanStateRequest();
                showNotification('error', 'Server Error');
            }
        }
        finally {
            isLoading.setValue(false);
        }
    };
    const cleanStateRequest = () => {
        isLoadingPage.setValue(false);
        isLoadingTable.setValue(false);
    };
    return (<DialogCard openPopup={openForm} title='Select New Treasure' handleCLoseDialog={onClose} rootStyle={{
            width: '90vw',
            height: '60vh',
            overflow: 'auto',
        }}>
      <div style={{ width: '240px', position: 'relative', marginBottom: '22px' }}>
        <InputDefault value={search.value} onChange={handleChangeInputSearch} placeholder='Search...' classInput='bg-gray-02-custom rounded-xl pl-4 pr-4 border-0 font-medium text-xs-custom'/>
      </div>
      <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        }}>
        {systemStars.map((item, index) => {
            const checkStarId = () => arrayStarId.find((arr) => arr === item.id);
            return (<div className='treasure-selectStar' style={checkStarId()
                    ? {
                        background: 'transparent',
                        opacity: 0.2,
                        userSelect: 'none',
                        cursor: 'unset',
                    }
                    : {
                        background: item.id === starId ? '#8080807a' : 'transparent',
                    }} onClick={() => {
                    if (!checkStarId()) {
                        handleChange(item.id);
                        onClose();
                    }
                }} key={index}>
              <div style={{
                    backgroundImage: `url(${item.imgUrl})`,
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    marginLeft: '5px',
                }}></div>
              <div className='ml-3'>
                <p style={{
                    fontWeight: 'bold',
                    fontSize: '17px',
                }}>
                  {item.name}
                </p>
                <p>{item.model}</p>
              </div>
            </div>);
        })}
      </div>
      {isLoading.value ? <BackdropCustomize /> : null}
    </DialogCard>);
};
export default FormSelectNewTreasure;
