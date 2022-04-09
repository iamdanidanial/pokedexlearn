import { createStore, combineReducers } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

import { listReducer, pokemonsReducer } from "./reducers";

const reducers = combineReducers({
  list: listReducer,
  pokemons: pokemonsReducer,
});

const store = createStore(reducers, composeWithDevTools());

export default store;
