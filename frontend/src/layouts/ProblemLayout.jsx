import { ArrowBigUpDash, ArrowLeft, BookUp, MoveLeft } from "lucide-react"
import React, { useRef } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import UserPopover from "@/components/popover/UserPopover"

const ProblemLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { isLoading } = useSelector((state) => state.problem)
  const navigate = useNavigate()

  const submitHandlerRef = useRef(null)

  const handleSubmitClick = () => {
    if (submitHandlerRef.current) {
      submitHandlerRef.current() // trigger child handler directly
    }
  }

  return (
    <div className="bg-basebg-default text-fg-default mx-auto box-border h-screen w-full overflow-hidden">
      <div className="flex h-12 items-center justify-between px-8 pt-1.5">
        <div>
          <button onClick={() => navigate(-1)} className="hover:text-fg-muted flex cursor-pointer items-center gap-1 text-sm">
            <ArrowLeft size={16} className="mt-0.5" /> Back
          </button>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handleSubmitClick}
            className="bg-success-fg/80 hover:bg-success-emphasis flex cursor-pointer items-center gap-1 rounded px-2 py-1.5 text-sm"
          >
            {isLoading ? <LoadingSpinner size={14} /> : <ArrowBigUpDash size={14} />} Submit
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
