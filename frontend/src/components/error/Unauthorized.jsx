import { MoveLeft } from "lucide-react"
import { Link, useNavigate } from "react-router"

const Unauthorized = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-primary text-primary relative flex h-screen w-full justify-center">
      <div className="pointer-events-none absolute -top-40 left-1/2 z-0 h-[500px] w-1/2 -translate-x-1/2 bg-[linear-gradient(var(--color-border-primary)_1px,transparent_1px),linear-gradient(to_right,var(--color-border-primary)_1px,transparent_1px)] mask-y-from-70% mask-y-to-100% mask-x-from-70% mask-x-to-90% bg-[size:35px_35px] opacity-70"></div>
      <div className="z-1 flex h-full w-full flex-col items-center justify-start gap-6 px-24 pt-24">
        <div className="bg-primary border-border-muted flex items-center gap-2 rounded-lg border px-2 py-1 tracking-wide shadow">
          <span className="bg-danger-fg h-2 w-2 rounded-full"></span>
          <p className="text-xs">401 error</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl">Unauthorized</h1>
          <p className="text-fg-muted text-center text-sm">
            You are not authorized to view this page. <br /> Please log in with the correct credentials to access this page.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="border-border-muted hover:bg-accent-subtle bg-primary text-primary flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2"
          >
            <MoveLeft size={18} className="mt-0.5" /> Go back
          </button>
          <Link to="/" className="bg-accent-fg hover:bg-accent-emphasis cursor-pointer rounded-lg px-4 py-2 text-[#f8f8f8]">
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
