import { DefaultButtonIconProps } from "./types";
import { ReactComponent as IconEdit } from "assets/images/icons/edit.svg";
import { ReactComponent as IconDestroy } from "assets/images/icons/destroy.svg";
import { ReactComponent as IconMint } from "assets/images/icons/mint-keyword.svg";
import { ReactComponent as IconSetCost } from "assets/images/icons/set-cost.svg";
import { ReactComponent as IconSell } from "assets/images/icons/sell-keyword.svg";
import { ReactComponent as IconCancel } from "assets/images/icons/cancel-sell.svg";
import { ReactComponent as LockIcon } from "assets/images/icons/lock.svg";
import { ReactComponent as PauseIcon } from "assets/images/icons/pause-circle.svg";
import { ReactComponent as ResumeIcon } from "assets/images/icons/play-circle.svg";
import { ReactComponent as ViewIcon } from "assets/images/icons/view.svg";
import ReactTooltip from "react-tooltip";

const DefaultButtonIcon = (props: DefaultButtonIconProps): JSX.Element => {
  const {
    disable,
    onClick,
    field,
    titleTooltip,
    rootClassIcon,
    keyButtonIcon,
  } = props;
  const renderIcon = () => {
    switch (field) {
      case "edit":
        return (
          <IconEdit
            className={`w-18-custom h-18-custom ${
              !disable ? "icon-edit-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "delete":
        return (
          <IconDestroy
            className={`w-18-custom h-18-custom ${
              !disable ? "icon-destroy-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "mint":
        return (
          <IconMint className={`w-18-custom h-18-custom  ${rootClassIcon}`} />
        );
      case "cost":
        return (
          <IconSetCost
            className={`w-18-custom h-18-custom ${
              !disable ? "icon-cost-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "sell":
        return (
          <IconSell
            className={`w-18-custom h-18-custom ${
              !disable ? "icon-sell-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "cancel":
        return (
          <IconCancel
            className={`w-18-custom h-18-custom ${
              !disable ? "icon-destroy-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "lock":
        return (
          <LockIcon
            className={`w-18-custom h-18-custom ${
              !disable ? "icon-destroy-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "pause":
        return (
          <PauseIcon
            className={`w-20-custom h-20-custom ${
              !disable ? "icon-destroy-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "resume":
        return (
          <ResumeIcon
            className={`w-20-custom h-20-custom ${
              !disable ? "icon-edit-color" : ""
            } ${rootClassIcon}`}
          />
        );
      case "view":
        return (
          <ViewIcon
            className={`w-20-custom h-20-custom ${
              !disable ? "icon-edit-color" : ""
            } ${rootClassIcon}`}
          />
        );
    }
  };
  const renderBackgroundColorIcon = () => {
    switch (field) {
      case "edit":
        return "bg-primary-04-custom";
      case "delete":
        return "bg-red-04-custom";

      case "mint":
        return "";

      case "cost":
        return "bg-orange-02-custom";

      case "sell":
        return "bg-green-04-custom";

      case "cancel":
        return "bg-red-04-custom";

      case "resume":
        return "bg-primary-04-custom";
      case "pause":
        return "bg-red-04-custom";
    }
  };

  return (
    <div
      className={disable ? "bg-disable-tooltip" : "bg-active-tooltip"}
      data-tip
      data-for={keyButtonIcon}
    >
      <div
        onClick={!disable ? onClick : undefined}
        className={`p-2 rounded-full ${
          disable
            ? "bg-gray-custom"
            : `hover:${renderBackgroundColorIcon()} cursor-pointer`
        }`}
      >
        {renderIcon()}
      </div>
      <ReactTooltip id={keyButtonIcon} arrowColor="transparent">
        <p
          className={`${
            disable ? "text-black-04-custom" : "text-white"
          } font-normal text-xs`}
        >
          {titleTooltip}
        </p>
      </ReactTooltip>
    </div>
  );
};

export default DefaultButtonIcon;
