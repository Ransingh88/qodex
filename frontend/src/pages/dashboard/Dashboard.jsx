import React from "react"
import { useSelector } from "react-redux"

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <div className="">
        <h3 className="mb-2">Welcome back, {user.fullName.split(" ")[0]}</h3>
        <p className="text-tertiary">Your recent code summary and activity.</p>
      </div>
      <div className="my-8 flex gap-8">
        <div className="bg-secondary border-secondary flex h-[500px] flex-4/6 rounded-lg border"></div>
        <div className="bg-secondary border-secondary flex h-[500px] flex-2/6 rounded-lg border"></div>
      </div>
    </div>
  )
}

export default Dashboard
