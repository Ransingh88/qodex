import API from "./api"

const createPlaylist = (title, description, problems = []) => {
  const response = API.post("/playlist/create", {
    title,
    description,
    problems,
  })

  return response
}
const addProblemToPlaylist = (playlistId, problemIds = []) => {
  const response = API.post("/playlist/addProblem", {
    playlistId,
    problemIds,
  })

  return response
}
const getAllPlaylist = () => {
  const response = API.get("/playlist/all")

  return response
}

const getPlaylistDetails = (playlistId) => {
  const response = API.get(`/playlist/details/${playlistId}`)

  return response
}
const updatePlaylist = (playlistId, title, problems) => {
  const response = API.patch(`/playlist/update/${playlistId}`, {
    title,
    problems,
  })

  return response
}
const deletePlaylist = (playlistId) => {
  const response = API.delete(`/playlist/delete/${playlistId}`)

  return response
}

export { createPlaylist, addProblemToPlaylist, getAllPlaylist, getPlaylistDetails, updatePlaylist, deletePlaylist }
