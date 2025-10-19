import React from "react"
import { NavLink, Outlet } from "react-router"
import Navbar from "@/components/navbar/Navbar"
import { ArrowLeft, MoveLeft } from "lucide-react"
import Input from "@/components/input/Input"

const DashboardLayout = () => {
  const settingMenus = [
    { label: "Overview", url: "/dashboard" },
    { label: "Profile", url: "/dashboard/profile" },
    { label: "Password", url: "/dashboard/password" },
    { label: "Account", url: "/settings/Account" },
    { label: "Security", url: "/settings/Security" },
    { label: "Billing", url: "/settings/Billing" },
    { label: "Plan", url: "/settings/Plan" },
    { label: "Team", url: "/settings/Team" },
    { label: "Help", url: "/settings/Help" },
  ]
  return (
    <div className="">
      <div className="container-guttered">
        <div className="">
          <div className="border-primary mb-8 flex items-center justify-between border-b py-4">
            <div className="flex gap-1 font-semibold">
              {settingMenus.map((menu, index) => (
                <NavLink
                  end={menu.url === "/dashboard"}
                  key={index}
                  to={menu.url}
                  className={({ isActive }) =>
                    isActive
                      ? "rounder-lg hover:bg-primary_hover bg-bg-primary_hover rounded-lg px-4 py-2"
                      : "rounder-lg hover:bg-primary_hover bg rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
                  }
                >
                  {menu.label}
                </NavLink>
              ))}
            </div>
            <div className="w-1/4">
              <Input placeholder="Search" className="w-64" />
            </div>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
