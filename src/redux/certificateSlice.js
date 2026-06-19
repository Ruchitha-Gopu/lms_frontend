import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// API call for getting certificates
export const fetchCertificates = createAsyncThunk(
  "certificates/fetchCertificates",

  async () => {
    const response = await API.get("/api/certificates");

    return response.data;
  }
);

// Certificate state
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

      // API loading started
      .addCase(fetchCertificates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API success
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.loading = false;
        state.certificates = action.payload;
      })

      // API failed
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default certificateSlice.reducer;