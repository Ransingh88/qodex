import "./userpopover.css"
import {
  CircleUser,
  CreditCard,
  Handshake,
  Info,
  LogOut,
  Settings,
} from "lucide-react"
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
      className=" h-9 w-9 rounded-full bg-accent-fg/40 text-fg-muted flex items-center justify-center relative cursor-pointer outline-2 outline-offset-2 outline-accent-subtle z-10"
    >
      <button
        onClick={togglePopover}
        className="h-10 w-10 rounded-full cursor-pointer overflow-hidden"
      >
        {user?.fullName[0]?.toUpperCase()}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="absolute top-12 right-0 min-h-62 min-w-64 bg-basebg-surface text-fg-default rounded-2xl shadow-lg border border-border-default flex flex-col items-start justify-between "
        >
          <div className="w-full box-border">
            <div className="m-1 px-3 py-2 bg-basebg-surface2 border border-border-default rounded-xl">
              <p>{user?.fullName}</p>
              <p className="text-sm font-light text-fg-muted">{user?.email}</p>
            </div>
            <div className="p-2 flex flex-col">
              <Link to="/profile">
                <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg ">
                  <CircleUser size={16} className="mt-0.5" />
                  Profile
                </div>
              </Link>
              <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                <Handshake size={16} className="mt-0.5" /> Community
              </div>
              <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                <CreditCard size={16} className="mt-0.5" /> Subscription
              </div>
              <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                <Settings size={16} className="mt-0.5" /> Settinga
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="h-0.25 bg-border-default"></div>
            <div className="p-2 flex flex-col">
              <div className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg">
                <Info size={16} className="mt-0.5" /> Help center
              </div>
              <div
                onClick={() => {
                  logoutFn()
                }}
                className="flex items-center gap-4 cursor-pointer hover:bg-accent-subtle px-2 py-2 rounded-lg"
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
