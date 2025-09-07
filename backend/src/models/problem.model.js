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
      type: [],
      default: [],
    },
    topics: {
      type: String,
    },
    examples: {
      type: JSON,
    },
    constraints: {
      type: String,
    },
    hints: {
      type: String,
    },
    editorial: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    category: {
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
    askedBy: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bonus: {
      description: String,
    },
    solvedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Submission",
      },
    ],
  },
  { timestamps: true, versionKey: false }
)

export const Problem = mongoose.model("Problem", problemSchema)
