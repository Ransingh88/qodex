import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  studyPlans: [],
  isLoading: false,
}

const studyPlanSlice = createSlice({
  name: "studyPlan",
  initialState,
  reducers: {
    fetchStudyPlansStart(state) {
      state.isLoading = true
    },
    fetchStudyPlans(state, action) {
      state.studyPlans = action.payload
      state.isLoading = false
    },
    addStudyPlan(state, action) {
      state.studyPlans.push(action.payload)
    },
    deleteStudyPlan(state, action) {
      state.studyPlans = state.studyPlans.filter((plan) => plan._id !== action.payload)
    },
  },
})

export const { fetchStudyPlansStart, fetchStudyPlans, addStudyPlan, deleteStudyPlan } = studyPlanSlice.actions
export default studyPlanSlice.reducer
