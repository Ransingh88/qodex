import React from "react"

const Input = ({ type = "text", placeholder, value, onChange, className }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-border-muted bg-basebg-default text-fg-default focus:border-accent-fg placeholder:text-fg-muted focus:ring-accent-fg w-full rounded-lg border px-4 py-2 focus:ring-1 focus:outline-none ${className}`}
    />
  )
}

export default Input
