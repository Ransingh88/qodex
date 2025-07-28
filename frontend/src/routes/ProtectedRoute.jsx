import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const location = useLocation()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" replace state={{ from: location }} />
  )
}

export default ProtectedRoute
