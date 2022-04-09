import Router from "next/router";
import NProgress from "nprogress";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import store from "store";
import "styles/globals.scss";
import "styles/nprogress.scss";

Router.onRouteChangeError = () => NProgress.done();
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

App.defaultProps = {
  pageProps: {},
  Component: () => {},
};

export default App;
