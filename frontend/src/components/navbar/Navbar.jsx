import "./navbar.css"
import {
  CircleUser,
  CreditCard,
  Handshake,
  Info,
  LogOut,
  Settings,
} from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { logout } from "../../features/rtk/auth/authSlice"
import { logoutUser } from "../../services/auth.service"
const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logoutUser()
    dispatch(logout())
    navigate("/", { replace: true })
  }

  const menus = [
    {
      label: "dashboard",
      url: "/dashboard",
      protected: true,
    },
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
    <div
      className={`navbar-main_container ${
        isScrolled ? "border-b border-border-default" : ""
      }`}
    >
      <div className="navbar-container">
        <div className="navbar-left">
          <div className="navbar-logo">
            <Link to="/">qodex.</Link>
          </div>
          <ul className="navbar-menus">
            {menus.map((menu, i) => (
              <li key={i}>
                <Link to={menu.url}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-right">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <div
                className="h-10 w-10 rounded-full bg-accent-fg/40 text-fg-muted flex items-center justify-center relative cursor-pointer"
                onClick={() => {
                  setShowProfileDropdown(true)
                }}
                onMouseLeave={() => {
                  setShowProfileDropdown(false)
                }}
              >
                <p className="font-bold">{user.username[0].toUpperCase()}</p>
                {showProfileDropdown && (
                  <div className=" absolute top-12 right-0 min-h-62 min-w-64 bg-basebg-surface text-fg-default rounded-2xl shadow-lg border border-border-default flex flex-col items-start justify-between">
                    <div className="w-full box-border">
                      <div className="m-1 px-3 py-2 bg-basebg-surface2 border border-border-default rounded-xl">
                        <p>{user.fullName}</p>
                        <p className="text-sm font-light text-fg-muted">
                          {user.email}
                        </p>
                      </div>
                      <div className="p-2 flex flex-col">
                        <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg ">
                          <CircleUser size={16} className="mt-0.5" />
                          Profile
                        </div>
                        <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                          <Handshake size={16} className="mt-0.5" /> Community
                        </div>
                        <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                          <CreditCard size={16} className="mt-0.5" />{" "}
                          Subscription
                        </div>
                        <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                          <Settings size={16} className="mt-0.5" /> Settinga
                        </div>
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="h-0.25 bg-border-default"></div>
                      <div className="p-2 flex flex-col">
                        <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                          <Info size={16} className="mt-0.5" /> Help center
                        </div>
                        <div
                          onClick={handleLogout}
                          className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg"
                        >
                          <LogOut size={16} className="mt-0.5" />
                          Sign out
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/auth/login" className="navbar-login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
