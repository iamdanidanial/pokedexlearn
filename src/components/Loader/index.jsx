import PropTypes from "prop-types";

import utilStyles from "styles/utils.module.scss";

import styles from "./Loader.module.scss";

const Loader = ({ loadingMore }) => {
  return (
    <div
      className={[
        styles.container,
        utilStyles.flex_center,
        loadingMore ? styles.container_loading_more : "",
      ].join(" ")}
    >
      <div className={styles.container__lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  loadingMore: PropTypes.bool,
};

Loader.defaultProps = {
  loadingMore: false,
};

export default Loader;
