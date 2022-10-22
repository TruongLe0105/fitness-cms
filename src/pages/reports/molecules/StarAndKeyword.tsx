import Typography from "components/Typography";
import { getDefaultImageStar } from "helpers/util";
import { StarAndKeywordProps } from "../types";

const StarAndKeyword = (props: StarAndKeywordProps): JSX.Element => {
  const { keyword, star } = props;
  const renderBody = () => {
    if (star) {
      return (
        <div className="flex items-center">
          <div
            style={{
              backgroundImage: `url(${
                star.imgUrlPreview
                  ? star.imgUrlPreview
                  : getDefaultImageStar(star.model)
              })`,
            }}
            className="w-35-custom h-35-custom rounded-full bg-no-repeat bg-center bg-cover"
          />
          <div className="flex flex-col ml-2">
            <Typography textColor="text-primary-custom">{star.name}</Typography>
            {keyword ? (
              <p className="text-xs font-normal text-gray-06-custom italic">
                {`Keyword: ${keyword.name}`}
              </p>
            ) : null}
          </div>
        </div>
      );
    }
    if (keyword) {
      return (
        <p className="text-sm font-normal text-gray-06-custom">
          {`Keyword: ${keyword.name}`}
        </p>
      );
    }
    return <div />;
  };

  return <div>{renderBody()}</div>;
};

export default StarAndKeyword;
