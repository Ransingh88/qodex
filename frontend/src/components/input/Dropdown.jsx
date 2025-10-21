import React from "react"

const Dropdown = ({ options, className, ...otherProps }) => {
  return (
    <div
      className={`bg-primary ring-primary focus-within:ring-brand ${className} relative flex w-full rounded-lg p-2 shadow-xs ring-1 transition-shadow duration-100 ease-linear ring-inset focus-within:ring-1`}
    >
      <select
        {...otherProps}
        className="text-primary placeholder:text-placeholder autofill:text-primary [&>*]:bg-secondary [&>*]:text-primary [&>option:hover]:bg-brand [&>option:checked]:bg-brand m-0 w-full cursor-pointer bg-transparent text-sm ring-0 outline-hidden autofill:rounded-lg [&>*]:p-2 [&>option]:cursor-pointer"
      >
        <option disabled>Please select</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown
