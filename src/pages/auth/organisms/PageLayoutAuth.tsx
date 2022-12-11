import Typography from "components/Typography";
import React from "react";
import { PageLayoutAuthProps } from "../types";

const PageLayoutAuth = (props: PageLayoutAuthProps): JSX.Element => {
  const { children, title, subtitle } = props;
  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url("/pmg-background.jpg")`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="flex flex-col justify-center items-center">
        <Typography
          variant="h1"
          fontWeight="font-bold"
          textColor="text-black"
          textClass="mb-16"
        >
          FITNESS CMS
        </Typography>
        <div className="bg-white rounded-2xl w-400-custom p-8 flex flex-col relative"
          style={{
            boxShadow: "rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px"
          }}
        >
          <Typography
            variant="h3"
            fontWeight="font-bold"
            textColor="text-black"
            textClass="mb-3"
          >
            {title}
          </Typography>
          {subtitle ? (
            <Typography variant="h6" fontWeight="font-medium" textClass="mb-12">
              {subtitle}
            </Typography>
          ) : null}

          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayoutAuth;
