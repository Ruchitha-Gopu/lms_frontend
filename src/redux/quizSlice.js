import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

// API call for getting quiz questions
export const fetchQuiz = createAsyncThunk(
  "quiz/fetchQuiz",

  async () => {
    const response = await API.get("/api/quiz");

    return response.data;
  }
);

// Quiz state
const quizSlice = createSlice({
  name: "quiz",

  initialState: {
    questions: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // API loading started
      .addCase(fetchQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // API success
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })

      // API failed
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default quizSlice.reducer;