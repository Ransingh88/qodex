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
    <div ref={popoverRef} className={`relative ${sizeClass} rounded-full bg-basebg-surface flex justify-center items-center hover:bg-basebg-subtle`}>
      <button onClick={togglePopover} className="h-full w-full flex justify-center items-center rounded-full cursor-pointer overflow-hidden">
        {icon}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="absolute top-10 right-0 min-h-10 min-w-40 bg-basebg-surface text-fg-default rounded-2xl shadow-lg border border-border-default flex flex-col items-start justify-between overflow-hidden "
        >
          <div className="w-full">{children}</div>
        </motion.div>
      )}
    </div>
  )
}

export default FilterPopover
