import React, { useEffect, useState } from "react"
import "./problemDetails.css"
import { useParams } from "react-router"
import CodeEditor from "@/components/editor/CodeEditor"
import { getProblemDetails } from "@/services/problem.service"

const ProblemDetails = () => {
  const [problemDetails, setProblemDetails] = useState({})
  const { id } = useParams()

  const handleGetProblemDetails = async (problemId) => {
    const response = await getProblemDetails(problemId)
    setProblemDetails(response.data.data)
  }

  console.log(problemDetails, "ProblemDetails")
  useEffect(() => {
    handleGetProblemDetails(id)
  }, [id])
  return (
    <div className="m-2 h-full w-full flex flex-1 justify-center items-center gap-1.5">
      <div className="h-full w-1/2 bg-basebg-surface rounded-lg p-4">
        <h4>
          {problemDetails.title}{" "}
          <span className="ml-4 p-0.5 px-1 text-xxs border bg-warning-subtle border-warning-emphasis/50 rounded">
            {problemDetails.difficulty}
          </span>
        </h4>
        <p className="mt-2 py-2">Problem Description</p>
        <div className="border border-border-default p-2 rounded h-full">
          <p>{problemDetails.description}</p>
          <div className="mt-2">
            <p>
              Explanation:
              <br /> {problemDetails?.examples?.JAVASCRIPT?.explanation}
            </p>
            <p>Input: {problemDetails?.examples?.JAVASCRIPT?.input}</p>
            <p>Output: {problemDetails?.examples?.JAVASCRIPT?.output}</p>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2 bg-basebg-surface rounded-lg p-2">
        {/* Editor */}
        <CodeEditor
          sourceCode={problemDetails?.codeSnippets?.JAVASCRIPT}
        />
      </div>
    </div>
  )
}

export default ProblemDetails
