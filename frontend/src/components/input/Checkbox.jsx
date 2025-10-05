import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"

const Checkbox = ({ id, label, checked, defaultChecked, onChange, indeterminate = false, disabled = false, className = "" }) => {
  const inputRef = useRef(null)
  const [internalChecked, setInternalChecked] = useState(!!defaultChecked)
  const isControlled = checked !== undefined
  const currentChecked = isControlled ? checked : internalChecked

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = (e) => {
    if (!isControlled) setInternalChecked(e.target.checked)
    if (onChange) onChange(e)
  }
  return (
    // <div
    //   className={clsx(
    //     "bg-primary ring-primary flex size-4 shrink-0 cursor-pointer appearance-none items-center justify-center rounded ring-1 ring-inset",
    //     size === "md" && "size-5 rounded-md",
    //     (isSelected || isIndeterminate) && "bg-brand-solid ring-bg-brand-solid",
    //     isDisabled && "bg-disabled_subtle ring-disabled cursor-not-allowed",
    //     isFocusVisible && "outline-focus-ring outline-2 outline-offset-2",
    //     className
    //   )}
    // >
    //   <svg
    //     aria-hidden="true"
    //     viewBox="0 0 14 14"
    //     fill="none"
    //     className={clsx(
    //       "text-primary transition-inherit-all pointer-events-none absolute h-3 w-2.5 opacity-0",
    //       size === "md" && "size-3.5",
    //       isIndeterminate && "opacity-100",
    //       isDisabled && "text-fg-disabled_subtle"
    //     )}
    //   >
    //     <path d="M2.91675 7H11.0834" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    //   </svg>
    //   <svg
    //     aria-hidden="true"
    //     viewBox="0 0 14 14"
    //     fill="none"
    //     className={clsx(
    //       "text-primary transition-inherit-all pointer-events-none absolute size-3 rounded bg-amber-600 opacity-0",
    //       size === "md" && "size-3.5",
    //       isSelected && !isIndeterminate && "opacity-100",
    //       isDisabled && "text-fg-disabled_subtle"
    //     )}
    //   >
    //     <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    //   </svg>
    // </div>
    <label className={`inline-flex cursor-pointer items-center ${className}`}>
      <input ref={inputRef} id={id} type="checkbox" checked={currentChecked} onChange={handleChange} disabled={disabled} className="sr-only" />
      <span
        className={`ring-primary flex h-4 w-4 items-center justify-center rounded ring-1 transition-colors duration-150 ring-inset ${disabled ? "bg-disabled_subtle ring-disabled cursor-not-allowed" : ""} ${
          currentChecked ? "text-primary bg-brand-solid ring-bg-brand-solid" : "bg-primary"
        } `}
      >
        {indeterminate ? (
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        ) : currentChecked ? (
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : null}
      </span>
      {label && <span className="ml-2 select-none">{label}</span>}
    </label>
  )
}

export default Checkbox
