import { Route, Routes } from "react-router"
import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import ProblemLayout from "@/layouts/ProblemLayout"
import PublicLayout from "@/layouts/PublicLayout"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import Error from "@/pages/error/Error"
import Home from "@/pages/home/Home"
import Playlist from "@/pages/playlist/Playlist"
import PlaylistDetails from "@/pages/playlist/PlaylistDetails"
import ProblemDashboard from "@/pages/problem/dashboard/ProblemDashboard"
import Problem from "@/pages/problem/Problem"
import ProblemDetails from "@/pages/problem/ProblemDetails"
import Profile from "@/pages/profile/Profile"
import ProtectedRoute from "./ProtectedRoute"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/problems" element={<ProblemDashboard />}>
          <Route index element={<Problem />} />
          <Route path="study-plan" element={<div className="px-2">Study Plan</div>} />
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
        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes
