export function handleError(error, options = {}) {
  const {
    showToast = true,
    fallbackMessage = "Something went wrong",
    toast = console.error,
    logger = console.error,
  } = options

  let message = fallbackMessage

  if (error?.response?.data?.message) {
    message = error.response.data.message
  } else if (error?.message) {
    message = error.message
  } else if (typeof error === "string") {
    message = error
  }

  if (showToast && typeof toast === "function") {
    toast(message)
  }

  if (typeof logger === "function") {
    logger(error)
  }

  return message
}
