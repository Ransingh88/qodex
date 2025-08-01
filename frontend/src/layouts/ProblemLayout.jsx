import React from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import UserPopover from "@/components/popover/UserPopover"

const ProblemLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  return (
    <div className="h-screen w-full bg-basebg-default text-fg-default">
      <div className="px-8 py-4 flex justify-between items-center">
        <div>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button>Submit</button>
          <button>Run</button>
          {isAuthenticated && <UserPopover />}
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default ProblemLayout
