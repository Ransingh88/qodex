import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getUserDetails } from "../services/user.service"
import { logout, setAuth } from "../features/rtk/auth/authSlice"

const useAuthInit = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getUserDetails()
        const data = response.data
        if (data.success) {
          dispatch(setAuth(data.data.user))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        dispatch(logout())
        // console.log(error)
      }
    }
    checkAuth()
  }, [dispatch])
}

export default useAuthInit
