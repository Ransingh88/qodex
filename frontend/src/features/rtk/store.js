import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import playlistReducer from "./problem/playlistSlice"
import studyPlanReducer from "./problem/studyPlanSlice"
import problemReducer from "./problem/problemSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problem: problemReducer,
    playlist: playlistReducer,
    studyPlan: studyPlanReducer,
  },
})
