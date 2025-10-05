import { ChevronRight, Trash2 } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { fetchPlaylist, fetchPlaylistStart } from "@/features/rtk/problem/playlistSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getAllPlaylist } from "@/services/playlist.service"

const PlaylistDetails = () => {
  const { id } = useParams()
  const { playlists } = useSelector((state) => state.playlist)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { problems } = useSelector((state) => state.problem)
  const [playlist, setPlaylist] = useState({})

  const dispatch = useDispatch()
  const { run, loading } = useAsyncHandler()
  const navigate = useNavigate()

  const handleGetAllPlaylist = run(async () => {
    dispatch(fetchPlaylistStart())
    const res = await getAllPlaylist()
    dispatch(fetchPlaylist(res.data.data))
  })

  useEffect(() => {
    if (playlists.length > 0) {
      setPlaylist(playlists.find((item) => item._id === id) || {})
    } else {
      handleGetAllPlaylist()
    }
  }, [id, playlists])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/problems/playlist", { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="mx-auto max-w-4/6 p-4">
      <div className="flex h-24 items-center justify-center p-2">
        <h1 className="">{playlist.title}</h1>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          {isAuthenticated ? (
            <div className="flex flex-wrap gap-4">
              {loading ? (
                <LoadingSpinner />
              ) : playlist.problems?.length > 0 ? (
                playlist.problems.map((problemId) => {
                  const problemObj = problems.find((p) => p._id === problemId)
                  return (
                    <div key={problemId} className="bg-secondary border-secondary w-full rounded-lg border px-4 py-3 shadow">
                      <Link to={`/problem/${problemId}`}>
                        <p className="text-secondary text-sm">{problemObj ? problemObj.title : problemId}</p>
                      </Link>
                    </div>
                  )
                })
              ) : (
                <div className="text-tertiary flex justify-center text-center">
                  <p>No problem found, add some to your playlist</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-tertiary text-center">Please login to view your playlists.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlaylistDetails
