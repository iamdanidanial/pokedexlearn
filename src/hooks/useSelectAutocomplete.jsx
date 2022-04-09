import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectSearchValue } from "store/selectors";
import { setFilterSearch, setSearchValue } from "store/actions";

const useSelectAutocomplete = (inputRef, suggestions, setSuggestions) => {
  const [suggestionIndex, setSuggestionIndex] = useState(0);

  const searchValue = useSelector(selectSearchValue);

  const dispatch = useDispatch();

  const options = [searchValue, ...suggestions];

  useEffect(() => {
    const keydownHandler = (e) => {
      const prevIndex =
        suggestionIndex === 0 || suggestionIndex === -1
          ? options.length - 1
          : suggestionIndex - 1;
      const nextIndex =
        suggestionIndex === options.length - 1 ? 0 : suggestionIndex + 1;

      switch (e.keyCode) {
        case 13:
          e.preventDefault();
          dispatch(setSearchValue(inputRef.current.value));
          dispatch(setFilterSearch(inputRef.current.value));
          setSuggestionIndex(0);
          setSuggestions([]);
          inputRef.current.blur();
          break;
        case 38:
          e.preventDefault();
          setSuggestionIndex(prevIndex);
          inputRef.current.value = options[prevIndex];
          break;
        case 40:
          e.preventDefault();
          setSuggestionIndex(nextIndex);
          inputRef.current.value = options[nextIndex];
          break;
        default:
          break;
      }
    };

    if (suggestions.length > 0) {
      window.addEventListener("keydown", keydownHandler);
    }

    return () => window.removeEventListener("keydown", keydownHandler);
  });

  useEffect(() => {
    setSuggestionIndex(0);
  }, [searchValue]);
};

export default useSelectAutocomplete;
