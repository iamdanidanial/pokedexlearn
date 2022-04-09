export const processPokemonName = (name) =>
  name.slice(0, name.indexOf("-") > -1 ? name.indexOf("-") : name.length);
