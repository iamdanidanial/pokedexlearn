import PropTypes from "prop-types";

import { kgToPounds, metersToFtInString } from "utils";

import styles from "./PokemonInfoGrid.module.scss";

const PokemonInfoGrid = ({ genders, category, pokemonData }) => {
  const weightInKg = pokemonData.weight / 10;
  const heightInM = pokemonData.height / 10;

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.container__info_name_p}>Height</p>
        <p>
          {heightInM}m ({metersToFtInString(heightInM)})
        </p>
      </div>
      <div>
        <p className={styles.container__info_name_p}>Weight</p>
        <p>
          {weightInKg}kg ({kgToPounds(weightInKg)}lbs)
        </p>
      </div>
      <div>
        <p className={styles.container__info_name_p}>Category</p>
        <p>{category}</p>
      </div>
      <div>
        <p className={styles.container__info_name_p}>Types</p>
        {pokemonData.types.map((x) => (
          <p key={x.type.name}>{x.type.name}</p>
        ))}
      </div>
      <div>
        <p className={styles.container__info_name_p}>Abilities</p>
        {pokemonData.abilities
          .filter((x) => !x.is_hidden)
          .map((x) => (
            <p key={x.ability.name}>{x.ability.name}</p>
          ))}
      </div>
      <div>
        <p className={styles.container__info_name_p}>Gender</p>
        {genders.map((gender) => (
          <p key={gender}>{gender}</p>
        ))}
      </div>
    </div>
  );
};

PokemonInfoGrid.propTypes = {
  genders: PropTypes.array,
  category: PropTypes.string,
  pokemonData: PropTypes.object,
};

PokemonInfoGrid.defaultProps = {
  pokemonData: {},
  category: "unknown",
  genders: ["unknown"],
};

export default PokemonInfoGrid;
