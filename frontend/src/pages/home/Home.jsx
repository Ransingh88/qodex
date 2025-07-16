import React from "react"
import { useSelector } from "react-redux"

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated && <h3>Welcome {user.fullName}</h3>}
    </div>
  )
}

export default Home
