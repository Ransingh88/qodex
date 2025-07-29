import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router"
import Navbar from "@/components/navbar/Navbar"
import { ArrowLeft, MoveLeft } from "lucide-react"

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth)
  return (
    <>
      <Navbar />
      <div className="dashboard-main_container bg-basebg-default text-fg-default">
        <div className="dashboard-container container mx-auto">
          <div className="mt-24 flex justify-center items-center m-2 h-[calc(100vh-6.5rem)]">
            <div className="dashboard-sidebar bg-basebg-default w-1/6 h-full px-4 py-8">
              <p>Profile</p>
              {user.role == "admin" && <p>Dashboard</p>}
              <p>Courses</p>
            </div>
            <div className="dashboard-content w-5/6 h-full flex flex-col justify-around items-start bg-basebg-surface text-fg-default px-8 py-4 rounded-lg border border-border-default">
              <button className="flex items-center gap-1 cursor-pointer text-sm my-2 text-fg-default/80 hover:text-fg-muted">
                <ArrowLeft size={18} className="mt-0.5" />
                Back
              </button>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
