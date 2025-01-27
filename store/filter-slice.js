import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchQuery: "",
    selectedFilters: {
      stars: "All",
      weapon: "All",
      element: "All",
    },
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilter(state, action) {
      const { filterType, value } = action.payload;
      state.selectedFilters[filterType] = value;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;