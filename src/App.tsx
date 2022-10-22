/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialInterceptor } from "services/axios";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AppRoutes from "AppRoutes";

initialInterceptor();
declare global {
  interface Window {
    ethereum: any;
  }
}

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
