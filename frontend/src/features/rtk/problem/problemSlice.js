import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  problems: [],
  problemDetails: {},
  problemOutput: {},
  problemSubmissions: [],
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
      state.problems = action.payload
      state.isLoading = false
    },
    fetchProblemDetailsStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchProblemDetails(state, action) {
      state.problemDetails = action.payload
      state.isLoading = false
    },
    clearProblemDetails(state) {
      state.problemDetails = {}
    },
    fetchProblemSubmissionsStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchProblemSubmissions(state, action) {
      state.problemSubmissions = action.payload
      state.isLoading = false
    },
    executeProblemsStart(state) {
      state.isLoading = true
      state.error = null
    },
    executeProblems(state, action) {
      state.problemOutput = action.payload
      state.isLoading = false
    },
  },
})

export const {
  fetchProblemsStart,
  fetchProblems,
  fetchProblemDetailsStart,
  fetchProblemDetails,
  clearProblemDetails,
  executeProblemsStart,
  executeProblems,
  fetchProblemSubmissionsStart,
  fetchProblemSubmissions,
} = problemSlice.actions

export default problemSlice.reducer
