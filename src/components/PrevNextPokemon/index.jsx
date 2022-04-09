import PropTypes from "prop-types";
import Link from "next/link";

import utilStyles from "styles/utils.module.scss";

import ArrowIcon from "~/public/icons/right_arrow.svg";

import styles from "./PrevNextPokemon.module.scss";

const PrevNextPokemon = ({ pokemonData, allPokemonsData }) => {
  const prevPokemon =
    allPokemonsData[pokemonData.id - 2] ||
    allPokemonsData[allPokemonsData.length - 1];
  const nextPokemon = allPokemonsData[pokemonData.id] || allPokemonsData[0];

  const prevPokemonId =
    "#" + `00${allPokemonsData.indexOf(prevPokemon) + 1}`.slice(-3);
  const nextPokemonId =
    "#" + `00${allPokemonsData.indexOf(nextPokemon) + 1}`.slice(-3);

  const prevPokemonName =
    prevPokemon.name
      .slice(0, prevPokemon.name.indexOf("-") + 1)
      .replace("-", "") || prevPokemon.name;

  const nextPokemonName =
    nextPokemon.name
      .slice(0, nextPokemon.name.indexOf("-") + 1)
      .replace("-", "") || nextPokemon.name;

  return (
    <div
      className={[styles.container, utilStyles.flex_space_between].join(" ")}
    >
      <Link href={`/${prevPokemon.name}`}>
        <a aria-label={`${prevPokemon.name} page`}>
          <div
            role="button"
            className={[
              styles.container__prev_next_pokemon_btn,
              utilStyles.flex_space_between,
            ].join(" ")}
          >
            <ArrowIcon className={styles.container__left_arrow} />
            <p>{`${prevPokemonName} ${prevPokemonId}`}</p>
          </div>
        </a>
      </Link>
      <Link href={`/${nextPokemon.name}`}>
        <a aria-label={`${nextPokemon.name} page`}>
          <div
            role="button"
            className={[
              styles.container__prev_next_pokemon_btn,
              utilStyles.flex_space_between,
            ].join(" ")}
          >
            <p>{`${nextPokemonName} ${nextPokemonId}`}</p>
            <ArrowIcon className={styles.container__right_arrow} />
          </div>
        </a>
      </Link>
    </div>
  );
};

PrevNextPokemon.propTypes = {
  pokemonData: PropTypes.object,
  allPokemonsData: PropTypes.array,
};

PrevNextPokemon.defaultProps = {
  pokemonData: {},
  allPokemonsData: [],
};

export default PrevNextPokemon;
