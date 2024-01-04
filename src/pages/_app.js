import "@/styles/globals.css";
import { Provider } from 'react-redux';
import store from "@/redux/store";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  );

}

export default MyApp;
