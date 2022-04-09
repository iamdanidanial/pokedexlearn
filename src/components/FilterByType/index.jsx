import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { api } from "utils";
import { useOutsideClick } from "hooks";
import utilStyles from "styles/utils.module.scss";
import { selectFilterType } from "store/selectors";
import { setFilterType, setListOffset } from "store/actions";

import styles from "./FilterByType.module.scss";

import ArrowIcon from "~/public/icons/right_arrow.svg";

const FilterByType = () => {
  const [types, setTypes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const selectedType = useSelector(selectFilterType);

  const ref = useRef();
  const dispatch = useDispatch();

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    api
      .get("type")
      .then((res) => setTypes([{ name: "All Types" }, ...res.data.results]));
  }, []);

  const selectType = (type) => {
    dispatch(setFilterType(type));
    dispatch(setListOffset(0));
    setIsOpen(false);
  };

  const dropdown = isOpen && (
    <ul className={styles.container__dropdown}>
      {types.slice(0, types.length - 1).map((type) => (
        <li
          onClick={() => selectType(type)}
          key={type.name}
          className={[
            styles.container__dropdown_option,
            utilStyles.flex_space_between,
          ].join(" ")}
        >
          <p>{type.name}</p>
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
        <p>{selectedType.name}</p>
        <ArrowIcon
          className={styles.container__dropdown_arrow}
          style={isOpen ? { transform: "rotate(270deg) scale(0.5)" } : {}}
        />
      </div>
      {dropdown}
    </div>
  );
};

export default FilterByType;
