import { useEffect } from "react";
import { PropTypes } from "prop-types";
import { useDispatch } from "react-redux";

import { Layout, PokemonList } from "components";
import { setAllPokemons, setSearchValue, setFilterSearch } from "store/actions";

import styles from "./HomePage.module.scss";

const pageTitle = "Pokédex";
const metaDescription = "Home Page - Pokémon list";

const HomePage = ({ notFound, allPokemonsData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (allPokemonsData && !notFound) {
      dispatch(setAllPokemons(allPokemonsData));
    }

    dispatch(setSearchValue(""));
    dispatch(setFilterSearch(""));
  }, [allPokemonsData]);

  return (
    <Layout title={pageTitle} metaDescription={metaDescription}>
      <main className={styles.container}>
        <h1 className={styles.container__title}>Pokédex</h1>
        {notFound ? (
          <p className={styles.container__error_message}>
            Something went Wrong
          </p>
        ) : (
          <PokemonList />
        )}
      </main>
    </Layout>
  );
};

HomePage.propTypes = {
  notFound: PropTypes.bool,
  allPokemonsData: PropTypes.array,
};

HomePage.defaultProps = {
  notFound: false,
  allPokemonsData: [],
};

export default HomePage;
