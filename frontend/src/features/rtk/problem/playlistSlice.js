import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  playlists: [],
  isLoading: false,
  error: null,
}

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    fetchPlaylistStart(state) {
      state.isLoading = true
      state.error = null
    },
    fetchPlaylist(state, action) {
      state.playlists = action.payload
      state.isLoading = false
    },
  },
})

export const { fetchPlaylistStart, fetchPlaylist } = playlistSlice.actions

export default playlistSlice.reducer
