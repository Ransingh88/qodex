import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router"
import Navbar from "@/components/navbar/Navbar"

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Navbar />
      <div className="dashboard-main_container bg-basebg-default text-fg-default">
        <div className="dashboard-container container mx-auto">
          <div className="mt-24 flex m-2 min-h-[calc(100vh-6.5rem)]">
            <div className="dashboard-sidebar bg-basebg-default w-1/6 px-4 py-8">
              <p>Profile</p>
              {user.role == "admin" && <p>Dashboard</p>}
              <p>Courses</p>
            </div>
            <div className="dashboard-content w-5/6 bg-basebg-surface text-fg-default p-4 rounded-lg border border-border-default">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
