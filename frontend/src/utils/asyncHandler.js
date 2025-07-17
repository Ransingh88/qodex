import { toast } from "react-toastify"

export const asyncHandler = async (fn, options = {}) => {
  const {
    successMessage = null,
    errorMessage = "Something went wrong",
    silent = false,
  } = options

  try {
    const result = await fn()
    if (successMessage) toast.success(successMessage)
    return result
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || errorMessage
    if (!silent) toast.error(message)
    return null
  }
}
