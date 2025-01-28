import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    searchQuery: "",
    selectedFilters: {
      stars: [],
      weapons: [],
      elements: [],
    },
  },
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setFilter(state, action) {
      const { filterType, value } = action.payload;

      if (value === "All") {
        state.selectedFilters[filterType] = [];
      } else {
        const currentValues = state.selectedFilters[filterType];
        const index = currentValues.indexOf(value);

        if (index === -1) {
          state.selectedFilters[filterType] = [...currentValues, value];
        } else {
          state.selectedFilters[filterType] = currentValues.filter(
            (item) => item !== value
          );
        }
      }
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice;