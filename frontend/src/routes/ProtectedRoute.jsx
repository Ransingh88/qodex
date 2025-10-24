import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router"

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
