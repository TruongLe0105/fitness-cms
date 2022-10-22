import Typography from "components/Typography";
import React from "react";
import AvatarUserHeader from "../molecules/AvatarUserHeader";
import { HeaderProps } from "../types";

const Header = (props: HeaderProps): JSX.Element => {
  const { title } = props;
  return (
    <div className="flex justify-between items-center pr-8">
      <Typography
        variant="h2"
        fontWeight="font-bold"
        textColor="text-black-02-custom"
      >
        {title}
      </Typography>
      <AvatarUserHeader />
    </div>
  );
};

export default Header;
