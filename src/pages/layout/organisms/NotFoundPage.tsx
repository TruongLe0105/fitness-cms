import NoFoundPageImage from "assets/images/404.svg";
import ButtonDefault from "components/Button/ButtonDefault";
import Typography from "components/Typography";
import { PATH } from "helpers/constant";
import { pushTo } from "helpers/history";

const NotFoundPage = (): JSX.Element => {
  const onSubmitGoHome = () => {
    pushTo(PATH.login);
  };
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <img src={NoFoundPageImage} alt="404" />
      <Typography
        variant="h6"
        textColor="text-black"
        fontWeight="font-normal"
        textClass="pt-6"
      >
        Oops, Looks like something was wrong
      </Typography>
      <Typography
        variant="h6"
        textColor="text-black"
        fontWeight="font-normal"
        textClass="pt-2"
      >
        We’re working on IT
      </Typography>
      <ButtonDefault widthButton="w-140-custom mt-8" onClick={onSubmitGoHome}>
        Go home
      </ButtonDefault>
    </div>
  );
};
export default NotFoundPage;
