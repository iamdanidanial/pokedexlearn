export const selectListLimit = (state) => state.list.limit;

export const selectListOffset = (state) => state.list.offset;

export const selectListSortBy = (state) => state.list.sortBy;

export const selectSearchValue = (state) => state.list.searchValue;

export const selectFilterType = (state) => state.list.filterType;

export const selectFilterSearch = (state) => state.list.filterSearch;

export const selectProcessedSearchValue = (state) =>
  state.list.searchValue.trim().replace(/\s\s+/g, " ").toLowerCase();
