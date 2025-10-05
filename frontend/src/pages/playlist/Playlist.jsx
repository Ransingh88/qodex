import { Plus, Trash2 } from "lucide-react"
import "./playlist.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import Modal from "@/components/modal/Modal"
import { fetchPlaylist, fetchPlaylistStart } from "@/features/rtk/problem/playlistSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { createPlaylist, deletePlaylist, getAllPlaylist } from "@/services/playlist.service"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { Link } from "react-router"
const Playlist = () => {
  const { playlists, isLoading } = useSelector((state) => state.playlist)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { run, loading } = useAsyncHandler()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [playlistToDelete, setPlaylistToDelete] = useState(null)
  const [playlistTitle, setPlaylistTitle] = useState("")
  const [playlistDescription, setPlaylistDescription] = useState("")
  const [refreshKey, setRefreshKey] = useState(0)

  const dispatch = useDispatch()

  const handleGetAllPlaylist = run(async () => {
    dispatch(fetchPlaylistStart())
    const res = await getAllPlaylist()
    dispatch(fetchPlaylist(res.data.data))
  })

  const handleCreatePlaylist = run(async () => {
    const res = await createPlaylist(playlistTitle, playlistDescription)
    setPlaylistTitle("")
    setPlaylistDescription("")
    setIsModalOpen(false)
    setRefreshKey((prev) => prev + 1)
    return res
  })
  const handleDeletePlaylist = run(async (playlistId) => {
    const res = await deletePlaylist(playlistId)
    setRefreshKey((prev) => prev + 1)
    setPlaylistToDelete(null)
    return res
  })

  useEffect(() => {
    if (isAuthenticated) handleGetAllPlaylist()
  }, [isAuthenticated, refreshKey])
  return (
    <div className="mx-auto max-w-5/6 p-4">
      <div className="mb-16 flex items-center justify-between">
        <h1>Playlists</h1>
        <Button
          size="md"
          color="secondary"
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          Create Playlist
        </Button>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h5>Featured</h5>
          <div className="flex flex-wrap gap-4">
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">Top DSA</span>
              <span className="text-tertiary text-center text-xs">Best playlists for Data Structures & Algorithms</span>
            </div>
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">Frontend Mastery</span>
              <span className="text-tertiary text-center text-xs">Curated playlists for frontend development</span>
            </div>
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">Interview Prep</span>
              <span className="text-tertiary text-center text-xs">Ace your interviews with these playlists</span>
            </div>
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">JavaScript 30</span>
              <span className="text-tertiary text-center text-xs">30 days of JavaScript coding challenges</span>
            </div>
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">System Design</span>
              <span className="text-tertiary text-center text-xs">Playlists to master system design concepts</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h5>My Playlist</h5>
          {isAuthenticated ? (
            <div className="flex flex-wrap gap-4">
              {isLoading ? (
                <LoadingSpinner />
              ) : playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <Link to={`/problems/playlist/${playlist._id}`} key={playlist._id}>
                    <div className="bg-secondary text-secondary border-secondary flex h-28 w-72 items-start justify-between rounded-lg border p-4 shadow">
                      <h5>{playlist.title}</h5>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setPlaylistToDelete(playlist._id)
                        }}
                        className="text-error-primary hover:text-error-primary_hover cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-tertiary">No playlist found</div>
              )}
            </div>
          ) : (
            <div className="text-tertiary">Please login to view your playlists.</div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Playlist"
        subtitle={<span className="block w-full text-center">Create a new playlist to save your favorite tracks.</span>}
        size="md"
        iconPosition="center"
      >
        <div className="flex flex-col gap-4 p-2">
          <Input type="text" placeholder="Playlist Title" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} />
          <Input
            type="textarea"
            placeholder="Playlist Description"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
            className="h-20"
          />
          <div className="mt-4 flex w-full justify-center gap-4">
            <Button color="secondary" onClick={() => setIsModalOpen(false)} size="sm" width="full">
              Cancel
            </Button>
            <Button onClick={handleCreatePlaylist} color="primary" size="sm" loading={loading} width="full">
              {loading ? "Creating" : "Create"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!playlistToDelete}
        onClose={() => setPlaylistToDelete(null)}
        title="Delete Playlist"
        subtitle="Are you sure you want to delete this playlist?"
        size="sm"
        iconPosition="left"
        modalIcon={<Trash2 />}
        modalIconColor="error"
      >
        <div className="flex flex-col gap-4 p-2">
          <p>This action cannot be undone.</p>
          <div className="mt-4 flex w-full justify-center gap-4">
            <Button color="secondary" onClick={() => setPlaylistToDelete(null)} size="sm" width="full">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDeletePlaylist(playlistToDelete)
              }}
              color="primary-destructive"
              size="sm"
              loading={loading}
              width="full"
            >
              {loading ? "Deleting" : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Playlist
