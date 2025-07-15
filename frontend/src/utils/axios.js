import axios from "axios"

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/${
    import.meta.env.VITE_API_VERSION
  }`,
  headers: {
    "Content-Type": "application/json",
  },
})
