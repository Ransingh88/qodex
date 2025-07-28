import React from "react"
import "./layout.css"
import { useSelector } from "react-redux"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import Navbar from "@/components/navbar/Navbar"

const AuthLayout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { isAuthenticated } = useSelector((state) => state.auth)
  if (isAuthenticated) return navigate(from, { replace: true })
  return (
    <div className="authLayout-main_container">
      <div className="grid-pattrn">
        {/* <div className="grid-pattrn-radial"></div> */}
      </div>
      <div className="authLayout-container">
        <div className="authLayout-navbar">
          <div className="authLayout-navbar_logo">
            <Link to="/">qodex.</Link>
          </div>
          <div className="authLayout-navbar_menus">
            <ul>
              <Link to="/auth/login">
                <li className="authLayout-navbar_login">Login</li>
              </Link>
              <Link to="/auth/signup">
                <li className="authLayout-navbar_signup">Sign up</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="w-full h-full">
          <Outlet />
        </div>
        <div className="authLayout-footer">&copy; qodex. 2025 </div>
      </div>
    </div>
  )
}

export default AuthLayout
