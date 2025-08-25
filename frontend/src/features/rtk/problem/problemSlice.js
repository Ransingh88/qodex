import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  problems: [],
  problemDetails: {},
  problemOutput: {},
  isLoading: false,
  error: null,
}

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    fetchProblemsStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchProblems(state, action) {
      state.isLoading = false
      state.problems = action.payload
    },
    fetchProblemDetailsStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchProblemDetails(state, action) {
      state.isLoading = false
      state.problemDetails = action.payload
    },
    executeProblemsStart(state) {
      state.isLoading = true
      state.error = null
    },
    executeProblems(state, action) {
      state.isLoading = false
      state.problemOutput = action.payload
    },
  },
})

export const {
  fetchProblems,
  fetchProblemDetails,
  executeProblemsStart,
  executeProblems,
} = problemSlice.actions

export default problemSlice.reducer
