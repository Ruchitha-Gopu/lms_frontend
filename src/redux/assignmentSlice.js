import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchAssignments =
  createAsyncThunk(
    "assignments/fetchAssignments",
    async () => {
      const res = await axios.get(
        "http://localhost:5000/api/assignments"
      );

      return res.data;
    }
  );

const assignmentSlice = createSlice({
  name: "assignments",

  initialState: {
    data: [],
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAssignments.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        fetchAssignments.fulfilled,
        (state, action) => {
          state.loading = false;
          state.data = action.payload;
        }
      );
  },
});

export default assignmentSlice.reducer;