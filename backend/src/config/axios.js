import axios from "axios"
import { JUDGE0_API_URL, JUDGE0_SULU_API_KEY } from "../config/config.js"

export const judge0Axios = axios.create({
  baseURL: JUDGE0_API_URL,
  headers: {
    Authorization: `Bearer ${JUDGE0_SULU_API_KEY}`,
    "Content-Type": "application/json",
  },
})
