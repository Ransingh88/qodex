import "./login.css"
import { useState } from "react"
import { loginUser } from "../../services/auth.service"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { login as lg } from "../../features/rtk/auth/authSlice"
import { Link, useNavigate } from "react-router"
import { useAsyncHandler } from "../../hooks/useAsyncHandler"

const Login = () => {
  const { run, loading, error } = useAsyncHandler()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogin = async () => {
    const res = await run(() => loginUser(username, password))
    toast.success(res.data.message)
    dispatch(lg(res.data.data.user))
    navigate("/")
  }
  if (isAuthenticated) return navigate("/")
  return (
    <div className="login_main-container">
      <div className="login-container">
        <h3 className="logo">
          <Link to="/">qodex.</Link>
        </h3>
        <div className="login-form">
          <div className="login-form_header">
            <p className="form_title">Sign in to Account</p>
            {/* <span className="form_subtitle">Start your 14 days free trial</span> */}
          </div>
          <div className="login-form_body">
            <span className="form_input">
              <label>Email or Username</label>
              <input
                type="text"
                placeholder="username@google.com"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className=""
              />
            </span>
            <span className="form_input">
              <label>Password</label>
              <input
                type="password"
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className=""
              />
            </span>
            <span className="form_input-actions">
              <span>
                <input type="checkbox" name="" id="" />
                <label>Remember Me</label>
              </span>
              <p>Forgot password?</p>
            </span>
            <button
              disabled={loading}
              onClick={handleLogin}
              className="form_button"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          {/* <div className="login-form_devider">
            <span className="devider_line"></span>
            <span className="devider_text">OR</span>
            <span className="devider_line"></span>
          </div> */}
          <div className="login-social">
            <button className="social-login_button">Sign in with Google</button>
            {/* <button className="social-login_button">Sign in with Github</button> */}
            {/* <button className="social-login_button">
              Sign in with Linked In
            </button> */}
          </div>
        </div>
      </div>
      <div className="login-slideshow"></div>
    </div>
  )
}

export default Login
