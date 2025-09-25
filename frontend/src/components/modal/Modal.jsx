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
      <div className="bg-opacity-50 absolute inset-0 bg-black/80" onClick={onClose} />

      {/* Modal Box */}
      <div className="bg-basebg-default relative z-10 w-full max-w-lg rounded-2xl shadow-xl">
        {/* Header */}
        <div className="border-border-default flex items-center justify-between border-b px-4 py-3">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="text-fg-default hover:bg-basebg-surfece cursor-pointer rounded p-1">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export default Modal
