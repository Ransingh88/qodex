import { ChevronRight, ArrowLeft } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { fetchStudyPlans, fetchStudyPlansStart } from "@/features/rtk/problem/studyPlanSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"

const StudyPlanDetails = () => {
  const { id } = useParams()
  const { studyPlans } = useSelector((state) => state.studyPlan)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { problems } = useSelector((state) => state.problem)
  const [studyPlan, setStudyPlan] = useState({})

  const dispatch = useDispatch()
  const { run, loading } = useAsyncHandler()
  const navigate = useNavigate()

  const handleGetAllStudyPlans = run(async () => {
    dispatch(fetchStudyPlansStart())
    // Simulate API call - replace with actual API call when ready
    setTimeout(() => {
      dispatch(
        fetchStudyPlans([
          { _id: "1", title: "DSA Mastery", description: "A plan to master Data Structures & Algorithms.", problems: ["1", "2", "3"] },
          { _id: "2", title: "Frontend Roadmap", description: "Everything you need to become a frontend pro.", problems: ["4", "5"] },
        ])
      )
    }, 500)
  })

  useEffect(() => {
    if (studyPlans.length > 0) {
      setStudyPlan(studyPlans.find((item) => item._id === id) || {})
    } else {
      handleGetAllStudyPlans()
    }
  }, [id, studyPlans])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/problems/study-plan", { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="mx-auto max-w-4/6 p-4">
      <button onClick={() => navigate(-1)} className="text-secondary hover:text-primary mb-4 flex items-center gap-2 transition-colors">
        <ArrowLeft size={20} />
        <span>Back to Study Plans</span>
      </button>
      <div className="flex h-24 items-center justify-center p-2">
        <h1 className="">{studyPlan.title}</h1>
      </div>
      <div className="flex flex-col gap-12">
        <div className="text-tertiary mb-8 text-center text-sm">{studyPlan.description}</div>
        <div className="flex flex-col gap-4">
          {isAuthenticated ? (
            <div className="flex flex-wrap gap-4">
              {loading ? (
                <LoadingSpinner />
              ) : studyPlan.problems?.length > 0 ? (
                studyPlan.problems.map((problemId) => {
                  const problemObj = problems.find((p) => p._id === problemId)
                  return (
                    <div key={problemId} className="bg-secondary border-secondary w-full rounded-lg border px-4 py-3 shadow">
                      <Link to={`/problem/${problemId}`}>
                        <div className="flex items-center justify-between">
                          <p className="text-secondary text-sm">{problemObj ? problemObj.title : problemId}</p>
                          <ChevronRight className="text-secondary" size={20} />
                        </div>
                      </Link>
                    </div>
                  )
                })
              ) : (
                <div className="text-tertiary flex justify-center text-center">
                  <p>No problems found in this study plan</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-tertiary text-center">Please login to view study plans.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudyPlanDetails
