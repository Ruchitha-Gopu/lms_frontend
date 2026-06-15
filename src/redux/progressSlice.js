import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET Progress Data
export const fetchProgress = createAsyncThunk(
  "progress/fetchProgress",
  async () => {
    const res = await axios.get(
      "http://localhost:5000/api/progress"
    );

    return res.data;
  }
);

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

      .addCase(
        fetchProgress.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProgress.fulfilled,
        (state, action) => {
          state.loading = false;
          state.progress = action.payload;
        }
      )

      .addCase(
        fetchProgress.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default progressSlice.reducer;