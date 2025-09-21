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
          <div className="m-2 mt-24 flex h-[calc(100vh-6.5rem)] items-center justify-center">
            <div className="dashboard-sidebar bg-basebg-default h-full w-1/6 px-4 py-8">
              <p>Profile</p>
              {user.role == "admin" && <p>Dashboard</p>}
              <p>Courses</p>
            </div>
            <div className="dashboard-content bg-basebg-surface text-fg-default border-border-default flex h-full w-5/6 flex-col items-start justify-around rounded-lg border px-8 py-4">
              <button className="text-fg-default/80 hover:text-fg-muted my-2 flex cursor-pointer items-center gap-1 text-sm">
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
