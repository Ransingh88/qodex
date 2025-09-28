import clsx from "clsx"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import React, { useEffect } from "react"

const Modal = ({
  isOpen, // control modal visibility
  onClose, // function to close the modal
  title, // modal title
  subtitle, // modal subtitle
  children, // modal content
  className, // additional classes for modal box
  size = "md", // sm, md, lg, xl, full
  headerVisible = true, // show header
  headerSeparator = false, // line between header and content
  modalIcon, // custom icon component
  modalIconColor = "brand", // brand, primary, secondary, error, success, warning, info, transparent
  iconPosition = "left", // left, center
}) => {
  const base = "relative w-full overflow-hidden rounded-2xl bg-primary text-primary shadow-xl max-w-100 z-10"
  const backdrop = "opacity-100 absolute inset-0 bg-fg-secondary/20 backdrop-blur-xs"

  const sizeMap = {
    sm: "max-w-100",
    md: "max-w-128",
    lg: "max-w-136",
    xl: "max-w-160",
    full: "max-w-[96%] h-[90%]",
  }

  const modalIconColorMap = {
    transparent: "bg-transparent border-2 border-primary",
    brand: "bg-brand-secondary text-featured-icon-light-fg-brand",
    primary: "bg-primary-secondary text-featured-icon-light-fg-primary",
    secondary: "bg-secondary text-featured-icon-light-fg-secondary",
    error: "bg-error-secondary text-featured-icon-light-fg-error",
    success: "bg-success-secondary text-featured-icon-light-fg-success",
    warning: "bg-warning-secondary text-featured-icon-light-fg-warning",
  }

  const iconPositionMap = {
    left: "w-max",
    center: "flex w-full items-center justify-center",
  }

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscKey)

    // Block background scroll when modal is open
    if (isOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.classList.remove("overflow-hidden")
    }
  }, [onClose, isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className={clsx(backdrop)}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        {/* Modal Box */}
        <motion.div
          className={clsx(base, sizeMap[size], className)}
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          {headerVisible && (
            <div className={`flex items-start justify-between p-4`}>
              <div className={`${iconPosition == "center" ? "flex-col" : ""} flex w-full items-center gap-4`}>
                <div className={clsx("relative", iconPositionMap[iconPosition])}>
                  <div
                    data-featured-icon="true"
                    className={clsx(
                      modalIconColorMap[modalIconColor],
                      "relative flex size-12 shrink-0 items-center justify-center rounded-full *:data-icon:size-6"
                    )}
                  >
                    {modalIcon ? (
                      modalIcon
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M7 20.6622C9.98901 18.9331 12 15.7014 12 12C12 8.29859 9.98901 5.06687 7 3.33782M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <svg
                    width="336"
                    height="336"
                    viewBox="0 0 336 336"
                    fill="none"
                    className="text-border-secondary pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <mask id="mask0_4947_375931" maskUnits="userSpaceOnUse" x="0" y="0" width="336" height="336" style={{ maskType: "alpha" }}>
                      <rect width="336" height="336" fill="url(#paint0_radial_4947_375931)"></rect>
                    </mask>
                    <g mask="url(#mask0_4947_375931)">
                      <circle cx="168" cy="168" r="47.5" stroke="currentColor"></circle>
                      <circle cx="168" cy="168" r="47.5" stroke="currentColor"></circle>
                      <circle cx="168" cy="168" r="71.5" stroke="currentColor"></circle>
                      <circle cx="168" cy="168" r="95.5" stroke="currentColor"></circle>
                      <circle cx="168" cy="168" r="119.5" stroke="currentColor"></circle>
                      <circle cx="168" cy="168" r="143.5" stroke="currentColor"></circle>
                      <circle cx="168" cy="168" r="167.5" stroke="currentColor"></circle>
                    </g>
                    <defs>
                      <radialGradient
                        id="paint0_radial_4947_375931"
                        cx="0"
                        cy="0"
                        r="1"
                        gradientUnits="userSpaceOnUse"
                        gradientTransform="translate(168 168) rotate(90) scale(168 168)"
                      >
                        <stop></stop>
                        <stop offset="1" stopOpacity="0"></stop>
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
                <div className={`z-2 ${iconPosition == "left" ? "text-left" : "text-center"}`}>
                  <h6 className="text-primary">{title}</h6>
                  <p className="text-tertiary text-sm">{subtitle}</p>
                </div>
              </div>
              <button onClick={onClose} className="text-tertiary hover:text-tertiary_hover cursor-pointer rounded p-1">
                <X size={24} />
              </button>
            </div>
          )}

          {headerSeparator && <div className="bg-border-primary h-px flex-1"></div>}
          {/* Content */}
          <div className="z-10 p-4">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default Modal
