import { Route, Routes } from "react-router"
import AuthLayout from "@/layouts/AuthLayout"
import DashboardLayout from "@/layouts/DashboardLayout"
import ProblemLayout from "@/layouts/ProblemLayout"
import PublicLayout from "@/layouts/PublicLayout"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import Error from "@/pages/error/Error"
import Home from "@/pages/home/Home"
import Problem from "@/pages/problem/Problem"
import Profile from "@/pages/profile/Profile"
import ProtectedRoute from "./ProtectedRoute"
import ProblemDetails from "@/pages/problem/ProblemDetails"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="/problems" element={<Problem />} />
        <Route path="*" element={<Error />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route path="/problem" element={<ProblemLayout />}>
        <Route path=":id" element={<ProblemDetails/>} />
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
