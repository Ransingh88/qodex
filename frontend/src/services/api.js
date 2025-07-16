import axios from "axios"

export const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/${
    import.meta.env.VITE_API_VERSION
    }`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})
