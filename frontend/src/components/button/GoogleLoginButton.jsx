import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { toast } from "react-toastify"
import { login as lg } from "@/features/rtk/auth/authSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { loginWithGoogle } from "@/services/auth.service"
import Button from "./Button"

const GoogleLoginButton = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const from = location.state?.from?.pathname || "/"
  const { run, loading } = useAsyncHandler()

  const handleSuccess = run(async (credentialResponse) => {
    const token = credentialResponse?.credential || credentialResponse?.access_token
    if (!token) return toast.error("No id token returned by Google")

    const res = await loginWithGoogle(token)
    dispatch(lg(res.data.data.user))
    navigate(from, { replace: true })
    return res
  })

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: () => toast.error("Google login failed"),
    flow: "implicit",
  })
  return (
    <>
      {/* <GoogleLogin onSuccess={handleSuccess} onError={() => toast.error("Google login failed")} /> */}
      <Button loading={loading} color="secondary" className="w-full" onClick={() => login()}>
        <span className="flex items-center justify-center">
          <img src="/google-icon-logo-svgrepo-com.svg" alt="" className="mr-2 h-4 w-4" />
          {loading ? "Signing in..." : "Sign in with Google"}
        </span>
      </Button>
    </>
  )
}

export default GoogleLoginButton
