import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  SortBy,
  Loader,
  Searchbox,
  Pagination,
  PokemonCard,
  FilterByType,
  LimitDropdown,
} from "components";
import * as selectors from "store/selectors";
import { setListLimit } from "store/actions";
import { useMobileLoadMore, useUpdatePokemons } from "hooks";

import styles from "./PokemonList.module.scss";

const PokemonList = () => {
  const limit = useSelector(selectors.selectListLimit);
  const offset = useSelector(selectors.selectListOffset);
  const sortBy = useSelector(selectors.selectListSortBy);
  const pokemons = useSelector(selectors.selectPokemons);
  const filterType = useSelector(selectors.selectFilterType);
  const allPokemons = useSelector(selectors.selectAllPokemons);
  const filterSearch = useSelector(selectors.selectFilterSearch);

  const dispatch = useDispatch();
  const loadingMore = useMobileLoadMore();

  useUpdatePokemons();

  useEffect(() => {
    if (window.innerWidth <= 768 && limit > 20) {
      dispatch(setListLimit(20));
    }
  }, [filterType, filterSearch, sortBy]);

  const sortPokemons = (pokemons) => {
    switch (sortBy) {
      case "A-Z":
        return [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
      case "Z-A":
        return [...pokemons].sort((a, b) => b.name.localeCompare(a.name));
      case "Lowest to highest number":
        return [...pokemons];
      case "Highest to lowest number":
        return [...pokemons].reverse();
      default:
        return pokemons;
    }
  };

  const visiblePokemons = sortPokemons(pokemons).slice(offset, offset + limit);

  return (
    <div className={styles.container}>
      <div className={styles.container__top_bar}>
        <Searchbox />
        <FilterByType />
        <SortBy />
        <LimitDropdown />
      </div>
      {filterSearch && (
        <p className={styles.container__showing_matches_p}>
          Showing matches for {`"${filterSearch}"`}:
        </p>
      )}
      {visiblePokemons.length < 1 && allPokemons.length > 0 ? (
        <p className={styles.container__nothing_was_found_p}>
          Nothing was found
        </p>
      ) : (
        <div className={styles.container__pokemons_list_grid}>
          {visiblePokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
      <Pagination />
      {loadingMore && <Loader loadingMore />}
    </div>
  );
};

export default PokemonList;
