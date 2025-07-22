import React from "react"
import "./layout.css"
import { Link, Outlet } from "react-router"
import Navbar from "@/components/navbar/Navbar"

const AuthLayout = () => {
  return (
    <div className="authLayout-main_container">
      <div className="abck">
        <div className="abck-radial"></div>
      </div>
      <div className="authLayout-container">
        <div className="authLayout-navbar">
          <div className="authLayout-navbar_logo">
            <Link to="/">qodex.</Link>
          </div>
          <div className="authLayout-navbar_menus">
            <ul>
              <Link to="/auth/login">
                <li>Login</li>
              </Link>
              <Link to="/auth/signup">
                <li>Sign up</li>
              </Link>
            </ul>
          </div>
        </div>
        <Outlet />
        <div className="authLayout-footer">&copy; qodex. 2025 </div>
      </div>
    </div>
  )
}

export default AuthLayout
