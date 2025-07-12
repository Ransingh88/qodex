import mongoose from "mongoose"

const playlistSchema = new mongoose.model(
  {
    problems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
)

export const Playlist = mongoose.model("Playlist", playlistSchema)