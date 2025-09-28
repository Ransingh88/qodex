import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPlaylist, fetchPlaylistStart } from "@/features/rtk/problem/playlistSlice"
import { clearSelectedProblems } from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { addProblemToPlaylist, getAllPlaylist } from "@/services/playlist.service"
import Button from "../button/Button"
import Modal from "../modal/Modal"

const AddPlaylistModal = ({ onClose, isOpen }) => {
  const [playlistId, setPlaylistId] = useState("")

  const { run, loading } = useAsyncHandler()
  const dispatch = useDispatch()

  const { playlists } = useSelector((state) => state.playlist)
  const { selectedProblems } = useSelector((state) => state.problem)

  const handleGetAllPlaylist = run(async () => {
    dispatch(fetchPlaylistStart())
    const res = await getAllPlaylist()
    dispatch(fetchPlaylist(res.data.data))
  })

  const handleAddToPlaylist = run(async (playlistId, problems) => {
    const res = await addProblemToPlaylist(playlistId, problems)
    dispatch(clearSelectedProblems())
    onClose()
    console.log(res)
  })

  useEffect(() => {
    if (playlists.length === 0 && isOpen) {
      handleGetAllPlaylist()
    }
  }, [isOpen])

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="Add to Playlist" subtitle={`Add ${selectedProblems.length} problems to playlist`}>
        <select
          name=""
          id=""
          className="border-border-default bg-basebg-surface2 text-fg-default focus:border-accent-fg w-full rounded-lg border px-3 py-2 outline-none"
          value={playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
        >
          <option value="" disabled selected>
            {loading ? "Loading..." : "Select Playlist"}
          </option>
          {!loading && playlists.length === 0 && (
            <option value="" disabled>
              No Playlist Found
            </option>
          )}
          {playlists &&
            playlists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.title}
              </option>
            ))}
        </select>

        <Button className="mt-4 w-full" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            handleAddToPlaylist(playlistId, selectedProblems)
          }}
        >
          Add to Playlist
        </Button>
      </Modal>
    </div>
  )
}

export default AddPlaylistModal
