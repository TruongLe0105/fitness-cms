import React from "react";
const ButtonDefault = (props) => {
    const { children, disabled, buttonClass, widthButton, heightButton, ...otherProps } = props;
    const setDisable = () => {
        if (disabled) {
            return `bg-gray`;
        }
        return `bg-blue-custom`;
    };
    const classes = `${heightButton || "h-10"} flex items-center justify-center rounded-xl font-normal text-xs text-white outline-none-custom ${setDisable()} ${widthButton} ${buttonClass} `;
    return (<button disabled={disabled} className={classes} {...otherProps}>
      {children}
    </button>);
};
export default ButtonDefault;
