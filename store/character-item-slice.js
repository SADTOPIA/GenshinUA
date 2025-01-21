import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const characterItemSlice = createSlice({
  name: "characterItem",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharacterItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchCharacterItem = createAsyncThunk(
  "characterItem/fetchCharacterItem",
  async (itemPageSlug) => {
    const urlPath = "http://127.0.0.1:8000";

    try {
      const response = await fetch(`${urlPath}/characters/${itemPageSlug}`);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);


export default characterItemSlice;