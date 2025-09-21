import "./userpopover.css"
import { CircleUser, CreditCard, Handshake, Info, LogOut, Settings } from "lucide-react"
import { motion } from "motion/react"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router"

const UserPopover = ({ logoutFn }) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)
  const { user } = useSelector((state) => state.auth)

  const togglePopover = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={popoverRef}
      className="bg-accent-fg/50 text-fg-muted outline-accent-subtle relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full outline-2 outline-offset-2"
    >
      <button onClick={togglePopover} className="h-10 w-10 cursor-pointer overflow-hidden rounded-full">
        {user?.fullName[0]?.toUpperCase()}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="bg-basebg-surface text-fg-default border-border-default absolute top-12 right-0 flex min-h-62 min-w-64 flex-col items-start justify-between rounded-2xl border shadow-lg"
        >
          <div className="box-border w-full">
            <div className="bg-basebg-surface2 border-border-default m-1 rounded-xl border px-3 py-2">
              <p>{user?.fullName}</p>
              <p className="text-fg-muted text-sm font-light">{user?.email}</p>
            </div>
            <div className="flex flex-col p-2">
              <Link to="/profile">
                <div className="hover:bg-accent-subtle flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2">
                  <CircleUser size={16} className="mt-0.5" />
                  Profile
                </div>
              </Link>
              <div className="hover:bg-accent-subtle flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2">
                <Handshake size={16} className="mt-0.5" /> Community
              </div>
              <div className="hover:bg-accent-subtle flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2">
                <CreditCard size={16} className="mt-0.5" /> Subscription
              </div>
              <div className="hover:bg-accent-subtle flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2">
                <Settings size={16} className="mt-0.5" /> Settinga
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="bg-border-default h-0.25"></div>
            <div className="flex flex-col p-2">
              <div className="hover:bg-accent-subtle flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2">
                <Info size={16} className="mt-0.5" /> Help center
              </div>
              <div
                onClick={() => {
                  logoutFn()
                }}
                className="hover:bg-accent-subtle flex cursor-pointer items-center gap-4 rounded-lg px-2 py-2"
              >
                <LogOut size={16} className="mt-0.5" />
                Sign out
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default UserPopover
