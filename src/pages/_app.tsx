import type { AppProps } from "next/app";
import store from "../../store";

import "../styles/globals.css";
import { Provider } from "react-redux";

const TestTaskApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default TestTaskApp;
