import { useState } from "react"
import { toast } from "react-toastify"

export const useAsyncHandler = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = async (fn, options = {}) => {
    const {
      successMessage = null,
      errorMessage = "Something went wrong",
      silent = false,
    } = options

    setLoading(true)
    setError(null)

    try {
      const result = await fn()
      const message = result?.data?.data?.message || successMessage
      if (result?.data?.data?.success) toast.success(message)
      return result
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || errorMessage
      if (!silent) toast.error(message)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { run, loading, error }
}
