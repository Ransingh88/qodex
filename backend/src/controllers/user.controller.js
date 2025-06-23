const register = async (req, res) => {
  res.status(200).json({
    message: "User registered successfully",
  })
}

export { register }
