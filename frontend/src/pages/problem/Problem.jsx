import React, { useEffect } from "react"
import "./problem.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { fetchProblems } from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getAllProblems } from "@/services/problem.service"

const Problem = () => {
  const { run, loading } = useAsyncHandler()
  const { problems } = useSelector((state) => state.problem)

  const dispatch = useDispatch()

  const getAllProblem = async () => {
    const response = await run(() => getAllProblems())
    dispatch(fetchProblems(response.data.data))
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
            {problems.map((problem, i) => (
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
