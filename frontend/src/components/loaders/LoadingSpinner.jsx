import clsx from "clsx"
import { LoaderCircle } from "lucide-react"

export default function LoadingSpinner({ size = 20 }) {
  return (
    <div className="flex items-center justify-center">
      {/* <LoaderCircle size={size} className="animate-spin text-white" /> */}
      <svg
        fill="none"
        data-icon="loading"
        viewBox="0 0 20 20"
        className={clsx("transition-inherit-all pointer-events-none size-5 shrink-0")}
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
    </div>
  )
}
