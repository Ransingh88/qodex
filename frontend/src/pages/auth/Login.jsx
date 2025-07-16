import { useState } from "react"
import { loginUser } from "../../services/auth.service"
import { toast } from "react-toastify"
import { handleError } from "../../utils/handleError"
import { useDispatch, useSelector } from "react-redux"
import { login as lg } from "../../features/rtk/auth/authSlice"
import { useNavigate } from "react-router"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogin = async () => {
    try {
      const res = await loginUser(username, password)
      toast.success(res.data.message)
      dispatch(lg(res.data.data.user))
      navigate("/")
    } catch (err) {
      handleError(err, {
        toast: toast.error,
        fallbackMessage: "Failed to login",
      })
    }
  }
  if (isAuthenticated) return navigate("/")
  return (
    <div>
      <div>
        <h2>Login</h2>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className=" text-white border border-white"
        />
        <br />
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className=" text-white border border-white"
        />
        <button onClick={handleLogin} className="bg-blue-500 text-white">
          login
        </button>
      </div>
    </div>
  )
}

export default Login
