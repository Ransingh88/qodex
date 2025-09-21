import "./navbar.css"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useLocation, useNavigate } from "react-router"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { logout } from "../../features/rtk/auth/authSlice"
import { logoutUser } from "../../services/auth.service"
import UserPopover from "../popover/UserPopover"
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout())
    navigate("/", { replace: true })
  }

  const menus = [
    // {
    //   label: "dashboard",
    //   url: "/dashboard",
    //   protected: true,
    // },
    {
      label: "problems",
      url: "/problems",
      protected: false,
    },
    {
      label: "explore",
      url: "/explore",
      protected: false,
    },
    {
      label: "contest",
      url: "/contest",
      protected: false,
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      animate={{
        height: isScrolled ? "4rem" : "6rem",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`navbar-main_container ${isScrolled ? "bg-basebg-default border-border-default h-20" : "h-24 border-transparent"}`}
    >
      <div className={`navbar-container ${location.pathname.includes("problems") ? "container" : "container-guttered"}`}>
        <div className="navbar-left">
          <div className="navbar-logo">
            <Link to="/">qodex.</Link>
          </div>
          <ul className="navbar-menus">
            {menus.map((menu, i) => (
              <li key={i}>
                <NavLink to={menu.url} className={({ isActive, isPending }) => (isPending ? "navbar-pending" : isActive ? "navbar-active" : "")}>
                  {menu.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-right">
          <ThemeToggle />
          {isAuthenticated ? (
            <UserPopover logoutFn={handleLogout} />
          ) : (
            <Link to="/auth/login" className="navbar-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar
