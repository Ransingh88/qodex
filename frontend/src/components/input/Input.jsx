import React from "react"

const Input = ({ type = "text", placeholder, value, onChange, className, ...otherProps }) => {
  return (
    <div
      className={`bg-primary ring-primary focus-within:ring-brand relative flex w-full rounded-lg shadow-xs ring-1 transition-shadow duration-100 ease-linear ring-inset focus-within:ring-1 ${className}`}
    >
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`text-primary placeholder:text-placeholder autofill:text-primary m-0 w-full bg-transparent px-3 py-2 pr-9 text-sm ring-0 outline-hidden autofill:rounded-lg ${className}`}
        {...otherProps}
      />
    </div>
  )
}

export default Input
