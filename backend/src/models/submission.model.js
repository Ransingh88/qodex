import mongoose from "mongoose"

const testcaseSchema = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
  },
  testcaseNo: {
    type: Number,
    default: 1,
  },
  isPassed: {
    type: Boolean,
    default: false,
  },
  stdin: {
    type: String,
    required: true,
  },
  stdout: {
    type: String,
    required: true,
  },
  stderr: {
    type: String,
    required: true,
  },
  compileOutput: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  memory: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
})

const submissionSchema = new mongoose.Schema(
  {
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    sourceCode: {
      type: JSON,
      required: true,
    },
    stdin: {
      type: String,
      required: true,
    },
    stdout: {
      type: String,
      required: true,
    },
    stderr: {
      type: String,
      required: true,
    },
    compileOutput: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    memory: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    testCases: {
      type: [testcaseSchema],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
)

export const Submission = mongoose.model("Submission", submissionSchema)
