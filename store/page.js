import {configureStore} from "@reduxjs/toolkit";

import uiSlice from './ui-slice';
import charactersSlice from './characters-list-slice';
// import dataReducer  from './characters-list-slice';

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    characters: charactersSlice.reducer,
    // characterItem: characterItemSlice.reducer,
  }
});
export default store;