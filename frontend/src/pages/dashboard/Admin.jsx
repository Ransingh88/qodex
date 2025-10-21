import React from "react"
import { NavLink, Outlet } from "react-router"
import Input from "@/components/input/Input"

const Admin = () => {
  const problemMenus = [
    { label: "Users", url: "/dashboard/problems" },
    { label: "Problems", url: "/dashboard/problems/create" },
  ]

  return (
    <div className="">
      <div className="flex items-start justify-start py-4">
        <div className="flex-1/6">
          <div className="flex flex-col gap-1 font-semibold">
            {problemMenus.map((menu, index) => (
              <NavLink
                end={menu.url === "/dashboard/problems"}
                key={index}
                to={menu.url}
                className={({ isActive }) =>
                  isActive
                    ? "rounder-lg hover:bg-secondary bg-bg-secondary w-4/6 rounded-lg px-4 py-2"
                    : "rounder-lg hover:bg-secondary bg w-4/6 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
                }
              >
                {menu.label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex-5/6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
