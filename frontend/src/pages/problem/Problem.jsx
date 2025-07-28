import React, { useEffect, useState } from "react"
import "./problem.css"
import { Link } from "react-router"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getAllProblems } from "@/services/problem.service"

const Problem = () => {
  const { run, loading } = useAsyncHandler()
  const [allProblems, setAllProblems] = useState([])

  const getAllProblem = async () => {
    const allProblems = await run(() => getAllProblems())
    setAllProblems(allProblems.data.data)
  }

  useEffect(() => {
    getAllProblem()
  }, [])

  return (
    <div className="problem-main_container">
      <div className="problem-container container-guttered">
        {loading ? (
          "loading"
        ) : (
          <>
            {allProblems.map((problem, i) => (
              <p key={i}>
                <Link to={`/problem/${problem._id}`}>
                  {" "}
                  {i + 1}. {problem.title} - {problem.difficulty}
                </Link>
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Problem
