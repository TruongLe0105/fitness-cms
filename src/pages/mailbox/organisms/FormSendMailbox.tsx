import React, { useState, useEffect, FC } from 'react';
import Axios, { CancelTokenSource } from 'axios';

import DialogCard from 'components/Dialog/DialogCard';
import InputDefault from 'components/Input/InputDefault';
import SelectDefault from 'components/Select/SelectDefault';
import { useBoolean, useTable } from 'helpers/hooks';
import { ClientDetail, UserDetail } from 'pages/user-data/types';

import { SendToUserOptions } from '../constant';
import { FormSendMail, ParamsRequest, SendToOptions } from '../types';
import MultiSelectInput from './MultiSelect';
import { getUserMiddleware } from 'pages/user-data/services/api';
import MultipleInput from 'components/Input/Multiple';
import ButtonDefault from 'components/Button/ButtonDefault';
import { useSelector } from 'react-redux';
import { getPackageMiddleware } from 'pages/package/services/api';
import MultiImage from 'pages/gym/molecules/MultiImage';
import { getGymMiddleware } from 'pages/gym/services/api';
import { STATUS_RESPONSE_CODE } from 'types';
import { createMailbox } from '../services/api';

const FormSendMailbox: FC<FormSendMail> = (props) => {
    const { onClose, openFormChange, onRefetch } = props;
    const {
        limit,
        page,
    } = useTable();

    const [formInput, setFormInput] = useState({
        title: "",
        content: "",
        sendTo: "",
        includes: [],
        images: [],
        // gym: "",
        // package: "",
        // event: "",
    });
    const [options, setOptions] = useState<any>([]);
    const [optionsPackage, setOptionsPackage] = useState<any>([]);
    const [optionsGyms, setOptionsGyms] = useState<any>([]);

    const [disableMulti, setDisableMulti] = useState(false);

    const isLoading = useBoolean();

    const { users } = useSelector((state: any) => state.users);
    const { packages } = useSelector((state: any) => state.packages);
    const { gyms } = useSelector((state: any) => state.subject);

    useEffect(() => {
        const source: CancelTokenSource = Axios.CancelToken.source();
        const params: ParamsRequest = {
            limit: limit.value,
            page: page.value,
        };
        getUserMiddleware(params, source);
        getPackageMiddleware(params, source);
        getGymMiddleware(params, source);

        users?.map((user: any) => {
            const newOps = {
                label: user.name,
                value: user._id
            }
            options?.push(newOps);
        });

        packages?.map((el: any) => {
            const newOpsPackage = {
                label: el.name,
                value: el._id
            }
            optionsPackage?.push(newOpsPackage);
        });

        gyms?.map((el: any) => {
            const newOpsGyms = {
                label: el.name,
                value: el._id
            }
            optionsGyms?.push(newOpsGyms);
        });

        if (formInput.sendTo === "personal") {
            setDisableMulti(false);
        } else {
            setDisableMulti(true);
        }
    }, [users?.length, packages?.length, gyms?.length, formInput.sendTo]);

    const inputStyle: React.CSSProperties = {
        border: "1px solid #e5e5e5",
        backgroundColor: "rgba(0,0,0,0.01)",
        borderRadius: "4px",
        padding: "0px 10px",
        margin: "5 0"
    };

    const onSelectChange = (value: any) => {
        setFormInput({
            ...formInput,
            sendTo: value.value
        })
    };

    const handleChangeInputArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormInput({
            ...formInput,
            content: event.target.value
        })
    };

    const handleChangeInput =
        (key: "title") =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setFormInput({
                    ...formInput,
                    [key]: event.target.value,
                });
            }

    const isDisabledButton = () => {
        if (
            formInput.title.trim().length === 0 ||
            formInput.content.trim().length === 0 ||
            !formInput.sendTo
        ) {
            return true;
        }
        if (formInput.sendTo === "personal") {
            if (formInput.includes.length === 0) return true;
        }
        return false;
    };

    const onSubmitButton = () => {
        console.log("formInput", formInput);
        isLoading.setValue(true);
        createMailbox(formInput, (status: STATUS_RESPONSE_CODE) => {
            isLoading.setValue(false);
            if (status === STATUS_RESPONSE_CODE.SUCCESS) {
                onRefetch();
                onClose();
            }
        });
    }

    return (
        <DialogCard
            openPopup={openFormChange}
            disablePopup
            handleCLoseDialog={onClose}
            title="Create Mailbox"
            rootStyle={{
                width: "90vw",
                maxHeight: "90vh",
                overflow: "auto",
            }}
        >
            <div className="grid grid-cols-3 mb-6 gap-5">
                <InputDefault
                    label="Title"
                    required
                    rootClass="mb-6"
                    inputStyle={inputStyle}
                    onChange={handleChangeInput("title")}
                />
                <SelectDefault
                    label="Send To"
                    required
                    options={SendToUserOptions}
                    styleControl={inputStyle}
                    handleChange={onSelectChange}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                />
                <MultipleInput
                    label="Content"
                    required
                    rows={4}
                    onChange={handleChangeInputArea}
                />
            </div>
            <div className="grid grid-cols-3 mb-6 gap-5">
                <MultiSelectInput
                    required
                    label="User"
                    rootClasses="mb-6"
                    setFormInput={setFormInput}
                    formInput={formInput}
                    options={options}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                    disable={disableMulti}
                    inputType="user"
                />
                <MultiSelectInput
                    inputStyle={inputStyle}
                    label="Gym"
                    singleSelect={true}
                    options={optionsGyms}
                    setFormInput={setFormInput}
                    formInput={formInput}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                    inputType="gym"
                />
                <MultiSelectInput
                    inputStyle={inputStyle}
                    label="Package"
                    singleSelect={true}
                    options={optionsPackage}
                    setFormInput={setFormInput}
                    formInput={formInput}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                    inputType="package"
                />
            </div>
            <div className="grid grid-cols-3 mb-6 gap-5">
                <MultiSelectInput
                    inputStyle={inputStyle}
                    label="Event"
                    singleSelect={true}
                    options={optionsPackage}
                    setFormInput={setFormInput}
                    formInput={formInput}
                    styleSingleValue={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: 14,
                        maxWidth: "inherit",
                    }}
                    controlWidth={1}
                    inputType="package"
                />
            </div>
            <MultiImage
                setFormInput={setFormInput}
                formInput={formInput}
            />
            <ButtonDefault
                widthButton="w-140-custom"
                disabled={isDisabledButton()}
                onClick={onSubmitButton}
                style={{
                    minHeight: 37,
                }}
            >
                Send
            </ButtonDefault>
        </DialogCard>
    )
}

export default FormSendMailbox;