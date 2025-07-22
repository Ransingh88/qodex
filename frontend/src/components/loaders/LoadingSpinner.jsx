import { LoaderCircle } from "lucide-react"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircle size={20} className="animate-spin text-white" />
    </div>
  )
}
