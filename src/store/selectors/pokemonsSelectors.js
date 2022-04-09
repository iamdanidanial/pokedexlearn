export const selectPokemons = (state) => state.pokemons.pokemons;

export const selectAllPokemons = (state) => state.pokemons.allPokemons;

export const selectPokemonsCount = (state) => state.pokemons.pokemons.length;

export const selectAllPokemonsCount = (state) =>
  state.pokemons.allPokemons.length;
