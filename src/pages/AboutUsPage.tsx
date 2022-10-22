import { PageWrapper } from "components/Layout";
import { PATH } from "helpers/constant";
import { Link } from "react-router-dom";

export const AboutUsPage = (): JSX.Element => {
  return (
    <PageWrapper>
      <h1>AboutUsPage</h1>
      <Link to={PATH.home}>Home Page</Link>
    </PageWrapper>
  );
};
