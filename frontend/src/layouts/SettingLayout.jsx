import { NavLink, Outlet } from "react-router"
import Input from "@/components/input/Input"

const SettingLayout = () => {
  const settingMenus = [
    { label: "My Details", url: "/settings" },
    { label: "Profile", url: "/settings/profile" },
    { label: "Password", url: "/settings/password" },
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
        <div className="border-primary flex items-center justify-between border-b py-8">
          <h2>Settings</h2>
          <div className="w-1/4">
            <Input placeholder="Search" className="w-64" />
          </div>
        </div>
        <div className="flex items-start justify-start py-8">
          <div className="flex-1/6">
            <div className="flex flex-col gap-1 font-semibold">
              {settingMenus.map((menu, index) => (
                <NavLink
                  end={menu.url === "/settings"}
                  key={index}
                  to={menu.url}
                  className={({ isActive }) =>
                    isActive
                      ? "rounder-lg hover:bg-primary_hover bg-bg-primary_hover w-4/6 rounded-lg px-4 py-2"
                      : "rounder-lg hover:bg-primary_hover bg w-4/6 rounded-lg px-4 py-2 transition-all duration-200 ease-in-out"
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
    </div>
  )
}

export default SettingLayout
