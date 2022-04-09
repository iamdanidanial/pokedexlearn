import PropTypes from "prop-types";

import { getAllPokemonsData } from "lib";
import { HomePageContainer } from "containers";

const HomePage = ({ notFound, allPokemonsData }) => {
  return (
    <HomePageContainer notFound={notFound} allPokemonsData={allPokemonsData} />
  );
};

export const getStaticProps = async () => {
  try {
    const allPokemonsData = await getAllPokemonsData();

    return {
      props: {
        allPokemonsData,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
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
