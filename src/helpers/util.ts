import { toast } from "react-toastify";
import { format, isValid, parseISO } from "date-fns";
import Web3 from "web3";
import { capitalize, round } from "lodash";
import IconDefaultAvatar from "assets/images/icons/default-avatar.svg";

import {
  FiledFilterItem,
  LINK_WITH_STAR_FILTER,
  MARKET_STATUS_FILTER,
  TYPES_STATUS_FILTER,
  OWNER_STATUS_FILTER,
} from "components/Filter/types";
import { CURRENCY_SYMBOL_WEB, TESTNET_WEB } from "config/environments";
import { STATUS_EVENT, STATUS_REFERRAL_CODE } from "components/Status/types";
import { formatValue } from "react-currency-input-field";

// eslint-disable-next-line
export const copyToClipboard = (text: string) => {
  const copyText = document.createElement("input");
  copyText.value = text;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);
};
// eslint-disable-next-line
export const isSafari = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("safari") !== -1 && ua.indexOf("chrome") <= -1;
};
// eslint-disable-next-line
export const isValidEmail = (email: string): boolean => {
  const reg =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

export const isValidUsername = (username: string): boolean => {
  return !!username.length;
};

// eslint-disable-next-line
export const showNotification = (type: "success" | "error", messages: any) => {
  if (typeof messages === "string") {
    toast[type](messages);
    return;
  }
  if (messages?.length > 0) {
    messages.forEach((element: string) => {
      toast[type](element);
    });
  }
};
// eslint-disable-next-line
export const getFirstLetterInName = (name: string, justOne = false) => {
  if (!name) {
    return "";
  }
  const splitedName = name.trim().split(" ");
  if (justOne || splitedName.length === 1) {
    return splitedName[0]?.charAt(0);
  }
  return (
    splitedName[0]?.charAt(0) + splitedName[splitedName.length - 1]?.charAt(0)
  );
};

// eslint-disable-next-line
export function isValidDate(date: any) {
  if (
    !date ||
    String(new Date(date)) === "Invalid Date" ||
    !isValid(parseISO(new Date(date).toISOString()))
  ) {
    return false;
  }
  return true;
}
// eslint-disable-next-line
export const formatDate = (
  date: string | number | Date,
  typeFormat?: string
) => {
  if (!date) {
    return "";
  }
  const typedDate =
    typeof date === "number" || typeof date !== "string"
      ? date
      : isValidDate(date.replace(" ", "T"))
        ? date.replace(" ", "T")
        : date;

  return format(new Date(typedDate), typeFormat ? typeFormat : "dd MMM yyyy");
};

export const web3Instance = new Web3(window.ethereum);

// eslint-disable-next-line
export const formatETH = (n: number | string | null = "0") => {
  if (n === null) {
    return "0";
  }
  const valueInEther = web3Instance.utils.fromWei(String(n), "ether");
  return formatValue({
    value: String(round(Number(valueInEther), 6)),
    groupSeparator: ",",
    decimalSeparator: ".",
  });
};

// export const showAvatarOwnerStar = (
//   owner?: OwnerDetail,
//   market?: MarketDetail
// ): string => {
//   if (owner && owner.avatar) {
//     return owner.avatar;
//   }
//   if (market && market.seller && market.seller.avatar) {
//     return market.seller.avatar;
//   }
//   return IconDefaultAvatar;
// };

// export const showFullNameOwnerStar = (
//   owner?: OwnerDetail,
//   market?: MarketDetail
// ): string => {
//   const defaultName = "Spaceman";
//   if (owner) {
//     if (!owner.firstName && !owner.lastName) {
//       return defaultName;
//     }
//     return `${owner.firstName ?? ""} ${owner.lastName ?? ""}`;
//   }

//   if (market && market.seller) {
//     if (!market.seller.firstName && !market.seller.lastName) {
//       return defaultName;
//     }
//     return `${market.seller.firstName ?? ""} ${market.seller.lastName ?? ""}`;
//   }
//   return defaultName;
// };

export function msToTime(duration: number): string {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const newHours = hours < 10 ? "0" + hours : hours;
  const newMinutes = minutes < 10 ? "0" + minutes : minutes;
  const newSeconds = seconds < 10 ? "0" + seconds : seconds;

  return newHours + ":" + newMinutes + ":" + newSeconds;
}

export const validateURL = (url: string): boolean => {
  const regex = new RegExp(
    //eslint-disable-next-line
    /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
  );
  return !!url.match(regex);
};

// export const getPurchasePriceKeyword = (value: SystemKeywordDetail): string => {
//   if (!value.nftId && !value.market) {
//     return "";
//   }
//   return value.purchasePrice ? value.purchasePrice : "";
// };

// export const getDefaultImageStar = (model: string): string => {
//   if (model === "mpc_asteroid") {
//     return DEFAULT_THUMBNAIL_MINOR_PLANET_IMAGE;
//   }
//   return DEFAULT_THUMBNAIL_STAR_IMAGE;
// };
export const getNameModal = (value: string): string => {
  if (!value) {
    return "";
  }
  if (value === "mpc_asteroid") {
    return "Asteroid";
  }
  if (["plan", "pla", "jpl_sso"].includes(value)) {
    return "Planet";
  }
  return value;
};
export const defaultNameUser = (
  firstName: string,
  lastName: string
): string => {
  if (!firstName && !lastName) {
    return "Spaceman";
  }
  return `${firstName ?? ""} ${lastName ?? ""}`;
};

export const getTitleFilter = (filed: string): string => {
  switch (filed) {
    case FiledFilterItem.OWNER:
      return "Owner Status";
    case FiledFilterItem.MARKET:
      return "Market Status";
    case FiledFilterItem.TYPES:
      return "Types Status";
    case FiledFilterItem.LINK_WITH_STAR:
      return "Linked with Star";
    case OWNER_STATUS_FILTER.OWNED:
      return "Owned";
    case OWNER_STATUS_FILTER.NO_OWNED:
      return "No Owner";
    case MARKET_STATUS_FILTER.SELLING:
      return "Selling";
    case MARKET_STATUS_FILTER.IS_NOT_SELLING:
      return "Is not selling";
    case TYPES_STATUS_FILTER.ASTEROID:
      return "Asteroid";
    case TYPES_STATUS_FILTER.PLAN:
      return "Planet";
    case TYPES_STATUS_FILTER.STAR:
      return "Star";
    case LINK_WITH_STAR_FILTER.LINKED:
      return "Linked";
    case LINK_WITH_STAR_FILTER.UNLINKED:
      return "UnLinked";
    case TYPES_STATUS_FILTER.REGISTER:
      return "Register";
    case TYPES_STATUS_FILTER.MINT:
      return "Mint";
    case FiledFilterItem.CATEGORY:
      return "Categories";
    default:
      return filed;
  }
};

// export const getPriceKeyword = (value: SystemKeywordDetail): string => {
//   if (value.purchasePrice) {
//     return `${formatETH(value.purchasePrice)} ${CURRENCY_SYMBOL_WEB}`;
//   }
//   if (!value.nftId && value.mintPrice) {
//     return `${value.mintPrice} ${CURRENCY_SYMBOL_WEB}`;
//   }
//   if (!value.nftId && !value.market) {
//     return "";
//   }
//   let newPrice = "";
//   if (!value.nftId && value.market) {
//     newPrice = value.market.price;
//   }
//   return `${formatETH(newPrice)} ${CURRENCY_SYMBOL_WEB}`;
// };

// export const getNameStatusEvent = (
//   startDate: string,
//   endDate: string
// ): string => {
//   const newStartDate = isValidDate(startDate.replace(" ", "T"))
//     ? startDate.replace(" ", "T")
//     : startDate;
//   const newEndDate = isValidDate(endDate.replace(" ", "T"))
//     ? endDate.replace(" ", "T")
//     : endDate;
//   const getTimeNow = new Date().getTime();
//   const getTimeStartDate = new Date(newStartDate).getTime();
//   const getTimeEndDate = new Date(newEndDate).getTime();
//   if (getTimeNow < getTimeStartDate) {
//     return STATUS_EVENT.SCHEDULED;
//   }
//   if (getTimeNow > getTimeEndDate) {
//     return STATUS_EVENT.ENDED;
//   }

//   return STATUS_EVENT.ACTIVATING;
// };

// export const getNameClaimReferralCode = (
//   isReward: boolean,
//   referralReward: ReferralCodeRewardDetail
// ): string => {
//   if (referralReward && referralReward.status) {
//     return capitalize(referralReward.status);
//   }
//   if (isReward) {
//     return STATUS_REFERRAL_CODE.CLAIMED;
//   }
//   return STATUS_REFERRAL_CODE.NOT_CLAIM_YET;
// };

// eslint-disable-next-line
export const onRedirectTestnet = (address: string) => (event) => {
  event.stopPropagation();
  event.preventDefault();
  const isAddress = web3Instance.utils.isAddress(address);
  const link = document.createElement("a");
  link.href = `${TESTNET_WEB}/${isAddress ? "address" : "tx"}/${address}`;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link?.parentNode?.removeChild(link);
};

export const getNameMethodReport = (type: string): string => {
  switch (type) {
    case "Star-mint":
      return "Mint Star";
    case "ItemBidEntered":
      return "Place a bid";
    case "AuctionItemOffer":
      return "Auction sell";
    case "Keyword-mint":
      return "Mint Keyword";
    case "ItemBought":
      return "Sold Item";
    case "ItemOffer":
      return "Register to sell";
    case "Linked":
      return "Change Name";
    case "ItemNoLongerForAuctionSale":
      return "Cancel listing - Auction";
    case "ItemNoLongerForSale":
      return "Cancel listing";
    case "ClaimedBonus":
      return "Claim award";
    case "AuctionEnded":
      return "Auction ended";
    case "ItemBidWithdrawn":
      return "Claim token";
    default:
      return type;
  }
};

export const getImageSize = (
  uploadFile: FileList[0]
): Promise<{ width: number; height: number }> => {
  const img = new Image();
  img.src = window.URL.createObjectURL(uploadFile);

  const promise = new Promise<{ width: number; height: number }>(
    (resolve, reject) => {
      img.onload = () => {
        const width = img.width;
        const height = img.height;
        resolve({ width, height });
      };
      img.onerror = reject;
    }
  );
  return promise;
};

export const isValidPassword = (password: string) => {
  if (password.length <= 8)
    return false;
  return true;
};

export const isValidMerchantName = (password: string) => {
  if (password.length <= 8)
    return false;
  return true;
};

export const isValidPhone = (password: string) => {
  if (password.length <= 10)
    return false;
  return true;
};
