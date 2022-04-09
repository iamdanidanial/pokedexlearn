import { SET_POKEMONS, SET_ALL_POKEMONS } from "store/reducers/pokemonsReducer";

export const setPokemons = (pokemons) => ({
  type: SET_POKEMONS,
  pokemons: pokemons,
});

export const setAllPokemons = (allPokemons) => ({
  type: SET_ALL_POKEMONS,
  allPokemons: allPokemons,
});
