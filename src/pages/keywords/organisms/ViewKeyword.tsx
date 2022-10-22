/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "components/Typography";
import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import { ParamsKeywordHistoryRequest, ViewKeywordProps } from "../types";
import IconClose from "assets/images/icons/close.svg";
import TitleStarCard from "pages/stars/molecules/TitleStarCard";
import { formatDate, getPurchasePriceKeyword } from "helpers/util";
import OwnerStarCard from "pages/stars/organisms/OwnerStarCard";
import MarketStarCard from "pages/stars/organisms/MarketStarCard";
import { useBoolean } from "helpers/hooks";
import BackdropCustomize from "components/BackdropCustomize";
import { getHistoryKeywordMiddleware } from "../services/api";
import { HistoryDefaultDetail } from "components/History/types";
import HistoryDefaultCard from "components/History/HistoryDefaultCard";
import { cloneDeep, concat } from "lodash";

const ViewKeyword = (props: ViewKeywordProps): JSX.Element => {
  const { dataItem, openView, handleClose } = props;
  const refHistory = useRef<any>(null);
  const isLoading = useBoolean();
  const [histories, setHistories] = useState<HistoryDefaultDetail[]>([]);
  const [paramsHistory, setParamsHistory] =
    useState<ParamsKeywordHistoryRequest>({
      limit: 20,
      page: 1,
    });
  const isLoadMoreHistory = useBoolean();
  const isLoadingPageHistory = useBoolean();

  useEffect(() => {
    if (!dataItem.nftId) {
      return;
    }
    isLoading.setValue(true);
    getHistory();
  }, [dataItem.nftId]);

  const getHistory = async () => {
    try {
      const dataHistoryResponse = await getHistoryKeywordMiddleware(
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

        const newParams: ParamsKeywordHistoryRequest = {
          limit: paramsHistory.limit,
          page: paramsHistory.page + 1,
        };
        isLoadingPageHistory.setValue(true);
        const dataHistoryResponse = await getHistoryKeywordMiddleware(
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
    <Popup open={openView} className="dialog" nested modal disabled>
      <div className="view-dialog-body-star">
        <div className="flex items-center justify-between mb-3 pr-30-custom">
          <div className="flex items-center">
            <Typography
              variant="h3"
              fontWeight="font-bold"
              textColor="text-primary-custom"
            >
              {dataItem.name}
            </Typography>
          </div>

          <img
            src={IconClose}
            alt="icon"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div
          className="grid"
          style={{
            gridTemplateColumns:
              dataItem.market || dataItem.owner
                ? `282px calc(100% - 282px)`
                : "calc(100%)",
          }}
        >
          {dataItem.market || dataItem.owner ? (
            <OwnerStarCard
              ownerBoughtAt={dataItem.ownerBoughtAt}
              purchasePrice={getPurchasePriceKeyword(dataItem)}
              market={dataItem.market}
              owner={dataItem.owner}
              rootClass="mt-0"
            />
          ) : null}
          <div
            className="pr-30-custom max-height-dialog"
            onScroll={onScroll}
            ref={refHistory}
          >
            <div className="flex flex-col p-4 card-info-star min-h-240-custom">
              <Typography
                variant="h5"
                textColor="text-black"
                fontWeight="font-semibold"
                textClass="mb-3"
              >
                KEYWORD INFOMATION
              </Typography>

              <TitleStarCard
                label="Keyword name:"
                message={dataItem.name}
                rootClassName="mb-3"
              />
              <TitleStarCard
                label="Create At:"
                message={formatDate(dataItem.createdAt)}
                rootClassName="mb-3"
              />
              <TitleStarCard
                label="NFT ID:"
                message={dataItem.nftId ?? "No data"}
                rootClassName="mb-3"
              />
              <TitleStarCard
                label="Linked with Star:"
                message={dataItem.star ? dataItem.star.name : "No data"}
              />
            </div>
            {dataItem.market ? (
              <div className="card-info-star p-4 mt-8">
                <MarketStarCard
                  dataItem={dataItem.market}
                  nameLinked={dataItem.star ? dataItem.star.name : ""}
                  title="Linked with Star:"
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
      {isLoading.value ? <BackdropCustomize /> : null}
    </Popup>
  );
};
export default ViewKeyword;
