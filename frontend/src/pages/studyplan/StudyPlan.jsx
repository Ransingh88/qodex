import { Plus, Trash2 } from "lucide-react"
import { Link } from "react-router"
import "./StudyPlan.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import Modal from "@/components/modal/Modal"
import { fetchStudyPlans, fetchStudyPlansStart, addStudyPlan, deleteStudyPlan } from "@/features/rtk/problem/studyPlanSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"

const StudyPlan = () => {
  const { studyPlans, isLoading } = useSelector((state) => state.studyPlan)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { run, loading } = useAsyncHandler()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [planToDelete, setPlanToDelete] = useState(null)
  const [planTitle, setPlanTitle] = useState("")
  const [planDescription, setPlanDescription] = useState("")

  const dispatch = useDispatch()

  // Simulate fetching study plans
  const handleGetAllStudyPlans = run(async () => {
    dispatch(fetchStudyPlansStart())
    // Simulate API call
    setTimeout(() => {
      dispatch(
        fetchStudyPlans([
          { _id: "1", title: "DSA Mastery", description: "A plan to master Data Structures & Algorithms." },
          { _id: "2", title: "Frontend Roadmap", description: "Everything you need to become a frontend pro." },
        ])
      )
    }, 500)
  })

  const handleCreateStudyPlan = run(async () => {
    // Simulate API call
    setTimeout(() => {
      dispatch(addStudyPlan({ _id: Date.now().toString(), title: planTitle, description: planDescription }))
      setPlanTitle("")
      setPlanDescription("")
      setIsModalOpen(false)
    }, 300)
  })

  const handleDeleteStudyPlan = run(async (planId) => {
    // Simulate API call
    setTimeout(() => {
      dispatch(deleteStudyPlan(planId))
      setPlanToDelete(null)
    }, 300)
  })

  useEffect(() => {
    if (isAuthenticated) handleGetAllStudyPlans()
    // eslint-disable-next-line
  }, [isAuthenticated])

  return (
    <div className="mx-auto max-w-5/6 p-4">
      <div className="mb-16 flex items-center justify-between">
        <h1>Study Plans</h1>
        <Button size="md" color="secondary" onClick={() => setIsModalOpen(true)}>
          Create Study Plan
        </Button>
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h5>Featured Study Plans</h5>
          <div className="flex flex-wrap gap-4">
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">DSA 30 Days</span>
              <span className="text-tertiary text-xs">30 days to crack DSA</span>
            </div>
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">Frontend Bootcamp</span>
              <span className="text-tertiary text-xs">From basics to advanced</span>
            </div>
            <div className="bg-secondary border-secondary flex h-54 w-48 flex-col items-center justify-center rounded-lg border p-2 shadow">
              <span className="font-bold">Interview Prep</span>
              <span className="text-tertiary text-xs">Ace your next interview</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h5>My Study Plans</h5>
          {isAuthenticated ? (
            <div className="flex flex-wrap gap-4">
              {isLoading ? (
                <LoadingSpinner />
              ) : studyPlans.length > 0 ? (
                studyPlans.map((plan) => (
                  <Link to={`/problems/study-plan/${plan._id}`} key={plan._id}>
                    <div className="bg-secondary text-secondary border-secondary flex h-28 w-72 items-start justify-between rounded-lg border p-4 shadow">
                      <div>
                        <h5>{plan.title}</h5>
                        <p className="text-tertiary mt-1 text-xs">{plan.description}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setPlanToDelete(plan._id)
                        }}
                        className="text-error-primary hover:text-error-primary_hover cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-tertiary">No study plans found</div>
              )}
            </div>
          ) : (
            <div className="text-tertiary">Please login to view your study plans.</div>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Study Plan"
        subtitle="Create a new study plan to organize your learning."
        size="md"
        iconPosition="center"
      >
        <div className="flex flex-col gap-4 p-2">
          <Input type="text" placeholder="Study Plan Title" value={planTitle} onChange={(e) => setPlanTitle(e.target.value)} />
          <Input
            type="textarea"
            placeholder="Study Plan Description"
            value={planDescription}
            onChange={(e) => setPlanDescription(e.target.value)}
            className="h-20"
          />
          <div className="mt-4 flex w-full justify-center gap-4">
            <Button color="secondary" onClick={() => setIsModalOpen(false)} size="sm" width="full">
              Cancel
            </Button>
            <Button onClick={handleCreateStudyPlan} color="primary" size="sm" loading={loading} width="full">
              {loading ? "Creating" : "Create"}
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={!!planToDelete}
        onClose={() => setPlanToDelete(null)}
        title="Delete Study Plan"
        subtitle="Are you sure you want to delete this study plan?"
        size="sm"
        iconPosition="left"
        modalIcon={<Trash2 />}
        modalIconColor="error"
      >
        <div className="flex flex-col gap-4 p-2">
          <p>This action cannot be undone.</p>
          <div className="mt-4 flex w-full justify-center gap-4">
            <Button color="secondary" onClick={() => setPlanToDelete(null)} size="sm" width="full">
              Cancel
            </Button>
            <Button onClick={() => handleDeleteStudyPlan(planToDelete)} color="primary-destructive" size="sm" loading={loading} width="full">
              {loading ? "Deleting" : "Delete"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default StudyPlan
