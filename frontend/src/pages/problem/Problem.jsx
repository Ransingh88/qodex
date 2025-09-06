import React, { useEffect } from "react"
import "./problem.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import { clearProblemDetails, fetchProblems } from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getAllProblems } from "@/services/problem.service"
import { Check, Funnel } from "lucide-react"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"

const Problem = () => {
  const { run, loading } = useAsyncHandler()
  const { problems } = useSelector((state) => state.problem)
  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const getAllProblem = async () => {
    const response = await run(() => getAllProblems())
    dispatch(fetchProblems(response.data.data))
  }

  useEffect(() => {
    getAllProblem()
    dispatch(clearProblemDetails())
  }, [])

  // container - guttered
  return (
    <div className="problem-main_container">
      <div className="problem-container ">
        <div className="problem-sidebar">
          <p>Category</p>
        </div>
        <div className="problem-content">
          <div className="problem-header">
            <div className="problem-search_box">
              <input type="search" placeholder="add two numbers..." className="" />
            </div>
            <button>
              <Funnel size={14} />
            </button>
          </div>
          <div className="problem-list">
            {loading ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {problems.map((problem, index) => (
                  <Link to={`/problem/${problem._id}`} key={index}>
                    <div className="problem-item">
                      <div className="problem-item-left">
                        <span className={`problem-item-check`}>
                          {isAuthenticated && problem.solvedBy.includes(user._id) ? <Check size={14} /> : ""}
                        </span>
                        <p className="problem-item-index">{index + 1}.</p>
                        <p className="problem-item-title">{problem.title}</p>
                      </div>
                      <div className="problem-item-right">
                        <p
                          className={`problem-item-difficulty ${
                            problem.difficulty == "easy"
                              ? "text-success-fg"
                              : problem.difficulty == "medium"
                              ? "text-warning-fg"
                              : "text-danger-fg"
                          }`}
                        >
                          {problem.difficulty}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Problem
