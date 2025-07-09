import mongoose from "mongoose"
import { DIFFICULTIES } from "../config/constant/constants.js"

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    difficulty: {
      type: String,
      enum: Object.values(DIFFICULTIES),
      default: DIFFICULTIES.MEDIUM,
    },
    tags: {
      type: [String],
      default: [],
    },
    topics: {
      type: String,
    },
    examples: {
      type: Object,
    },
    constrains: {
      type: String,
    },
    hints: {
      type: String,
    },
    editorial: {
      type: String,
    },
    testcases: {
      type: JSON,
    },
    codeSnippets: {
      type: JSON,
    },
    referenceSolutions: {
      type: JSON,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    solvedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, versionKey: false }
)

export const Problem = mongoose.model("Problem", problemSchema)
