import React from "react"
import { NavLink, Outlet } from "react-router"
import Input from "@/components/input/Input"

const Problems = () => {
  return (
    <div className="">
      <div className="">
        <div></div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Problems
