import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
  },
})

export const { login } = authSlice.actions

export default authSlice.reducer
