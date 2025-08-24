import { ArrowBigUpDash, ArrowLeft, BookUp, MoveLeft } from "lucide-react"
import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import UserPopover from "@/components/popover/UserPopover"

const ProblemLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const submitHandlerRef = useRef(null)

  const handleSubmitClick = () => {
    if (submitHandlerRef.current) {
      submitHandlerRef.current() // trigger child handler directly
    }
  }

  return (
    <div className="mx-auto overflow-hidden h-screen w-full box-border bg-basebg-default text-fg-default">
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
          <button
            onClick={handleSubmitClick}
            className="flex items-center gap-1 bg-success-fg/80 px-2 py-1.5 rounded cursor-pointer hover:bg-success-emphasis text-sm"
          >
            <ArrowBigUpDash size={14} /> Submit
          </button>
          {isAuthenticated && <UserPopover />}
        </div>
      </div>
      <Outlet
        context={{
          registerSubmitHandler: (fn) => (submitHandlerRef.current = fn),
        }}
      />
    </div>
  )
}

export default ProblemLayout
