// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//
// const charactersSlice = createSlice({
//   name: 'characters',
//   initialState: {
//     data: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCharactersList.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCharactersList.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(fetchCharactersList.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });
//
// export const fetchCharactersList = createAsyncThunk(
//   "characters/fetchCharactersList",
//   async ({itemListSlug,filters}) => {
//
//     const urlPath = "http://127.0.0.1:8000";
//     try {
//
//       const response = await fetch(`${urlPath}/${itemListSlug}/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(filters),
//       });
//
//       if (!response.ok) {
//         throw new Error("Failed to fetch data");
//       }
//
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       throw error;
//     }
//   }
// );
//
// export default charactersSlice;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchListCharacters } from "@/lib/fetch-requests";

export const fetchCharactersList = createAsyncThunk(
  "characters/fetchCharactersList",
  async ({ itemListSlug, filters, initialData }, { getState }) => {
    const state = getState().characters;

    // Если есть initialData и данных нет, используем его
    if (initialData && state.data.length === 0) {
      return initialData;
    }

    if (
      Object.keys(state.filters).length > 0 &&
      JSON.stringify(state.filters) === JSON.stringify(filters)
    ) {
      console.log("⏳ Фильтры не изменились, используем кешированные данные");
      return state.data;
    }


    console.log("🚀 Отправляем запрос с фильтрами:", filters);

    return await fetchListCharacters({ itemListSlug, filters });
  }
);

const charactersSlice = createSlice({
  name: "characters",
  initialState: { data: [], filters: {}, itemListSlug: "", loading: false, error: null },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setItemListSlug: (state, action) => {
      if (state.itemListSlug !== action.payload) {
        state.itemListSlug = action.payload;
        state.filters = {}; // Сбрасываем фильтры при смене категории
        state.data = []; // Очищаем список перед новым запросом
      }
    }
  },
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

export const { setFilters, setItemListSlug } = charactersSlice.actions;
export default charactersSlice.reducer;
