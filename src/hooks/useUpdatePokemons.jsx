import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import {
  selectFilterType,
  selectAllPokemons,
  selectFilterSearch,
} from "store/selectors";
import { setListOffset, setPokemons } from "store/actions";

const useUpdatePokemons = () => {
  const dispatch = useDispatch();
  const filterType = useSelector(selectFilterType);
  const allPokemons = useSelector(selectAllPokemons);
  const filterSearch = useSelector(selectFilterSearch);

  useEffect(() => {
    dispatch(setListOffset(0));

    if (filterType.url) {
      axios
        .get(filterType.url)
        .then((res) =>
          res.data.pokemon
            .map((x) => x.pokemon)
            .filter(
              (x) =>
                x.name.includes(filterSearch) &&
                allPokemons.find((pokemon) => pokemon.name === x.name)
            )
        )
        .then((res) => dispatch(setPokemons(res)));
    } else {
      dispatch(
        setPokemons(
          allPokemons.filter((pokemon) => pokemon.name.includes(filterSearch))
        )
      );
    }
  }, [filterType, filterSearch]);
};

export default useUpdatePokemons;
