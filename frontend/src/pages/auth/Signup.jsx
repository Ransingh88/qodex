import "./signup.css"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import { toast } from "react-toastify"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { login as lg } from "@/features/rtk/auth/authSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { registerUser } from "@/services/auth.service"
import { ArrowLeft, MoveLeft } from "lucide-react"

const Signup = () => {
  const { run, loading } = useAsyncHandler()
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  })
  const [isEmailContinue, setEmailContinue] = useState(false)
  const { fullname, username, email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEmailContinue = () => {
    if (email) {
      setEmailContinue(true)
    } else {
      toast.error("email is required")
    }
  }

  const handleBack = () => {
    setEmailContinue(false)
  }

  const handleLogin = async () => {
    const res = await run(() => registerUser(formData))
    toast.success(res.data.message)
    dispatch(lg(res.data.data.user))
    navigate("/")
  }
  if (isAuthenticated) return navigate("/")
  return (
    <div className="login_main-container">
      <div className="login-container">
        <div className="login-form">
          <div className="login-form_header">
            <p className="form_title">Sign Up</p>
            <span className="form_subtitle">Start your 14 days free trial</span>
            {isEmailContinue && <span className="form_input mt-4">
              <label>{email}</label>
            </span>}
          </div>
          {isEmailContinue ? (
            <>
              <div className="login-form_body">
                <span className="form_input">
                  <label>Fullname</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    name="fullname"
                    onChange={handleOnChange}
                    value={fullname}
                    className=""
                  />
                </span>
                <span className="form_input">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder="johnd2412"
                    name="username"
                    onChange={handleOnChange}
                    value={username}
                    className=""
                  />
                </span>
                {/* <span className="form_input">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="username@google.com"
                    name="email"
                    onChange={handleOnChange}
                    value={email}
                    className=""
                  />
                </span> */}
                <span className="form_input">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="********"
                    name="password"
                    onChange={handleOnChange}
                    value={password}
                    className=""
                  />
                </span>
                {/* <span className="form_input-actions">
              <span>
                <input type="checkbox" name="" id="" />
                <label>Remember Me</label>
              </span>
              <p>Forgot password?</p>
            </span> */}
                <div className="form-action-buttons">
                  <button
                    disabled={loading}
                    onClick={handleBack}
                    className="form_button-back"
                  >
                    <MoveLeft size={18} /> Back
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleLogin}
                    className="form_button"
                  >
                    {loading ? <LoadingSpinner /> : "Signup"}
                  </button>
                </div>
              </div>
              {/* <div className="login-social">
                <button className="social-login_button">
                  Sign in with Google
                </button>
                <button className="social-login_button">Sign in with Github</button>
              </div> */}
              {/* <div className="login-form_links">
                <p>
                  Already have an account? <Link to="/auth/login">Log in</Link>
                </p>
              </div> */}
            </>
          ) : (
            <>
              <div className="login-form_body">
                <span className="form_input">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="username@google.com"
                    name="email"
                    required={true}
                    onChange={handleOnChange}
                    value={email}
                    className=""
                  />
                </span>
                <button
                  disabled={loading}
                  onClick={handleEmailContinue}
                  className="form_button"
                >
                  {loading ? <LoadingSpinner /> : "Continue"}
                </button>
              </div>
              <div className="login-form_devider">
                <div className="devider_line"></div>
                <div className="devider_text">OR</div>
                <div className="devider_line"></div>
              </div>
              <div className="login-social">
                <button className="social-login_button">
                  Sign in with Google
                </button>
                <button className="social-login_button">
                  Sign in with Github
                </button>
              </div>

              <div className="login-form_links">
                <p>
                  Already have an account? <Link to="/auth/login">Log in</Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Signup
