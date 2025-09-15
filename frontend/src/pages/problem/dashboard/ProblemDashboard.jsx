import React from "react"
import "./problemDashboard.css"
import { NavLink, Outlet } from "react-router"

const ProblemDashboard = () => {
  const sidebarMenu = [
    { name: "Library", path: "/problems" },
    { name: "Study Plan", path: "/problems/study-plan" },
    { name: "Playlist", path: "/problems/playlist" },
  ]
  return (
    <div className="problem_dashboard-main_container">
      <div className="problem_dashboard-container ">
        <div className="problem_dashboard-sidebar">
          {sidebarMenu.map((item) => (
            <NavLink
              end={item.path === "/problems"}
              key={item.name}
              to={item.path}
              className={({ isActive }) => (isActive ? "outline-2 outline-offset-2 outline-accent-emphasis/70 rounded-lg" : "")}
            >
              <div className={`problem_dashboard-sidebar_section`}>
                <p>{item.name}</p>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="problem_dashboard-separator"></div>
        <div className="problem_dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProblemDashboard
