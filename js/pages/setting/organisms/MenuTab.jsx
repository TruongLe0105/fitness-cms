import Typography from "components/Typography";
import { TYPE_SETTING } from "../types";
export const LIST_MENU_SETTING = [
    {
        title: "Lock Star Map",
        field: TYPE_SETTING.LOCK_STAR_MAP,
    },
    {
        title: "Set banner",
        field: TYPE_SETTING.SET_BANNER,
    },
    {
        title: "Set price",
        field: TYPE_SETTING.SET_PRICE,
    },
    {
        title: "Set reward",
        field: TYPE_SETTING.SET_REWARD,
    },
    {
        title: "Set number of ticket",
        field: TYPE_SETTING.SET_NUMBER_OF_TICKET,
    },
    {
        title: "Set versions",
        field: TYPE_SETTING.SET_VERSION,
    },
    {
        title: "Set support email",
        field: TYPE_SETTING.SET_SUPPORT_EMAIL,
    },
    {
        title: "Set what's new",
        field: TYPE_SETTING.SET_WHAT_NEW,
    },
    {
        title: "Set keyword categories",
        field: TYPE_SETTING.SET_KEYWORD_CATEGORY,
    },
];
const MenuSetting = (props) => {
    const { active, handleChangeMenu } = props;
    return (<div className="flex items-center">
      {LIST_MENU_SETTING.map((el, index) => (<div key={index} className="h-30-custom flex flex-col justify-between items-center mr-8 cursor-pointer" onClick={handleChangeMenu(index, el.field)}>
          <Typography textColor={active === index ? "text-black-02-custom" : "text-gray-custom"} fontWeight="font-semibold">
            {el.title}
          </Typography>
          {active === index ? (<div className="h-3-custom bg-primary-bold-custom rounded-sm" style={{
                    width: "calc(100% - 20px)",
                }}/>) : null}
        </div>))}
    </div>);
};
export default MenuSetting;
