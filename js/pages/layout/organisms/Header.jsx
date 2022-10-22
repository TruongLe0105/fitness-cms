import Typography from "components/Typography";
import React from "react";
import AvatarUserHeader from "../molecules/AvatarUserHeader";
const Header = (props) => {
    const { title } = props;
    return (<div className="flex justify-between items-center pr-8">
      <Typography variant="h2" fontWeight="font-bold" textColor="text-black-02-custom">
        {title}
      </Typography>
      <AvatarUserHeader />
    </div>);
};
export default Header;
