import axios from "axios";
import { api } from "utils";

export const getAllPokemonsData = async () => {
  const { data } = await api.get("pokemon?offset=0&limit=898");

  return data.results;
};

export const getPokemonData = async (name) => {
  const { data } = await api.get(`pokemon/${name}/`);

  return data;
};

export const getPokemonSpecies = async (id) => {
  const { data } = await api.get(`pokemon-species/${id}/`);

  return data;
};

export const getAllFemalePokemons = async () => {
  const { data } = await api.get("gender/1/");

  return data.pokemon_species_details.map((x) => x.pokemon_species.name);
};

export const getAllMalePokemons = async () => {
  const { data } = await api.get("gender/2/");

  return data.pokemon_species_details.map((x) => x.pokemon_species.name);
};

export const getEvolutionChain = async (pokemonSpecies) => {
  const { data } = await axios.get(pokemonSpecies?.evolution_chain?.url);

  return data;
};
