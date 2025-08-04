import { ArrowLeft, MoveLeft } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import UserPopover from "@/components/popover/UserPopover"

const ProblemLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  return (
    <div className="container mx-auto overflow-hidden h-screen w-full box-border bg-basebg-default text-fg-default">
      <div className="px-8 h-12 flex justify-between items-center">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 cursor-pointer hover:text-fg-muted text-sm"
          >
            <ArrowLeft size={16} className="mt-0.5" /> Back
          </button>
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
