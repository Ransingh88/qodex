import { motion } from "motion/react"
import React, { useEffect, useRef, useState } from "react"

const FilterPopover = ({ icon, size = "default", children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef(null)

  const togglePopover = () => {
    setIsOpen((prev) => !prev)
  }

  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-7 w-7",
    default: "h-8 w-8",
    lg: "h-14 w-14",
  }
  const sizeClass = sizeMap[size] || sizeMap["default"]

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
    <div ref={popoverRef} className={`relative ${sizeClass} bg-basebg-surface hover:bg-basebg-subtle flex items-center justify-center rounded-full`}>
      <button onClick={togglePopover} className="flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full">
        {icon}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="bg-basebg-surface text-fg-default border-border-default absolute top-10 right-0 flex min-h-10 min-w-40 flex-col items-start justify-between overflow-hidden rounded-2xl border shadow-lg"
        >
          <div className="w-full">{children}</div>
        </motion.div>
      )}
    </div>
  )
}

export default FilterPopover
