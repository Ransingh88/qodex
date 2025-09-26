import clsx from "clsx" // optional helper for conditional classNames
import { Loader2 } from "lucide-react" // spinner icon (can use any)

export default function Button({
  size = "sm",
  color = "primary",
  children,
  className,
  width = "auto", // auto, full
  noTextPadding = false,
  iconLeading,
  iconTrailing,
  isDisabled = false,
  loading = false,
  showTextWhileLoading = true,
  // onClick,
  ...otherProps
}) {
  const baseStyles =
    " relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2"

  // 🎨 Width map
  const widthStyles = {
    auto: "w-auto",
    full: "w-full",
  }

  // 🎨 Size map
  const sizeStyles = {
    sm: "gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2",
    md: "gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5",
    lg: "gap-1.5 rounded-lg px-4 py-2.5 text-md font-semibold before:rounded-[7px] data-icon-only:p-3",
    xl: "gap-1.5 rounded-lg px-4.5 py-3 text-md font-semibold before:rounded-[7px] data-icon-only:p-3.5",
  }

  // 🎨 Color map
  const colorStyles = {
    primary:
      "bg-brand-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent ring-inset hover:bg-brand-solid_hover data-loading:bg-brand-solid_hover",
    secondary:
      "bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover",
    tertiary: "text-tertiary hover:bg-primary_hover hover:text-tertiary_hover data-loading:bg-primary_hover",
    "link-gray": "justify-normal rounded p-0! text-tertiary hover:text-tertiary_hover",
    "link-color": "justify-normal rounded p-0! text-brand-secondary hover:text-brand-secondary_hover",
    "primary-destructive": "bg-error-solid text-white shadow-xs-skeumorphic ring-1 ring-transparent outline-error ring-inset",
    "secondary-destructive":
      "bg-primary text-error-primary shadow-xs-skeumorphic ring-1 ring-error_subtle outline-error ring-inset hover:bg-error-primary hover:text-error-primary_hover data-loading:bg-error-primary",
    "tertiary-destructive": "text-error-primary outline-error hover:bg-error-primary hover:text-error-primary_hover data-loading:bg-error-primary",
    "link-destructive": "justify-normal rounded p-0! text-error-primary outline-error hover:text-error-primary_hover",
  }

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], colorStyles[color], widthStyles[width], noTextPadding && "px-0", className)}
      disabled={isDisabled || loading}
      // onClick={onClick}
      {...otherProps}
    >
      {/* Leading icon */}
      {/* {IconLeading && <IconLeading className={clsx("mr-2 h-5 w-5", loading && "opacity-0")} />} */}

      {/* Loading spinner */}
      {loading && (
        <svg
          fill="none"
          data-icon="loading"
          viewBox="0 0 20 20"
          className={clsx(
            "transition-inherit-all pointer-events-none size-5 shrink-0",
            !showTextWhileLoading && "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          )}
        >
          {/* Background circle */}
          <circle className="stroke-current opacity-30" cx="10" cy="10" r="8" fill="none" strokeWidth="2" />
          {/* Spinning circle */}
          <circle
            className="origin-center animate-spin stroke-current"
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
            strokeDasharray="12.5 50"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Button text */}
      {(showTextWhileLoading || !loading) && <span className={clsx(loading && !showTextWhileLoading && "opacity-0")}>{children}</span>}

      {/* Trailing icon */}
      {/* {IconTrailing && <IconTrailing className={clsx("ml-2 h-5 w-5", loading && "opacity-0")} />} */}
    </button>
  )
}
