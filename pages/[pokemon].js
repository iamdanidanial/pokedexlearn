import PropTypes from "prop-types";

import * as lib from "lib";
import { PokemonPageContainer } from "containers";

const PokemonPage = ({
  genders,
  pokemonData,
  pokemonSpecies,
  evolutionChain,
  allPokemonsData,
}) => {
  return (
    <PokemonPageContainer
      genders={genders}
      pokemonData={pokemonData}
      pokemonSpecies={pokemonSpecies}
      evolutionChain={evolutionChain}
      allPokemonsData={allPokemonsData}
    />
  );
};

export const getStaticPaths = async () => {
  const allPokemons = await lib.getAllPokemonsData();

  const paths = allPokemons.map((pokemon) => ({
    params: {
      pokemon: pokemon.name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  try {
    const malePokemons = await lib.getAllMalePokemons();
    const allPokemonsData = await lib.getAllPokemonsData();
    const femalePokemons = await lib.getAllFemalePokemons();
    const pokemonData = await lib.getPokemonData(params.pokemon);
    const pokemonSpecies = await lib.getPokemonSpecies(pokemonData.id);
    const evolutionChain = await lib.getEvolutionChain(pokemonSpecies);

    const genders = [
      malePokemons.includes(pokemonData.name) ? "male" : null,
      femalePokemons.includes(pokemonData.name) ? "female" : null,
    ].filter((x) => x);

    return {
      props: {
        pokemonData: pokemonData,
        pokemonSpecies: pokemonSpecies,
        evolutionChain: evolutionChain,
        allPokemonsData: allPokemonsData,
        genders: genders.length >= 1 ? genders : ["unknown"],
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

PokemonPage.propTypes = {
  genders: PropTypes.array,
  pokemonData: PropTypes.object,
  evolutionChain: PropTypes.object,
  pokemonSpecies: PropTypes.object,
  allPokemonsData: PropTypes.array,
};

PokemonPage.defaultProps = {
  pokemonData: {},
  pokemonSpecies: {},
  evolutionChain: {},
  allPokemonsData: [],
  genders: ["unknown"],
};

export default PokemonPage;
