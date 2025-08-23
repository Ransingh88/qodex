import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./auth/authSlice"
import problemReducer from "./problem/problemSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problem: problemReducer,
  },
})
