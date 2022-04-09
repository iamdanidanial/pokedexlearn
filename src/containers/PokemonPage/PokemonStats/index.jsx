import PropTypes from "prop-types";

import { maxStatValues } from "utils";
import utilStyles from "styles/utils.module.scss";

import styles from "./PokemonStats.module.scss";

const PokemonStats = ({ pokemonData }) => {
  const fractions = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className={styles.container}>
      <h3 className={styles.container__subtitle}>Stats</h3>
      {pokemonData.stats.map((stat) => (
        <div key={stat.stat.name}>
          <div className={styles.container__stat_bar}>
            {fractions.map((x, i) => (
              <div
                key={x}
                className={[
                  styles.container__stat_block,
                  (stat.base_stat / maxStatValues[stat.stat.name]) * 15 >=
                    fractions.length - i || i === fractions.length - 1
                    ? utilStyles.background_primary_color
                    : "",
                ].join(" ")}
              ></div>
            ))}
          </div>
          <div>
            <p className={styles.container__stat_name}>
              {stat.stat.name === "hp"
                ? "HP"
                : stat.stat.name.replace("-", " ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

PokemonStats.propTypes = {
  pokemonData: PropTypes.object,
};

PokemonStats.defaultProps = {
  pokemonData: {},
};

export default PokemonStats;
