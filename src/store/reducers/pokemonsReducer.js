const INITIAL_STATE = { allPokemons: [], pokemons: [] };

export const SET_POKEMONS = "SET_POKEMONS";
export const SET_ALL_POKEMONS = "SET_ALL_POKEMONS";

const pokemonsReducer = (
  state = INITIAL_STATE,
  { type, pokemons, allPokemons }
) => {
  switch (type) {
    case SET_POKEMONS:
      return { ...state, pokemons: pokemons };
    case SET_ALL_POKEMONS:
      return { ...state, pokemons: allPokemons, allPokemons: allPokemons };
    default:
      return state;
  }
};

export default pokemonsReducer;
