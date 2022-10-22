import BackdropCustomize from "components/BackdropCustomize";
import Typography from "components/Typography";
import { useBoolean } from "helpers/hooks";
import React from "react";
import { Banner } from "../types";
import { SetBanner } from "./SetBanner";

const Banners = () => {
  const loading = useBoolean();
  return (
    <div className="flex flex-col">
      <div className="flex gap-20">
        <div>
          <Typography
            variant="h6"
            textColor="text-black"
            fontWeight="font-semibold"
          >
            Pioneer Benefit
          </Typography>
          <SetBanner
            setLoading={loading.setValue}
            visibleBannerNote={true}
            width={343}
            height={114}
            inputId="benefit_pioneer"
            message="banner Pioneer Benefit"
            bannerName={Banner.BENEFIT_PIONEER}
          />
        </div>
        <div>
          <Typography
            variant="h6"
            textColor="text-black"
            fontWeight="font-semibold"
          >
            Ads
          </Typography>
          <SetBanner
            setLoading={loading.setValue}
            visibleBannerNote={true}
            width={279}
            height={64}
            inputId="ads_banner"
            message="Ads Banner"
            bannerName={Banner.ADS}
            accept=".gif"
          />
        </div>
      </div>
      {/* <div className="mt-3">
        <Typography
          variant="h6"
          textColor="text-black"
          fontWeight="font-semibold"
        >
          How to upgrade Pioneer
        </Typography>
        <div className="container-card">
          <SetBanner
            bannerNoteStyle={{ justifyContent: "flex-start", marginTop: 5 }}
            setLoading={loading.setValue}
            buttonPosition="horizontal"
            visibleBannerNote={true}
            width={304}
            height={545}
            inputId="upgrade_pioneer_st1"
            message="step one"
            bannerName={Banner.UPGRADE_PIONEER_ST1}
          />
          <SetBanner
            bannerNoteStyle={{ justifyContent: "flex-start", marginTop: 5 }}
            setLoading={loading.setValue}
            buttonPosition="horizontal"
            visibleBannerNote={true}
            width={304}
            height={545}
            inputId="upgrade_pioneer_st2"
            message="step two"
            bannerName={Banner.UPGRADE_PIONEER_ST2}
          />
          <SetBanner
            bannerNoteStyle={{ justifyContent: "flex-start", marginTop: 5 }}
            setLoading={loading.setValue}
            buttonPosition="horizontal"
            visibleBannerNote={true}
            width={304}
            height={545}
            inputId="upgrade_pioneer_st3"
            message="step three"
            bannerName={Banner.UPGRADE_PIONEER_ST3}
          />
        </div>
      </div> */}
      {loading.value && <BackdropCustomize />}
    </div>
  );
};

export default React.memo(Banners);
