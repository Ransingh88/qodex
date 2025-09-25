import clsx from "clsx" // optional helper for conditional classNames
import { Loader2 } from "lucide-react" // spinner icon (can use any)

export default function Button({
  size = "sm",
  color = "primary",
  children,
  className,
  noTextPadding = false,
  iconLeading: IconLeading,
  iconTrailing: IconTrailing,
  isDisabled = false,
  isLoading = false,
  showTextWhileLoading = false,
  // onClick,
  ...otherProps
}) {
  // 🎨 Size map
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  // 🎨 Color map
  const colorStyles = {
    primary: "bg-accent-fg text-white hover:bg-accent-emphasis disabled:bg-accent-emphasis",
    secondary: "border border-border-muted text-fg-default hover:bg-accent-subtle disabled:bg-accent-subtle",
    danger: "bg-danger-fg text-white hover:bg-danger-emphasis disabled:bg-danger-emphasis",
  }

  const baseStyles = "cursor-pointer rounded-lg px-4 py-2 text-fg-default text-sm"

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], colorStyles[color], noTextPadding && "px-0", className)}
      disabled={isDisabled || isLoading}
      // onClick={onClick}
      {...otherProps}
    >
      {/* Leading icon */}
      {IconLeading && <IconLeading className={clsx("mr-2 h-5 w-5", isLoading && "opacity-0")} />}

      {/* Loading spinner */}
      {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}

      {/* Button text */}
      {(showTextWhileLoading || !isLoading) && <span className={clsx(isLoading && !showTextWhileLoading && "opacity-0")}>{children}</span>}

      {/* Trailing icon */}
      {IconTrailing && <IconTrailing className={clsx("ml-2 h-5 w-5", isLoading && "opacity-0")} />}
    </button>
  )
}
