import React from "react"
import { useSelector } from "react-redux"

const Submission = () => {
  const { problemSubmissions } = useSelector((state) => state.problem)
  return (
    <div>
      {problemSubmissions.map((submission, index) => (
        <div key={submission.id}>
          <pre>
            {index + 1}-{submission.status} - {submission.language} -{" "}
            {submission.memory} - {submission.time} -{" "}
            {new Date(submission.createdAt).getDate()}-
            {new Date(submission.createdAt).getMonth() + 1}-
            {new Date(submission.createdAt).getFullYear()}
          </pre>
        </div>
      ))}
    </div>
  )
}

export default Submission
