import React from "react"
import { useSelector } from "react-redux"

const Profile = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Role: {user.role}</p>
      <p>Account Created: {new Date(user.createdAt).toDateString()}</p>
      <p>lastUpdated:{new Date(user.createdAt).toDateString()}</p>
    </div>
  )
}

export default Profile
