import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchCertificates =
  createAsyncThunk(
    "certificates/fetchCertificates",
    async () => {
      const res = await axios.get(
        "http://localhost:5000/api/certificates"
      );

      return res.data;
    }
  );

const certificateSlice = createSlice({
  name: "certificates",

  initialState: {
    certificates: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchCertificates.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchCertificates.fulfilled,
        (state, action) => {
          state.loading = false;

          state.certificates =
            action.payload;
        }
      )

      .addCase(
        fetchCertificates.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.error.message;
        }
      );
  },
});

export default certificateSlice.reducer;