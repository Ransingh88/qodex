/* eslint-disable no-undef */
import { useState } from "react"
import { toast } from "react-toastify"

// ✅ Utility: asyncHandler
export function asyncHandler(
  fn,
  {
    successMessage = null,
    errorMessage = "Something went wrong",
    silent = false,
    onSuccess = (msg) => toast.success(msg), // customizable success handler
    onError = (msg) => toast.error(msg), // customizable error handler
  } = {}
) {
  return async (...args) => {
    try {
      const result = await fn(...args)

      // 🚨 Warn if no result
      // if (result === undefined) {
      //     console.warn("[asyncHandler Warning]: The wrapped function did not return anything.")
      //     return { data: null, error: new Error("No return value from function") }
      // }

      const message = result?.data?.message || successMessage
      console.log(message, "uhwerheurh")
      if ((result?.data?.success && message && onSuccess) || successMessage) {
        onSuccess(message)
      }

      return { data: result, error: null }
    } catch (error) {
      const message = error?.response?.data?.message || error.message || errorMessage

      if (!silent && onError) {
        onError(message)
      } else if (silent && process.env.NODE_ENV === "development") {
        console.error("[asyncHandler]:", message)
      }

      return { data: null, error }
    }
  }
}

// Usage Example:
// const wrappedFunction = asyncHandler(async (param) => {
//     const response = await apiCall(param)
//     return response
// }, {
//     successMessage: "Operation successful!",
//     errorMessage: "Operation failed.",
//     silent: false,
//     onSuccess: (msg) => console.log("Success:", msg),
//     onError: (msg) => console.log("Error:", msg),
// })

// ===========================================================================================

// ✅ Hook: useAsyncHandler
export function useAsyncHandler() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const run = (fn, options = {}) =>
    asyncHandler(async (...args) => {
      setLoading(true)
      setError(null)

      try {
        const result = await fn(...args)
        return result
      } catch (err) {
        setError(err)
        throw err
      } finally {
        setLoading(false)
      }
    }, options)

  return { run, loading, error }
}

// Usage Example:
// const { run, loading, error } = useAsyncHandler()
// const fetchData = run(async () => {
//     const response = await apiCall()
//     return response
// }, { successMessage: "Data fetched successfully!" })
