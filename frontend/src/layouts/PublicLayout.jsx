import React from "react"
import { Outlet } from "react-router"
import Footer from "@/components/footer/Footer"
import Navbar from "@/components/navbar/Navbar"

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="mt-24 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default PublicLayout
