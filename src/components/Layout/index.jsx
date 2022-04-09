import Head from "next/head";
import PropTypes from "prop-types";

import styles from "./Layout.module.scss";

const Layout = ({ title, metaDescription, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <div className={styles.container}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.object,
  metaDescription: PropTypes.string,
};

Layout.defaultProps = {
  children: {},
  title: "Pokédex",
  metaDescription: "",
};

export default Layout;
