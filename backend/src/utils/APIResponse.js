class APIResponse {
  constructor(statusCode, message = "Success", data = null) {
    this.statusCode = statusCode
    this.success = statusCode >= 200 && statusCode < 300
    this.message = message
    this.data = data
  }
}

export { APIResponse }

// Usage example:
// const response = new APIResponse(200, "User created successfully", { userId: 1 });
// res.status(response.statusCode).json(response);
// res.status(200).json(new APIResponse(200, "User created successfully", { userId: 1 }));
