import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { useSelector, useDispatch } from "react-redux";

import {
  selectFilterType,
  selectSearchValue,
  selectAllPokemons,
  selectProcessedSearchValue,
} from "store/selectors";
import { processPokemonName } from "utils";
import utilStyles from "styles/utils.module.scss";
import { useOutsideClick, useSelectAutocomplete } from "hooks";
import { setListOffset, setSearchValue, setFilterSearch } from "store/actions";

import SearchIcon from "~/public/icons/search_icon.svg";

import styles from "./Searchbox.module.scss";

const Searchbox = () => {
  const [suggestions, setSuggestions] = useState([]);

  const filterType = useSelector(selectFilterType);
  const allPokemons = useSelector(selectAllPokemons);
  const searchValue = useSelector(selectSearchValue);
  const processedSearchValue = useSelector(selectProcessedSearchValue);

  const inputRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!processedSearchValue) {
      setSuggestions([]);
    } else {
      updateSuggestions();
    }
  }, [processedSearchValue]);

  useOutsideClick(inputRef, () => setSuggestions([]));
  useSelectAutocomplete(inputRef, suggestions, setSuggestions);

  const updateSearchValue = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setListOffset(0));
    dispatch(setFilterSearch(searchValue));
    inputRef.current.blur();
  };

  const selectSuggestion = (suggestion) => {
    dispatch(setSearchValue(suggestion));
    dispatch(setFilterSearch(suggestion));
    setSuggestions([]);
    inputRef.current.blur();
  };

  const updateSuggestions = async () => {
    if (inputRef.current !== document.activeElement) return;

    const pokemonsByType = filterType.url
      ? await axios.get(filterType.url).then((res) => {
          return res.data.pokemon
            .map((x) => x.pokemon)
            .filter((x) =>
              allPokemons.find((pokemon) => pokemon.name === x.name)
            );
        })
      : allPokemons;

    setSuggestions(
      pokemonsByType
        .filter(
          (pokemon) =>
            processPokemonName(pokemon.name).includes(processedSearchValue) &&
            processPokemonName(pokemon.name) !== processedSearchValue
        )
        .slice(0, 5)
        .map((pokemon) => pokemon.name[0].toUpperCase() + pokemon.name.slice(1))
        .map((name) =>
          name.slice(
            0,
            name.indexOf("-") > -1 ? name.indexOf("-") : name.length + 1
          )
        )
    );
  };

  const autocomplete = (
    <div className={styles.container__autocomplete}>
      <ul>
        {suggestions.map((option) => (
          <li
            key={nanoid()}
            className={styles.container__autocomplete_option}
            onClick={() => selectSuggestion(option)}
          >
            <p>{option}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        ref={inputRef}
        maxLength={25}
        spellCheck="false"
        value={searchValue}
        placeholder="Search by name"
        onChange={updateSearchValue}
        className={styles.container__search_input}
        onFocus={() => processedSearchValue && updateSuggestions()}
      />
      <button
        aria-label="search"
        className={[
          utilStyles.flex_center,
          styles.container__submit_button,
        ].join(" ")}
      >
        <SearchIcon className={styles.container__search_icon} />
      </button>
      {autocomplete}
    </form>
  );
};

export default Searchbox;
