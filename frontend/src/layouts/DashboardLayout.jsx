import { ArrowLeft, MoveLeft } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router"
import Input from "@/components/input/Input"
import Navbar from "@/components/navbar/Navbar"

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth)

  const settingMenus = [
    { label: "Overview", url: "/dashboard" },
    { label: "Admin", url: "/dashboard/admin" },
    { label: "Users", url: "/dashboard/users" },
    { label: "Problems", url: "/dashboard/problems" },
  ]

  return (
    <div className="">
      <div className="container-guttered">
        <div className="border-secondary border-b">
          <div className="flex items-end justify-between py-4">
            <div className="">
              <h3 className="mb-2">Welcome back, {user.fullName.split(" ")[0]}</h3>
              <p className="text-tertiary">Your recent code summary and activity.</p>
            </div>
            <div className="w-1/4">
              <Input placeholder="Search" className="w-64" />
            </div>
          </div>
          <div className="border-secondary mb-4 flex items-center justify-between rounded-xl border p-0.5">
            <div className="flex gap-1 font-semibold">
              {settingMenus.map((menu, index) => (
                <NavLink
                  end={menu.url === "/dashboard"}
                  key={index}
                  to={menu.url}
                  className={({ isActive }) =>
                    isActive
                      ? "rounder-lg hover:bg-secondary text-primary bg-secondary rounded-lg px-4 py-2"
                      : "rounder-lg hover:bg-secondary text-tertiary rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
                  }
                >
                  {menu.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
