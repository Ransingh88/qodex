import { Plus } from "lucide-react"
import "./playlist.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlaylist, fetchPlaylistStart } from "@/features/rtk/problem/playlistSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { createPlaylist, deletePlaylist, getAllPlaylist } from "@/services/playlist.service"
const Playlist = () => {
  const { playlists, isLoading } = useSelector((state) => state.playlist)
  const { run } = useAsyncHandler()

  const [playlistTitle, setPlaylistTitle] = useState("")
  const [playlistDescription, setPlaylistDescription] = useState("")

  const dispatch = useDispatch()

  const handleGetAllPlaylist = run(async () => {
    dispatch(fetchPlaylistStart())
    const res = await getAllPlaylist()
    dispatch(fetchPlaylist(res.data.data))
  })

  const handleCreatePlaylist = run(async () => {
    const res = await createPlaylist(playlistTitle, playlistDescription)
    return res
  })
  const handleDeletePlaylist = run(async (playlistId) => {
    const res = await deletePlaylist(playlistId)
    return res
  })

  useEffect(() => {
    handleGetAllPlaylist()
  }, [])
  return (
    <div>
      <h1>Playlist</h1>
      <button>
        <Plus /> Create
      </button>

      <input type="text" name="" id="" value={playlistTitle} onChange={(e) => setPlaylistTitle(e.target.value)} />
      <input type="text" name="" id="" value={playlistDescription} onChange={(e) => setPlaylistDescription(e.target.value)} />
      <button onClick={handleCreatePlaylist}>create</button>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist._id}>
              <h4>{playlist.title}</h4>
              <button onClick={() => handleDeletePlaylist(playlist._id)}>delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Playlist
