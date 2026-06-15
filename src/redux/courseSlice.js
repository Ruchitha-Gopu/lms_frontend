import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses } = courseSlice.actions;
export default courseSlice.reducer;