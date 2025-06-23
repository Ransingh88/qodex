class APIError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message)
    this.statusCode = statusCode
    this.success = false
    this.message = message
    this.errors = errors
    this.data = null

    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export { APIError }

// Usage example:
// const error = new APIError(400, "Invalid input", ["Name is required"]);
