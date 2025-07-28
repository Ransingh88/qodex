import "./login.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation, useNavigate } from "react-router"
import { toast } from "react-toastify"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { login as lg } from "@/features/rtk/auth/authSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { loginUser } from "@/services/auth.service"

const Login = () => {
  const { run, loading } = useAsyncHandler()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogin = async () => {
    const res = await run(() => loginUser(username, password))
    toast.success(res.data.message)
    dispatch(lg(res.data.data.user))
    navigate(from, { replace: true })
  }
  return (
    <div className="login_main-container">
      <div className="login-container">
        <div className="login-form">
          <div className="login-form_header">
            <p className="form_title">Login to Account</p>
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
              {loading ? <LoadingSpinner /> : "Login"}
            </button>
          </div>
          <div className="login-social">
            <button className="social-login_button">Sign in with Google</button>
            <button className="social-login_button">Sign in with Github</button>
          </div>
          <div className="login-form_links">
            <p>
              Don&apos;t have an account? <Link to="/auth/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
