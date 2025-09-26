import { Plus } from "lucide-react"
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
const Playlist = () => {
  const { playlists, isLoading } = useSelector((state) => state.playlist)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { run, loading } = useAsyncHandler()

  const [isModalOpen, setIsModalOpen] = useState(false)
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
    return res
  })

  useEffect(() => {
    if (isAuthenticated) handleGetAllPlaylist()
  }, [isAuthenticated, refreshKey])
  return (
    <div>
      <h1>Playlist</h1>
      <Button
        size="md"
        color="primary"
        onClick={() => {
          setIsModalOpen(true)
        }}
        IconLeading={<Plus />}
      >
        Create
      </Button>

      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          playlists.map((playlist) => (
            <div
              key={playlist._id}
              className="bg-basebg-surface text-fg-default border-border-default mb-4 flex items-center justify-between rounded border p-4"
            >
              <h4>{playlist.title}</h4>
              <button onClick={() => handleDeletePlaylist(playlist._id)}>delete</button>
            </div>
          ))
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subtitle="Create a new playlist to save your favorite tracks."
        title="Create Playlist"
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
    </div>
  )
}

export default Playlist
