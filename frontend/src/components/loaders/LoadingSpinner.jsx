import { LoaderCircle } from "lucide-react"

export default function LoadingSpinner({ size = 20 }) {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle size={size} className="animate-spin text-white" />
    </div>
  )
}
