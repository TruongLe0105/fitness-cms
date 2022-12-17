import ButtonDefault from 'components/Button/ButtonDefault';
import DialogCard from 'components/Dialog/DialogCard';
import Table from 'components/Table/Table';
import { useBoolean, useTable } from 'helpers/hooks';
import { getGymMiddleware } from 'pages/gym/services/api';
import MultiSelectInput from 'pages/package/molecules/MultiSelect';
import { updatePackageMiddleware } from 'pages/package/services/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { STATUS_RESPONSE_CODE } from 'types';
import TypographyItemCard from '../molecules/TypographyItemCard';
import { dataHeaderUser } from '../utils';
import { dataHeaderModal } from '../utils/headerModal';

const ModalGyms = (props: any) => {
    const {
        openFormChange,
        onClose,
        handleUpdateList,
        data
    } = props;

    const [formUpdate, setFormUpdate] = useState(data);
    const { gyms } = useSelector((state: any) => state.subject);
    const [optionGyms, setGyms] = useState<any>([]);

    const isLoading = useBoolean();

    console.log("dataGyms", data)
    console.log("gyms", gyms)
    console.log("formUpdate", formUpdate)

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

    const onSubmitButton = () => {
        console.log("submit", formUpdate);
        isLoading.setValue(true);
        updatePackageMiddleware(formUpdate, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                handleUpdateList();
                onClose();
            }
        });
    };

    useEffect(() => {
        getGymMiddleware();
        const currentGymsId = data?.gym.map((el: any) => el._id);
        const filterGyms = gyms.filter((gym: any) => !currentGymsId.includes(gym._id));
        filterGyms?.map((gym: any) => {
            const newOps = {
                label: gym.name,
                value: gym._id
            }
            optionGyms.push(newOps)
        })
    }, [gyms.length]);

    const inputStyle: React.CSSProperties = {
        border: "1px solid #e5e5e5",
        backgroundColor: "rgba(0,0,0,0.01)",
        borderRadius: "4px",
        padding: "0px 10px",
        marginTop: 5,
    };

    return (
        <DialogCard
            openPopup={openFormChange}
            disablePopup
            handleCLoseDialog={onClose}
            title="Gói tập 1 tháng"
            rootStyle={{
                // width: "400px",
                width: "auto",
                maxHeight: "90%"
            }}
        >
            <div>
                <MultiSelectInput
                    label="Gyms"
                    inputType="gymId"
                    required
                    setFormInput={setFormUpdate}
                    formInput={formUpdate}
                    options={optionGyms}
                    styleControl={inputStyle}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <ButtonDefault
                    widthButton="w-140-custom"
                    onClick={onSubmitButton}
                    style={{ margin: "20px 0", }}
                >
                    Add Gyms To Package
                </ButtonDefault>
            </div>
            <div className="flex flex-col overflow-auto max-height-view-notification">
                <Table
                    limit={limit.value}
                    page={page.value}
                    countItems={total.value}
                    headers={dataHeaderModal()}
                    data={data?.gym}
                    handleChangePage={handleChangePage}
                    handleChangeSort={handleChangeSort}
                    orderBy={orderBy.value}
                    orderDirection={orderDirection.value}
                    isLoadingTable={isLoadingTable.value}
                />
            </div>
        </DialogCard>
    )
}

export default ModalGyms;