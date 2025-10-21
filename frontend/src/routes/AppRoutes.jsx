import { Route, Routes } from "react-router"
import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import ProblemLayout from "@/layouts/ProblemLayout"
import ProtectedLayout from "@/layouts/ProtectedLayout"
import PublicLayout from "@/layouts/PublicLayout"
import SettingLayout from "@/layouts/SettingLayout"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import Dashboard from "@/pages/dashboard/Dashboard"
import Problems from "@/pages/dashboard/Problems"
import Error from "@/pages/error/Error"
import Home from "@/pages/home/Home"
import Playlist from "@/pages/playlist/Playlist"
import PlaylistDetails from "@/pages/playlist/PlaylistDetails"
import ProblemDashboard from "@/pages/problem/dashboard/ProblemDashboard"
import Problem from "@/pages/problem/Problem"
import ProblemDetails from "@/pages/problem/ProblemDetails"
import Profile from "@/pages/profile/Profile"
import Password from "@/pages/setting/Password"
import StudyPlan from "@/pages/studyplan/StudyPlan"
import StudyPlanDetails from "@/pages/studyplan/StudyPlanDetails"
import ProtectedRoute from "./ProtectedRoute"
import Admin from "@/pages/dashboard/Admin"
import CreateProblem from "@/pages/dashboard/problems/CreateProblem"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/problems" element={<ProblemDashboard />}>
          <Route index element={<Problem />} />
          <Route path="study-plan" element={<StudyPlan />} />
          <Route path="study-plan/:id" element={<StudyPlanDetails />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="playlist/:id" element={<PlaylistDetails />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/problem" element={<ProblemLayout />}>
        <Route path=":id" element={<ProblemDetails />} />
      </Route>

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admin" element={<Admin />} />
            <Route path="users" element={<>Users</>} />
            <Route path="problems" element={<Problems />}>
              <Route index element={<>Problems</>} />
              <Route path="create" element={<CreateProblem />} />
            </Route>
          </Route>
          <Route path="/settings" element={<SettingLayout />}>
            <Route index element={<>Setting</>} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<Password />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
