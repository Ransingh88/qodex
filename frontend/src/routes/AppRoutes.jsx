import { Route, Routes } from "react-router"
import AuthLayout from "@/layouts/AuthLayout"
import PublicLayout from "@/layouts/PublicLayout"
import Login from "@/pages/auth/Login"
import Signup from "@/pages/auth/Signup"
import Error from "@/pages/error/Error"
import Home from "@/pages/home/Home"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
