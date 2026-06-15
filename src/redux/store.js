import { configureStore } from "@reduxjs/toolkit";
import certificateReducer
from "./certificateSlice";

import authReducer from "./authSlice";
import assignmentReducer from "./assignmentSlice";
import quizReducer from "./quizSlice";
import progressReducer from "./progressSlice";



const store = configureStore({
  reducer: {
    auth: authReducer,
    assignments: assignmentReducer,
    quiz: quizReducer,
    progress: progressReducer,
    certificates: certificateReducer,
  },
});

export default store;