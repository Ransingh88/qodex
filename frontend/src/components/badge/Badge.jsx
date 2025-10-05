import clsx from "clsx"

const base = "size-max flex items-center whitespace-nowrap rounded-md ring-1 ring-inset shadow-xs"

const badgeTypes = { pill: "rounded-full", modern: "rounded-md" }

const badgeColors = {
  fill: {
    primary: "bg-primary text-secondary ring-primary",
    secondary: "bg-secondary text-tertiary ring-secondary",
    tertiary: "bg-tertiary text-secondary ring-tertiary",
    brand: "bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200",
    error: "bg-utility-error-50 text-utility-error-700 ring-utility-error-200",
    warning: "bg-utility-warning-50 text-utility-warning-700 ring-utility-warning-200",
    success: "bg-utility-success-50 text-utility-success-700 ring-utility-success-200",
  },
  outlined: {
    primary: "text-secondary ring-primary",
    secondary: "text-tertiary ring-secondary",
    brand: "text-utility-brand-600 ring-utility-brand-300",
    error: "text-utility-error-600 ring-utility-error-300",
    warning: "text-utility-warning-600 ring-utility-warning-300",
    success: "text-utility-success-600 ring-utility-success-300",
  },
}

const badgeDotColors = {
  primary: "bg-utility-gray-400",
  secondary: "bg-utility-gray-700",
  brand: "bg-utility-brand-500",
  error: "bg-utility-error-500",
  warning: "bg-utility-warning-500",
  success: "bg-utility-success-500",
}

const badgeSizes = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5",

  modern: {
    sm: "gap-1 py-0.5 px-1.5 text-xs font-medium",
    md: "gap-1.5 py-0.5 px-2 text-sm font-medium",
    lg: "gap-1.5 py-1 px-2.5 text-sm font-medium rounded-lg",
  },
}

export function Badge({
  color = "primary",
  type = "modern",
  variant = "outlined",
  size = "sm",
  withDot = false,
  dotColor = "success",
  className = "",
  children,
}) {
  return (
    <span className={clsx(base, badgeTypes[type], badgeColors[variant][color], badgeSizes[type][size], className)}>
      {withDot && <span className={clsx("inline-block h-1.5 w-1.5 rounded-full", badgeDotColors[dotColor])} />}
      {children}
    </span>
  )
}
