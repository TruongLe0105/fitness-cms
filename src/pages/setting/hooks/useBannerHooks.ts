import { useBoolean, useString } from "helpers/hooks";
import React, { useCallback } from "react";
import { STATUS_RESPONSE_CODE } from "types";
import { getBannerMiddleware } from "../services/api";
import { Banner } from "../types";

const useBannerHooks = (
  bannerName: Banner
): {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  refetch: () => void;
} => {
  const originalImage = useString();
  const isLoading = useBoolean();

  const getBanner = useCallback(() => {
    getBannerMiddleware(bannerName, (status, value) => {
      if (status === STATUS_RESPONSE_CODE.SUCCESS) {
        originalImage.setValue(value);
      }
      isLoading.setValue(false);
    });
  }, [bannerName, isLoading, originalImage]);

  React.useEffect(() => {
    getBanner();
  }, [bannerName, getBanner, isLoading, originalImage]);

  return {
    image: originalImage.value,
    setImage: originalImage.setValue,
    isLoading: isLoading.value,
    refetch: getBanner,
  };
};

export default useBannerHooks;
