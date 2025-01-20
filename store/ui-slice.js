import {createSlice} from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: { currentPath: '/'},
  reducers: {
    highlightBtn(state, action) {
      const newPath = action.payload;
      state.currentPath = newPath;
    }
  }
})

export const uiActions = uiSlice.actions;

export default uiSlice;