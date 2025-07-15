import { Route, Routes } from "react-router"
import Home from "../pages/home/Home"
import Error from "../pages/error/Error"
import Login from "../pages/auth/Login"

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AppRoutes
