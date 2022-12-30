/* eslint-disable react-hooks/exhaustive-deps */
import PageLayout from "pages/layout/organisms/PageLayout";
import { useEffect, useState } from "react";
import MenuLegal from "./organisms/MenuLegal";
import { useBoolean } from "helpers/hooks";
import { LegalPageDetail, TYPE_LEGAL } from "./types";
import {
    getSettingLegalMiddleware,
    updateSettingLegalMiddleware,
} from "./services/api";
import BackdropCustomize from "components/BackdropCustomize";
import ButtonDefault from "components/Button/ButtonDefault";
import InputEditor from "components/Input/InputEditor";
import { ReactComponent as IconEdit } from "assets/images/icons/edit.svg";
import { ReactComponent as CloseChangeLegal } from "assets/images/icons/close-change-legal.svg";

import draftToHtmlPuri from "draftjs-to-html";
import { STATUS_RESPONSE_CODE } from "types";

const legalPage = (): JSX.Element => {
    const [activeMenu, setActiveMenu] = useState({
        index: 0,
        field: TYPE_LEGAL.TERMS,
    });
    const isLoading = useBoolean();

    const [originLegal, setOriginLegal] = useState({
        Terms: "",
        Policy: "",
        Medican: ""
    });

    const [formUpdateHtmlLegal, setFormUpdateHtmlLegal] = useState({
        Terms: "",
        Policy: "",
        Medican: ""
    });

    const [formEditorLegal, setFormEditorLegal] = useState({
        Terms: "",
        Policy: "",
        Medican: ""
    });

    const openFromUpdate = useBoolean();

    useEffect(() => {
        getLegalPage();
    }, []);

    const getLegalPage = async () => {
        isLoading.setValue(true);
        const calls: Promise<LegalPageDetail>[] = [];

        calls.push(getSettingLegalMiddleware(TYPE_LEGAL.TERMS));
        calls.push(getSettingLegalMiddleware(TYPE_LEGAL.PRIVACY_POLICY));
        calls.push(getSettingLegalMiddleware(TYPE_LEGAL.MEDICAN));

        const [
            dataResTerm,
            dataResPolicy,
            dataResMedican
        ] = await Promise.all(calls);

        const newTerm =
            (dataResTerm && dataResTerm.value)
                ? dataResTerm.value : ""

        // : DataDefaultLegal.terms;
        const newPolicy =
            dataResPolicy && dataResPolicy.value
                ? dataResPolicy.value : ""

        const newMedican =
            dataResMedican && dataResMedican.value
                ? dataResMedican.value : ""
        // : DataDefaultLegal.policy;

        setOriginLegal({
            Terms: newTerm,
            Policy: newPolicy,
            Medican: newMedican
        });
        setFormUpdateHtmlLegal({
            Terms: newTerm,
            Policy: newPolicy,
            Medican: newMedican
        });
        setFormEditorLegal({
            Terms: newTerm,
            Policy: newPolicy,
            Medican: newMedican
        });

        isLoading.setValue(false);
    };

    const handleChangeMenu = (newIndex: number, newField: TYPE_LEGAL) => () => {
        setActiveMenu({
            index: newIndex,
            field: newField,
        });
        openFromUpdate.setValue(false);
        setFormEditorLegal({
            ...formEditorLegal,
            [activeMenu.field]: originLegal[activeMenu.field],
        });
        setFormUpdateHtmlLegal({
            ...formUpdateHtmlLegal,
            [activeMenu.field]: originLegal[activeMenu.field],
        });
    };

    const renderTitle = () => {
        let newValue = "Terms of Service";

        switch (activeMenu.field) {
            case TYPE_LEGAL.PRIVACY_POLICY:
                newValue = "Privacy Policy";
                break;
            case TYPE_LEGAL.MEDICAN:
                newValue = "Medican";
                break;
        }
        return newValue;
    };

    const handleChangeEditor = (description: string) => {
        // valueEditor.setValue(description);
        const htmlPuri = draftToHtmlPuri(JSON.parse(description)).replaceAll(
            "<p></p>",
            '<p style="display: inline-block"></p>'
        );
        setFormEditorLegal({
            ...formEditorLegal,
            [activeMenu.field]: description,
        });
        setFormUpdateHtmlLegal({
            ...formUpdateHtmlLegal,
            [activeMenu.field]: htmlPuri
                .replaceAll(
                    `<ol>`,
                    `<ol style="list-style-type: decimal; padding-left: 40px;">`
                )
                .replaceAll(
                    `<ul>`,
                    `<ul style="list-style-type: disc; padding-left: 40px;">`
                )
                .replaceAll("background-color: rgb(255,255,255);", ""),
        });
    };

    const handleUpdateData = (dataRes: LegalPageDetail) => {
        setOriginLegal({
            ...originLegal,
            [activeMenu.field]: dataRes.value,
        });
    };

    const handleOpenFormUpdate = () => {
        openFromUpdate.setValue(true);
        setFormEditorLegal({
            ...formEditorLegal,
            [activeMenu.field]: originLegal[activeMenu.field],
        });
        setFormUpdateHtmlLegal({
            ...formUpdateHtmlLegal,
            [activeMenu.field]: originLegal[activeMenu.field],
        });
    };

    const onUpdateLegalPage = () => {
        isLoading.setValue(true);
        updateSettingLegalMiddleware(
            activeMenu.field,
            renderTitle(),
            {
                name: activeMenu.field,
                value: formUpdateHtmlLegal[activeMenu.field],
            },
            (status: STATUS_RESPONSE_CODE, dataRes?: LegalPageDetail) => {
                isLoading.setValue(false);
                if (status === STATUS_RESPONSE_CODE.SUCCESS && dataRes) {
                    handleUpdateData(dataRes);
                    openFromUpdate.setValue(false);
                }
            }
        );
    };

    const handleCloseFormUpdate = () => {
        openFromUpdate.setValue(false);
    };

    return (
        <PageLayout
            title="Legal Page"
            childrenAction={
                <div className="flex items-center justify-between h-full pr-8">
                    <MenuLegal
                        active={activeMenu.index}
                        handleChangeMenu={handleChangeMenu}
                    />
                    {openFromUpdate.value ? (
                        <ButtonDefault
                            widthButton="w-180-custom"
                            onClick={onUpdateLegalPage}
                        >
                            Save
                        </ButtonDefault>
                    ) : null}
                </div>
            }
        >
            <div className="flex h-full">
                <div
                    style={{
                        width: !openFromUpdate.value ? "0px" : "calc(100% - 414px)",
                        transition: "0.4s width ease-out",
                    }}
                >
                    <div className="pr-8 h-full">
                        <div className="h-full">
                            {openFromUpdate.value ? (
                                <InputEditor
                                    value={formEditorLegal[activeMenu.field]}
                                    setValue={handleChangeEditor}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        width: openFromUpdate.value ? 414 : "100%",
                        transition: "0.4s width ease-out",
                    }}
                    className="pl-8 pb-8 pt-8 root-toggle-card relative"
                >
                    <div
                        style={{
                            overflow: "auto",
                            height: "100%",
                        }}
                    >
                        <div
                            className="pr-8 editor-container"
                            dangerouslySetInnerHTML={{
                                __html: openFromUpdate.value
                                    ? formUpdateHtmlLegal[activeMenu.field]
                                    : originLegal[activeMenu.field],
                            }}
                        />
                    </div>
                    <div
                        onClick={
                            !openFromUpdate.value
                                ? handleOpenFormUpdate
                                : handleCloseFormUpdate
                        }
                        className={`${openFromUpdate.value ? "bg-orange-custom" : "bg-blue-custom"
                            } h-35-custom w-35-custom rounded-full absolute top-3 right-3 flex items-center justify-center cursor-pointer svg-icon-edit-while`}
                    >
                        {openFromUpdate.value ? (
                            <CloseChangeLegal className="w-18-custom h-18-custom" />
                        ) : (
                            <IconEdit className="w-18-custom h-18-custom" />
                        )}
                    </div>
                </div>
            </div>
            {isLoading.value ? <BackdropCustomize /> : null}
        </PageLayout>
    );
};
export default legalPage;
