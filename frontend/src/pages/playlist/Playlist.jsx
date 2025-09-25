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
          <LoadingSpinner/>
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
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Playlist">
        <Input type="text" placeholder="Playlist Title" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} />
        <Input type="text" placeholder="Playlist Description" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />
        <Button onClick={handleCreatePlaylist}>{loading ? "Creating..." : "Create"}</Button>
      </Modal>
    </div>
  )
}

export default Playlist
