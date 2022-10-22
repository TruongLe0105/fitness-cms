import React from "react";
const Typography = (props) => {
    const { variant, fontWeight, textColor, textClass, children, ...otherProps } = props;
    const groupClass = `${fontWeight ?? "font-normal"} ${textColor ?? "text-black"} ${textClass ?? ""}`;
    switch (variant) {
        case "h1":
            return (<h1 className={`text-4xl ${groupClass}`} {...otherProps}>
          {children}
        </h1>);
        case "h2":
            return (<h2 className={`text-3xl ${groupClass}`} {...otherProps}>
          {children}
        </h2>);
        case "h3":
            return (<h3 className={`text-2xl ${groupClass}`} {...otherProps}>
          {children}
        </h3>);
        case "h4":
            return (<h4 className={`text-xl ${groupClass}`} {...otherProps}>
          {children}
        </h4>);
        case "h5":
            return (<h5 className={`text-lg ${groupClass}`} {...otherProps}>
          {children}
        </h5>);
        case "h6":
            return (<h6 className={`text-base ${groupClass}`} {...otherProps}>
          {children}
        </h6>);
        default:
            return (<p className={`text-sm ${groupClass}`} {...otherProps}>
          {children}
        </p>);
    }
};
export default Typography;
