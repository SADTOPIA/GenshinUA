import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharactersList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCharactersList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const fetchCharactersList = createAsyncThunk(
  "characters/fetchCharactersList",
  async (itemListSlug) => {
    const urlPath = "http://127.0.0.1:8000";
    try {
      const response = await fetch(`${urlPath}/${itemListSlug}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });

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

export default charactersSlice;
