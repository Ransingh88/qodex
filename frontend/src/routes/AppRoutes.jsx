import { Route, Routes } from "react-router"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import Error from "@/pages/error/Error"
import Home from "@/pages/home/Home"
import AuthLayout from "../layouts/AuthLayout"

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AppRoutes
