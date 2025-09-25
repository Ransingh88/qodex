import { X } from "lucide-react"
import React, { useEffect } from "react"

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="bg-opacity-50 absolute inset-0 bg-black/30 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Box */}
      <div className="bg-basebg-default border-border-default relative z-10 w-full max-w-lg rounded-2xl border shadow-xl">
        {/* Header */}
        <div className={`flex items-center ${title ? "justify-between" : "justify-end"} px-4 py-4`}>
          {title && <h2 className="justify-self-center text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="text-fg-default hover:text-fg-muted cursor-pointer rounded p-1">
            <X />
          </button>
        </div>

        {title && <div className="bg-border-default h-px flex-1"></div>}
        {/* Content */}
        <div className="p-2">{children}</div>
      </div>
    </div>
  )
}

export default Modal
