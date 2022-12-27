import Typography from "components/Typography";
import { LIST_MENU_LEGAL, MenuLegalProps } from "../types";

const MenuLegal = (props: MenuLegalProps): JSX.Element => {
    const { active, handleChangeMenu } = props;
    return (
        <div className="flex items-center">
            {LIST_MENU_LEGAL.map((el, index) => (
                <div
                    key={index}
                    className="h-30-custom flex flex-col justify-between items-center mr-8 cursor-pointer"
                    onClick={handleChangeMenu(index, el.field)}
                >
                    <Typography
                        textColor={
                            active === index ? "text-black-02-custom" : "text-gray-custom"
                        }
                        fontWeight="font-semibold"
                    >
                        {el.title}
                    </Typography>
                    {active === index ? (
                        <div
                            className="h-3-custom bg-primary-bold-custom rounded-sm"
                            style={{
                                width: "calc(100% - 20px)",
                            }}
                        />
                    ) : null}
                </div>
            ))}
        </div>
    );
};
export default MenuLegal;
