import React from "react"

const Textarea = ({  className, placeholder,...otherProps }) => {
  return (
    <div
      className={`bg-primary ring-primary focus-within:ring-brand ${className} relative flex w-full rounded-lg p-2 shadow-xs ring-1 transition-shadow duration-100 ease-linear ring-inset focus-within:ring-1`}
    >
      <textarea
        {...otherProps}
        placeholder={placeholder}
        className="text-primary placeholder:text-placeholder autofill:text-primary m-0 w-full bg-transparent px-3 py-2 pr-9 text-sm ring-0 outline-hidden autofill:rounded-lg"
        rows="4"
      ></textarea>
    </div>
  )
}

export default Textarea
