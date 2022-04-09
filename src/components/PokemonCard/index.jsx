import { useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

import { Loader } from "components";
import { processPokemonName } from "utils";
import utilStyles from "styles/utils.module.scss";

import styles from "./PokemonCard.module.scss";

const fetch = (url) =>
  axios.get(url).then((res) => {
    return res.data;
  });

const PokemonCard = ({ pokemon, pokemonName, allPokemonsData }) => {
  const [url, setUrl] = useState("");

  const { data: pokemonData, error } = useSWR(url, fetch, {
    errorRetryCount: 0,
  });

  useEffect(async () => {
    if (pokemon?.url) {
      setUrl(pokemon.url);
    } else if (pokemonName) {
      const newURL =
        allPokemonsData.find(
          (pokemon) => processPokemonName(pokemon.name) === pokemonName
        )?.url || "Invalid URL";
      setUrl(newURL);
    }
  }, []);

  const processedPokemonName = processPokemonName(pokemonData?.name || "");

  const content = pokemonData && !error && (
    <>
      <Link href={`/${pokemonData.name}`}>
        <a
          className={utilStyles.width_max}
          aria-label={`${pokemonData.name} page`}
        >
          <div className={styles.container__pokemon_avatar_background}>
            <Image
              width={150}
              height={150}
              alt="pokemon avatar"
              className={styles.container__pokemon_avatar}
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${(
                "00" + pokemonData.id
              ).slice(-3)}.png`}
            />
          </div>
        </a>
      </Link>
      <div className={utilStyles.text_align_center}>
        <p className={styles.container__pokemon_name}>{processedPokemonName}</p>
        <p className={styles.container__pokemon_id}>
          {"#" + ("00" + pokemonData.id).slice(-3)}
        </p>
        <p className={styles.container__pokemon_types}>
          {pokemonData.types?.map((type) => type.type.name).join(", ")}
        </p>
      </div>
    </>
  );

  return (
    <div
      className={[
        styles.container,
        error || !pokemonData ? utilStyles.flex_center : "",
      ].join(" ")}
    >
      {error && (
        <div
          className={[
            utilStyles.flex_center,
            styles.container__error_message,
          ].join(" ")}
        >
          Something went wrong!
        </div>
      )}
      {!pokemonData && !error ? <Loader /> : content}
    </div>
  );
};

PokemonCard.propTypes = {
  pokemon: PropTypes.object,
  allPokemonsData: PropTypes.array,
  pokemonName: PropTypes.string,
};

PokemonCard.defaultProps = {
  pokemon: {},
  pokemonName: "",
  allPokemonsData: [],
};

export default PokemonCard;
