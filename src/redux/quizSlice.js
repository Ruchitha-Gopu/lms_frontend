import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import axios from "axios";

export const fetchQuiz =
  createAsyncThunk(
    "quiz/fetchQuiz",
    async () => {
      const res = await axios.get(
        "http://localhost:5000/api/quiz"
      );

      return res.data;
    }
  );

const quizSlice = createSlice({
  name: "quiz",

  initialState: {
    questions: [],
    loading: false
  },

  extraReducers: (builder) => {
    builder
      .addCase(
        fetchQuiz.pending,
        (state) => {
          state.loading = true;
        }
      )
      .addCase(
        fetchQuiz.fulfilled,
        (state, action) => {
          state.loading = false;
          state.questions =
            action.payload;
        }
      );
  }
});

export default quizSlice.reducer;