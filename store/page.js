import {configureStore} from "@reduxjs/toolkit";

import uiSlice from './ui-slice';
import charactersSlice from './characters-list-slice';
import characterItemSlice  from './character-item-slice';
import filterSlice from './filter-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    characters: charactersSlice.reducer,
    characterItem: characterItemSlice.reducer,
    filter: filterSlice.reducer,
  }
});
export default store;