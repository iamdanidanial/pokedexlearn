import React from "react";
import PropTypes from "prop-types";

import { PokemonCard } from "components";
import utilStyles from "styles/utils.module.scss";

import ArrowIcon from "~/public/icons/right_arrow.svg";

import styles from "./PokemonEvolutions.module.scss";

const PokemonEvolutions = ({ allPokemonsData, evolutionChain }) => {
  const evolutionPokemons = [
    evolutionChain.chain.species,
    evolutionChain.chain.evolves_to[0]?.species,
    evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species,
  ].filter((x) => x);

  return (
    <div className={styles.container}>
      <h3 className={styles.container__subtitle}>Evolutions</h3>
      {evolutionPokemons.length < 1 ? (
        <p className={styles.container__something_went_wrong_p}>
          Something went wrong!
        </p>
      ) : (
        <div className={styles.container__pokemon_cards_div}>
          {evolutionPokemons.map((pokemon, index) => (
            <React.Fragment key={pokemon.name}>
              <PokemonCard
                pokemonName={pokemon.name}
                allPokemonsData={allPokemonsData}
              />
              {index !== evolutionPokemons.length - 1 && (
                <div className={utilStyles.flex_center}>
                  <ArrowIcon className={styles.container__arrow} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

PokemonEvolutions.propTypes = {
  allPokemonsData: PropTypes.array,
  evolutionChain: PropTypes.object,
};

PokemonEvolutions.defaultProps = {
  allPokemonsData: [],
  evolutionChain: {},
};

export default PokemonEvolutions;
