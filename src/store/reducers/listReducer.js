import { sortByOptions } from "utils";

const INITIAL_STATE = {
  offset: 0,
  limit: 20,
  searchValue: "",
  filterSearch: "",
  sortBy: sortByOptions[0],
  filterType: { name: "All Types" },
};

export const SET_LIMIT = "SET_LIMIT";
export const SET_OFFSET = "SET_OFFSET";
export const SET_SORT_BY = "SET_SORT_BY";
export const SET_FILTER_TYPE = "SET_FILTER_TYPE";
export const SET_SEARCH_VALUE = "SET_SEARCH_VALUE";
export const SET_FILTER_SEARCH = "SET_FILTER_SEARCH";

const listReducer = (
  state = INITIAL_STATE,
  { type, sortBy, limit, offset, searchValue, filterType, filterSearch }
) => {
  switch (type) {
    case SET_LIMIT:
      return { ...state, limit: limit };
    case SET_OFFSET:
      return { ...state, offset: offset };
    case SET_SEARCH_VALUE:
      return {
        ...state,
        searchValue: searchValue,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: sortBy,
      };
    case SET_FILTER_TYPE:
      return {
        ...state,
        filterType: filterType,
      };
    case SET_FILTER_SEARCH:
      return {
        ...state,
        filterSearch: filterSearch,
      };
    default:
      return state;
  }
};

export default listReducer;
