import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
    },
    setAuth: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
    },
    setAuthLoading: (state) => {
      state.isLoading = true
    },
  },
})

export const { login, logout, setAuth, setAuthLoading } = authSlice.actions

export default authSlice.reducer
