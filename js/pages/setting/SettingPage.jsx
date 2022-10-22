/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import { useBoolean } from "helpers/hooks";
import PageLayout from "pages/layout/organisms/PageLayout";
import React from "react";
import { useLocation } from "react-router-dom";
import { SettingContentWrapper } from "./molecules/SettingContentWrapper";
import Banners from "./organisms/Banners";
import KeywordCategoryPage from "./organisms/KeywordCategory";
import { LockStarMap } from "./organisms/LockStarMap";
import MenuSetting, { LIST_MENU_SETTING } from "./organisms/MenuTab";
import NumberOfTicket from "./organisms/NumberOfTicket";
import RewardCard from "./organisms/RewardCard";
import SetCostCard from "./organisms/SetCostCard";
import SupportEmail from "./organisms/SupportEmail";
import SettingVersion from "./organisms/Version";
import WhatNew from "./organisms/WhatNew";
import "./styles/index.css";
import { TYPE_SETTING } from "./types";
const SettingPage = () => {
    const location = useLocation();
    const defaultTab = location.state?.value;
    const defaultIndex = LIST_MENU_SETTING.findIndex((el) => el.field === defaultTab);
    const isLoading = useBoolean();
    const [activeMenu, setActiveMenu] = React.useState(!defaultTab || !defaultIndex
        ? {
            index: 0,
            field: TYPE_SETTING.LOCK_STAR_MAP,
        }
        : {
            index: defaultIndex,
            field: defaultTab,
        });
    const handleChangeMenu = (newIndex, newField) => () => {
        setActiveMenu({
            index: newIndex,
            field: newField,
        });
    };
    const renderBody = () => {
        switch (activeMenu.field) {
            case TYPE_SETTING.LOCK_STAR_MAP:
                return (<SettingContentWrapper title="" containerClass="flex items-center border-t border-b" titleClass="mr-3 title-mb-0" component={<LockStarMap isLoading={isLoading}/>}/>);
            case TYPE_SETTING.SET_BANNER:
                return (<SettingContentWrapper containerClass="border-b" title="" component={<Banners />}/>);
            case TYPE_SETTING.SET_PRICE:
                return (<SettingContentWrapper containerClass="border-b" title="" component={<SetCostCard />}/>);
            case TYPE_SETTING.SET_REWARD:
                return <SettingContentWrapper title="" component={<RewardCard />}/>;
            case TYPE_SETTING.SET_NUMBER_OF_TICKET:
                return (<SettingContentWrapper title="" component={<NumberOfTicket />}/>);
            case TYPE_SETTING.SET_VERSION:
                return (<SettingContentWrapper title="" component={<SettingVersion />}/>);
            case TYPE_SETTING.SET_SUPPORT_EMAIL:
                return <SettingContentWrapper title="" component={<SupportEmail />}/>;
            case TYPE_SETTING.SET_WHAT_NEW:
                return <SettingContentWrapper title="" component={<WhatNew />}/>;
            case TYPE_SETTING.SET_KEYWORD_CATEGORY:
                return (<SettingContentWrapper title="" component={<KeywordCategoryPage />}/>);
            default:
                return null;
        }
    };
    return (<PageLayout title="Settings" childrenAction={<div className="flex items-center justify-between h-full pr-8">
          <MenuSetting active={activeMenu.index} handleChangeMenu={handleChangeMenu}/>
        </div>}>
      {renderBody()}
      {isLoading.value ? <BackdropCustomize /> : null}
    </PageLayout>);
};
export default SettingPage;
