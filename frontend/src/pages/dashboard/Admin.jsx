import React from "react"
import { NavLink, Outlet } from "react-router"
import Input from "@/components/input/Input"

const Admin = () => {
  const problemMenus = [
    {
      label: "Users",
      url: "/dashboard/admin/users",
      subMenu: [
        {
          label: "All Users",
          url: "/dashboard/admin/users",
        },
      ],
    },
    {
      label: "Problems",
      url: "/dashboard/admin/problems",
      subMenu: [
        {
          label: "All Problems",
          url: "/dashboard/admin/problems",
        },
        {
          label: "create",
          url: "/dashboard/admin/problems/create",
        },
      ],
    },
  ]

  return (
    <div className="">
      <div className="flex items-start justify-start py-4">
        <div className="flex-1/6">
          <div className="flex flex-col gap-1 font-semibold">
            {problemMenus.map((menu, index) => (
              <>
                <NavLink
                  end={menu.url === "/dashboard/admin/users"}
                  key={index}
                  to={menu.url}
                  className={({ isActive }) =>
                    isActive
                      ? "rounder-lg hover:bg-secondary bg-secondary ring-secondary w-4/6 rounded-lg px-4 py-2 ring-1"
                      : "rounder-lg hover:bg-secondary bg w-4/6 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
                  }
                >
                  {menu.label}
                </NavLink>
                {menu.subMenu && menu.subMenu.length > 0 && (
                  <div className="ml-4 flex flex-col gap-1">
                    {menu.subMenu.map((subMenu, index) => (
                      <NavLink
                        end
                        key={index}
                        to={subMenu.url}
                        className={({ isActive }) =>
                          isActive
                            ? "rounder-lg hover:bg-secondary bg-secondary w-4/6 rounded-lg px-4 py-2"
                            : "rounder-lg text-tertiary hover:bg-secondary bg w-4/6 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
                        }
                      >
                        {subMenu.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </>
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
