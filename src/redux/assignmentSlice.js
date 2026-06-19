import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import API from "../api";

// API call for getting assignments
export const fetchAssignments =
  createAsyncThunk(
    "assignments/fetchAssignments",

    async () => {
      const response = await API.get(
        "/api/assignments"
      );

      return response.data;
    }
  );

const assignmentSlice = createSlice({
  name: "assignments",

  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // API loading started
      .addCase(
        fetchAssignments.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // API success
      .addCase(
        fetchAssignments.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      )

      // API failed
      .addCase(
        fetchAssignments.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message;
        }
      );
  },
});

export default assignmentSlice.reducer;