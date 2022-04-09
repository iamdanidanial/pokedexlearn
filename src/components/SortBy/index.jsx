import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { sortByOptions } from "utils";
import { useOutsideClick } from "hooks";
import utilStyles from "styles/utils.module.scss";
import { selectListSortBy } from "store/selectors";
import { setListOffset, setListSortBy } from "store/actions";

import ArrowIcon from "~/public/icons/right_arrow.svg";

import styles from "./SortBy.module.scss";

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useSelector(selectListSortBy);

  const ref = useRef();
  const dispatch = useDispatch();

  useOutsideClick(ref, () => setIsOpen(false));

  const selectOption = (option) => {
    dispatch(setListSortBy(option));
    dispatch(setListOffset(0));
    setIsOpen(false);
  };

  const dropdown = isOpen && (
    <ul className={styles.container__dropdown}>
      {sortByOptions.map((option) => (
        <li
          key={option}
          className={[
            styles.container__dropdown_option,
            utilStyles.flex_space_between,
          ].join(" ")}
          onClick={() => selectOption(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );

  return (
    <div ref={ref} className={styles.container}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={[
          utilStyles.flex_space_between,
          styles.container__selected_option,
        ].join(" ")}
      >
        <p>{selectedOption}</p>
        <ArrowIcon
          className={styles.container__arrow_icon}
          style={isOpen ? { transform: "rotate(270deg) scale(0.5)" } : {}}
        />
      </div>
      {dropdown}
    </div>
  );
};

export default SortBy;
