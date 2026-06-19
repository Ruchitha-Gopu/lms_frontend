import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// API call for getting progress data
export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",

  async () => {
    const response = await API.get("/api/progress");

    return response.data;
  }
);

// Progress state
const progressSlice = createSlice({
  name: "progress",

  initialState: {
    progress: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // API loading started
      .addCase(fetchProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API success
      .addCase(fetchProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })

      // API failed
      .addCase(fetchProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default progressSlice.reducer;