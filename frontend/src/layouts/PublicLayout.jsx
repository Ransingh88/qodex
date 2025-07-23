import React from "react"
import { Outlet } from "react-router"
import Navbar from "@/components/navbar/Navbar"

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-24">
        <Outlet />
      </div>
    </>
  )
}

export default PublicLayout
