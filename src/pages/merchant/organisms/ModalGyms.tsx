import ButtonDefault from 'components/Button/ButtonDefault';
import DialogCard from 'components/Dialog/DialogCard';
import { useBoolean } from 'helpers/hooks';
import { getGymMiddleware } from 'pages/gym/services/api';
import MultiSelectInput from 'pages/package/molecules/MultiSelect';
import { updatePackageMiddleware } from 'pages/package/services/api';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { STATUS_RESPONSE_CODE } from 'types';
import TypographyItemCard from '../molecules/TypographyItemCard';

const ModalGyms = (props: any) => {
    const {
        openFormChange,
        onClose,
        handleUpdateList
    } = props;

    const [formUpdate, setFormUpdate] = useState({});
    const { gyms } = useSelector((state: any) => state.subject);
    const [optionGyms, setGyms] = useState<any>([]);

    const isLoading = useBoolean();

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
        // getGymMiddleware();
        gyms?.map((gym: any) => {
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
                width: "400px",
                maxHeight: "90%"
            }}
        >
            <div className="flex flex-col overflow-auto max-height-view-notification">
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
                <TypographyItemCard title="" label="phong gym quan 1" />
            </div>
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
                    style={{ marginTop: "20px" }}
                >
                    Add Gyms To Package
                </ButtonDefault>
            </div>
        </DialogCard>
    )
}

export default ModalGyms;