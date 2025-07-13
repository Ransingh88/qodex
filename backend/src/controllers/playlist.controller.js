import { Playlist } from "../models/playlist.model.js"
import { APIError } from "../utils/APIError.js"
import { APIResponse } from "../utils/APIResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createPlaylist = asyncHandler(async (req, res) => {
  const { title, description, problems } = req.body
  const { id } = req.user

  if (!title || !description) {
    throw new APIError(400, "Please provide all required fields")
  }

  const existedPlaylist = await Playlist.findOne({ title })

  if (existedPlaylist) {
    throw new APIError(400, "Playlist already exists with the title")
  }

  const playlistPayload = {
    title,
    description,
    problems,
    createdBy: id,
  }

  const playlist = await Playlist.create(playlistPayload)

  if (!playlist) {
    throw new APIError(500, "something went wrong while creating playlist")
  }

  res.status(200).json(new APIResponse(200, "Playlist created successfully", playlist))
})

const addProblemToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, problemIds } = req.body

  if (!Array.isArray(problemIds) || problemIds.length === 0) {
    throw new APIError(400, "problemIds must be a non-empty array")
  }

  const existedPlaylist = await Playlist.findById(playlistId)

  if (!existedPlaylist) {
    throw new APIError(404, "playlist not found")
  }

  const existingIds = existedPlaylist.problems.map((p) => p.toString())
  const alreadyExists = problemIds.filter((id) => existingIds.includes(id.toString()))

  if (alreadyExists.length === problemIds.length) {
    throw new APIError(400, "All problems already exist in playlist", {
      existingProblems: alreadyExists,
    })
  }

  const newProblemIds = problemIds.filter((id) => !existingIds.includes(id.toString()))

  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    { $addToSet: { problems: { $each: newProblemIds } } },
    { new: true }
  )

  if (!playlist) {
    throw new APIError(500, "something went wrong while adding problem to playlist")
  }

  res
    .status(200)
    .json(
      new APIResponse(200, "Problem added to playlist successfully", { added: newProblemIds, skipped: alreadyExists })
    )
})

const getAllPlaylists = asyncHandler(async (req, res) => {
  const { id } = req.user

  const playlist = await Playlist.find({ createdBy: id })

  if (!playlist) {
    throw new APIError(404, "Playlist not found")
  }

  res.status(200).json(new APIResponse(200, "Successfully fetched all playlists", playlist))
})

const getPlaylistDetails = asyncHandler(async (req, res) => {
  const { playlistId } = req.params

  if (!playlistId) {
    throw new APIError(400, "Please provide playlistId")
  }

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new APIError(404, "Playlist not found")
  }

  res.status(200).json(new APIResponse(200, "Successfully fetched playlist details", playlist))
})

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params
  const { title, description, problems } = req.body

  const playlist = await Playlist.findById(playlistId)

  if (!playlist) {
    throw new APIError(404, "Playlist not found")
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId, { title, description, problems }, { new: true })

  if (!updatedPlaylist) {
    throw new APIError(500, "something went wrong while updating playlist")
  }

  res.status(200).json(new APIResponse(200, "Playlist updated successfully", updatedPlaylist))
})

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params

  const deletedPlaylist = await Playlist.findByIdAndDelete({ _id: playlistId })

  if (!deletedPlaylist) {
    throw new APIError(400, "something went wrong while deletion the playlist")
  }

  res.status(200).json(new APIResponse(200, "playlist deleted successfully"))
})

export { createPlaylist, addProblemToPlaylist, getAllPlaylists, getPlaylistDetails, updatePlaylist, deletePlaylist }
