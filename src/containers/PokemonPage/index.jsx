import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { processPokemonName } from "utils";
import utilStyles from "styles/utils.module.scss";
import { Layout, Loader, PrevNextPokemon } from "components";

import PokemonStats from "./PokemonStats";
import styles from "./PokemonPage.module.scss";
import PokemonInfoGrid from "./PokemonInfoGrid";
import PokemonEvolutions from "./PokemonEvolutions";

const PokemonPage = ({
  genders,
  pokemonData,
  pokemonSpecies,
  evolutionChain,
  allPokemonsData,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timerId = setTimeout(() => setLoadingImage(false), 1000);
    return () => {
      clearTimeout(timerId);
      setLoadingImage(true);
    };
  }, [router.asPath]);

  const processedPokemonId = `00${pokemonData.id}`.slice(-3);
  const processedPokemonName = processPokemonName(pokemonData.name);

  const pageTitle =
    processedPokemonName[0].toUpperCase() +
    processedPokemonName.slice(1) +
    " | Pokédex";
  const metaDescription = `Pokémon Page | ${
    processedPokemonName[0].toUpperCase() + processedPokemonName.slice(1)
  }`;

  const category = pokemonSpecies.genera
    .find((x) => x.language.name === "en")
    .genus.replace("Pokémon", "")
    .trim();
  const flavorText = pokemonSpecies.flavor_text_entries
    .find((x) => x.language.name === "en")
    .flavor_text.replace("\f", " ")
    .replace("POKéMON", "Pokémon");

  const avatarImageSrc = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${processedPokemonId}.png`;

  const mainSection = (
    <div className={styles.container__main_section}>
      <div className={styles.container__image_and_info}>
        <div className={styles.container__image_background}>
          {loadingImage ? (
            <Loader />
          ) : (
            <Image
              width={430}
              height={430}
              priority={true}
              src={avatarImageSrc}
            />
          )}
        </div>
        <div>
          <p className={styles.container__flavor_text}>{flavorText}</p>
          <PokemonInfoGrid
            genders={genders}
            category={category}
            pokemonData={pokemonData}
          />
          <PokemonStats pokemonData={pokemonData} />
        </div>
      </div>
      <PokemonEvolutions
        evolutionChain={evolutionChain}
        allPokemonsData={allPokemonsData}
      />
    </div>
  );

  return (
    <Layout title={pageTitle} metaDescription={metaDescription}>
      <main className={styles.container}>
        <PrevNextPokemon
          pokemonData={pokemonData}
          allPokemonsData={allPokemonsData}
        />
        <h1 className={styles.container__pokemon_name}>
          {processedPokemonName}{" "}
          <span className={styles.container__pokemon_id}>
            #{processedPokemonId}
          </span>
        </h1>
        <div className={utilStyles.flex_center}>
          <Link href="/">
            <a
              aria-label="home page link"
              className={styles.container__go_to_home_page}
            >
              Go to Home Page
            </a>
          </Link>
        </div>
        {mainSection}
      </main>
    </Layout>
  );
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
