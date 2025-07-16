import "./navbar.css"
import ThemeToggle from "../theme/ThemeToggle"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { logoutUser } from "../../services/auth.service"
import { useEffect } from "react"
import { logout } from "../../features/rtk/auth/authSlice"
const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout())
    navigate("/")
  }

  return (
    <div className="navbar-container">
      <div className="navbar">
        <h4 className="logo">qodex .</h4>
        <div className="menus">
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <div>
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-200 text-amber-700 font-bold cursor-pointer flex items-center justify-center">
                  {user.username[0].toUpperCase()}
                </div>
                <button onClick={handleLogout} className="cursor-pointer">
                  logout
                </button>
              </div>
            ) : (
              <Link to="/auth/login">login</Link>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
