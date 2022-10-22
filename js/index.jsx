import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./slices/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        bodyClassName="toastBody"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        position="top-right"
      />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
