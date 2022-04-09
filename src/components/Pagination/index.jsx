import { useSelector, useDispatch } from "react-redux";

import {
  selectListLimit,
  selectListOffset,
  selectPokemonsCount,
} from "store/selectors";
import { setListOffset } from "store/actions";
import utilStyles from "styles/utils.module.scss";

import styles from "./Pagination.module.scss";

const Pagination = () => {
  const limit = useSelector(selectListLimit);
  const offset = useSelector(selectListOffset);
  const pokemonsCount = useSelector(selectPokemonsCount);

  const dispatch = useDispatch();

  const currentPage = offset / limit + 1;
  const lastPage = Math.ceil(pokemonsCount / limit);
  const allButtonNames = Array.from(
    { length: pokemonsCount / limit + 1 },
    (_, i) => i + 1
  );
  const buttonNames = allButtonNames.slice(-3).includes(currentPage)
    ? allButtonNames.slice(-7)
    : allButtonNames.slice(
        Math.max(0, currentPage - 4),
        Math.max(currentPage + 3, 7)
      );

  const prevNextClassNames = [
    utilStyles.flex_center,
    styles.container__prev_next_button,
    styles.container__pagination_button,
  ].join(" ");

  const prevPage = () => {
    if (currentPage !== 1) {
      dispatch(setListOffset(offset - limit));
      window.scroll(0, 0);
    }
  };

  const nextPage = () => {
    if (currentPage !== lastPage) {
      dispatch(setListOffset(offset + limit));
      window.scroll(0, 0);
    }
  };

  const setPage = (page) => {
    if (currentPage !== page) {
      dispatch(setListOffset(limit * (page - 1)));
      window.scroll(0, 0);
    }
  };

  const buttons = buttonNames.map((buttonName) => (
    <li
      role="button"
      key={buttonName}
      onClick={() => setPage(buttonName)}
      className={[
        utilStyles.flex_center,
        styles.container__pagination_button,
        buttonName === currentPage ? styles.container__active_button : "",
      ].join(" ")}
    >
      {buttonName}
    </li>
  ));

  return (
    <div className={styles.container} hidden={pokemonsCount <= limit}>
      <ul className={styles.container__buttons_list}>
        <li onClick={prevPage} className={prevNextClassNames}>
          Prev.
        </li>
        {buttons}
        <li onClick={nextPage} className={prevNextClassNames}>
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
