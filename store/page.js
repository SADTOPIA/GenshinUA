import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./characters-list-slice";
import filterReducer from "./filter-slice";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    filter: filterReducer,
  },
});

export default store;
