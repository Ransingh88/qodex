import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import playlistReducer from "./problem/playlistSlice"
import problemReducer from "./problem/problemSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problem: problemReducer,
    playlist: playlistReducer,
  },
})
