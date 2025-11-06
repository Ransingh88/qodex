import axios from "axios"
import { JUDGE0_API_URL, RAPID_API_HOST, RAPID_API_KEY } from "../config/config.js"

export const judge0Axios = axios.create({
  baseURL: JUDGE0_API_URL,
  headers: {
    "x-rapidapi-key": `${RAPID_API_KEY}`,
    "x-rapidapi-host": `${RAPID_API_HOST}`,
    "Content-Type": "application/json",
    // Authorization: `Bearer ${JUDGE0_API_KEY}`,
  },
})
