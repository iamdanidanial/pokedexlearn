import {
  SET_LIMIT,
  SET_OFFSET,
  SET_SORT_BY,
  SET_FILTER_TYPE,
  SET_SEARCH_VALUE,
  SET_FILTER_SEARCH,
} from "store/reducers/listReducer";

export const setListLimit = (limit) => ({
  type: SET_LIMIT,
  limit: limit,
});

export const setListOffset = (offset) => ({
  type: SET_OFFSET,
  offset: offset,
});

export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  searchValue: searchValue,
});

export const setListSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy: sortBy,
});

export const setFilterType = (filterType) => ({
  type: SET_FILTER_TYPE,
  filterType: filterType,
});

export const setFilterSearch = (filterSearch) => ({
  type: SET_FILTER_SEARCH,
  filterSearch: filterSearch.trim().replace(/\s\s+/g, " ").toLowerCase(),
});
