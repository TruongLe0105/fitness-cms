/* eslint-disable react-hooks/exhaustive-deps */
import BackdropCustomize from "components/BackdropCustomize";
import useTicketHooks from "../hooks/useTicketHooks";
import { SettingName } from "../types";
import CostCard from "./CostCard";
const NumberOfTicket = () => {
    const { ticket: starTicket, isLoading: starLoading, updateTicket: updateStarTicket, } = useTicketHooks(SettingName.NUMBER_OF_STAR_TICKET);
    const { ticket: keywordTicket, isLoading: keywordLoading, updateTicket: updateKeywordTicket, } = useTicketHooks(SettingName.NUMBER_OF_KEYWORD_TICKET);
    const isLoading = starLoading || keywordLoading;
    return (<div className="container-card" style={{ display: "flex" }}>
      <CostCard classes="reward-card mr-8" label={`Number of star ticket*`} onSubmit={updateStarTicket} defaultValue={starTicket.value} style={{ width: 400 }}/>
      <CostCard classes="reward-card" label={`Number of keyword ticket*`} onSubmit={updateKeywordTicket} defaultValue={keywordTicket.value} style={{ width: 400 }}/>
      {isLoading ? <BackdropCustomize /> : null}
    </div>);
};
export default NumberOfTicket;
