class APIResponse {
  constructor(statusCode, data = null, message = "Success") {
    this.statusCode = statusCode
    this.success = statusCode >= 200 && statusCode < 300
    this.message = message
    this.data = data
  }
}

export { APIResponse }

// Usage example:
// const response = new APIResponse(200, { userId: 1 }, "User created successfully");
// res.status(response.statusCode).json(response);
// res.status(200).json(new APIResponse(200, { userId: 1 }, "User created successfully"));