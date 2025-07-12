import express from "express"
import {
  addProblemToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllPlaylists,
  getPlaylistDetails,
  updatePlaylist,
} from "../controllers/playlist.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.route("/create").post(verifyJWT, createPlaylist)
router.route("/addProblem").post(verifyJWT, addProblemToPlaylist)
router.route("/all").get(verifyJWT, getAllPlaylists)
router.route("/details/:playlistId").get(verifyJWT, getPlaylistDetails)
router.route("/update/:playlistId").patch(verifyJWT, updatePlaylist)
router.route("/delete/:playlistId").delete(verifyJWT, deletePlaylist)

export default router
