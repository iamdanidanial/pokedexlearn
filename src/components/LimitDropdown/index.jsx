import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  selectListLimit,
  selectListOffset,
  selectPokemonsCount,
} from "store/selectors";
import { useOutsideClick } from "hooks";
import utilStyles from "styles/utils.module.scss";
import { setListLimit, setListOffset } from "store/actions";

import ArrowIcon from "~/public/icons/right_arrow.svg";

import styles from "./LimitDropdown.module.scss";

const LimitDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const limit = useSelector(selectListLimit);
  const offset = useSelector(selectListOffset);
  const pokemonsCount = useSelector(selectPokemonsCount);

  const ref = useRef();
  const dispatch = useDispatch();

  useOutsideClick(ref, () => setIsOpen(false));

  const options = [10, 20, 50];

  const selectOption = (option) => {
    dispatch(setListLimit(option));
    setIsOpen(false);

    if ((offset / option) % 1 !== 0) {
      dispatch(setListOffset(Math.floor(offset / option) * option));
    }
  };

  const selectedOptionDiv = (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={[
        utilStyles.flex_center,
        isOpen ? utilStyles.box_shadow : "",
        styles.container__selected_option_div,
      ].join(" ")}
    >
      <p>{limit}</p>
      <ArrowIcon
        className={styles.container__dropdown_arrow}
        style={isOpen ? { transform: "rotate(270deg) scale(0.5)" } : {}}
      />
    </div>
  );

  const listItems = options.map((option) => (
    <li
      key={option}
      role="button"
      onClick={() => selectOption(option)}
      className={[
        utilStyles.flex_center,
        styles.container__dropdown_option_btn,
      ].join(" ")}
    >
      {option}
    </li>
  ));

  return (
    <div
      className={styles.container}
      hidden={pokemonsCount <= Math.min(...options)}
    >
      <p className={styles.container__show_per_page_p}>Show per page: </p>
      <div ref={ref}>
        {selectedOptionDiv}
        <ul hidden={!isOpen} className={styles.container__dropdown_list}>
          {listItems}
        </ul>
      </div>
    </div>
  );
};

export default LimitDropdown;
