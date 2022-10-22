import Typography from "components/Typography";
import { FC } from "react";
import { SettingContentWrapperProps } from "../types";

export const SettingContentWrapper: FC<SettingContentWrapperProps> = ({
  title,
  component,
  containerClass,
  titleClass,
}) => {
  return (
    <div className={`py-5  ${containerClass}`}>
      <Typography
        variant="h3"
        textColor="text-black"
        fontWeight="font-semibold"
        textClass={`${titleClass} mb-3`}
      >
        {title}
      </Typography>
      {component}
    </div>
  );
};
