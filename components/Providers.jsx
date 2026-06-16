'use client'
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GTMRouteListener from "./common/GTMRouteListener";
import ScrollToTop from "./common/ScrollToTop";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <GTMRouteListener />
      <ScrollToTop />
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2500}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        className="vell-toast-container"
        toastClassName="vell-toast"
      />
    </Provider>
  );
}
