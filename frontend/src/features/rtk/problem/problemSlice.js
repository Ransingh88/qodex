import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  problems: [],
  problemDetails: {},
  problemOutput: {},
  problemSubmissions: [],
  selectedProblems: [],
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
    addSelectedProblem(state, action) {
      if (!state.selectedProblems.includes(action.payload)) {
        if (Array.isArray(action.payload)) {
          state.selectedProblems = [...action.payload]
          return
        }

        state.selectedProblems.push(action.payload)
      }
    },
    removeSelectedProblem(state, action) {
      state.selectedProblems = state.selectedProblems.filter((id) => id !== action.payload)
    },
    clearSelectedProblems(state) {
      state.selectedProblems = []
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
  addSelectedProblem,
  removeSelectedProblem,
  clearSelectedProblems,
} = problemSlice.actions

export default problemSlice.reducer
