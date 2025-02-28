// import {configureStore} from "@reduxjs/toolkit";
//
//
// import charactersSlice from './characters-list-slice';
// import characterItemSlice  from './character-item-slice';
// import filterSlice from './filter-slice';
//
// const store = configureStore({
//   reducer: {
//     characters: charactersSlice.reducer,
//     characterItem: characterItemSlice.reducer,
//     filter: filterSlice.reducer,
//   }
// });
// export default store;

import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./characters-list-slice";
import characterItemReducer from "./character-item-slice";
import filterReducer from "./filter-slice";

const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterItem: characterItemReducer,
    filter: filterReducer,
  },
});

export default store;
