import axios from "axios"
// import { toast } from "react-toastify"

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/${import.meta.env.VITE_API_VERSION}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || "Something went wrong. Please try again."
//     if (error.response?.status !== 401) {
//       toast.error(message)
//     }
//     return Promise.reject(error)
//   }
// )

export default API
