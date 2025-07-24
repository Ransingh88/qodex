import { MoveLeft } from "lucide-react"
import React from "react"
import { Link, useNavigate } from "react-router"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full h-screen bg-basebg-default text-fg-default flex justify-center relative">
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2  w-1/2 h-[500px] bg-[linear-gradient(var(--color-grid-pattrn)_1px,transparent_1px),linear-gradient(to_right,var(--color-grid-pattrn)_1px,transparent_1px)] 
              bg-[size:35px_35px] opacity-30 mask-x-from-70% mask-x-to-90% mask-y-from-70% mask-y-to-100% z-30"
      ></div>
      <div className="w-full h-full flex flex-col items-center justify-start px-24 pt-24 gap-6 z-31">
        <div className="px-2 py-1 rounded-lg flex items-center gap-2 bg-basebg-default border border-border-muted tracking-wide shadow">
          <span className="w-2 h-2 bg-danger-fg rounded-full"></span>
          <p className="text-xs">404 error</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl">We can't find this page</h1>
          <p className="text-sm text-fg-muted">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 border border-border-muted hover:bg-accent-subtle bg-basebg-default text-fg-default px-4 py-2 rounded-lg cursor-pointer"
          >
            <MoveLeft size={18} className="mt-0.5" /> Go back
          </button>
          <Link
            to="/"
            className="bg-accent-fg hover:bg-accent-emphasis text-[#f8f8f8] px-4 py-2 rounded-lg cursor-pointer"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
