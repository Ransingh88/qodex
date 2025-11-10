import { useEffect, useState } from "react"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getSolvedProblem } from "@/services/problem.service"
import { Badge } from "@/components/badge/Badge"
import { useSelector } from "react-redux"
// import { useSelector } from "react-redux"

const Dashboard = () => {
  // const { user } = useSelector((state) => state.auth)
  const [data, setData] = useState([])
  const { problems } = useSelector((state) => state.problem)

  const { run, loading } = useAsyncHandler()

  const getSolvedProblems = run(async () => {
    const res = await getSolvedProblem()
    setData(res?.data?.data)
  })

  useEffect(() => {
    getSolvedProblems()
  }, [])

  return (
    <div>
      {/* <div className="">
        <h3 className="mb-2">Welcome back, {user.fullName.split(" ")[0]}</h3>
        <p className="text-tertiary">Your recent code summary and activity.</p>
      </div> */}
      <div className="my-8 flex gap-8">
        <div className="bg-secondary border-secondary flex h-[500px] flex-4/6 flex-col rounded-lg border p-4">
          <p className="text-secondary text-md font-semibold">Ranking</p>
          <div className="my-4 flex items-center gap-8">
            <div className="flex items-center gap-4">
              <span className="bg-tertiary h-10 w-10"></span>
              <span>
                <p className="text-tertiary">Global Rank</p>
                <p className="text-secondary">180743</p>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-tertiary h-10 w-10"></span>
              <span>
                <p className="text-tertiary">Country Rank</p>
                <p className="text-secondary">5367</p>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-tertiary h-10 w-10"></span>
              <span>
                <p className="text-tertiary">Percentile</p>
                <p className="text-secondary">86%</p>
              </span>
            </div>
          </div>
        </div>
        <div className="bg-secondary border-secondary flex h-[500px] flex-2/6 flex-col rounded-lg border p-4">
          <p className="text-secondary text-md flex gap-2 font-semibold">Question Attempted</p>
          <div className="mt-4 flex flex-1 flex-col">
            {loading ? (
              <p className="text-secondary">Loading...</p>
            ) : data.length === 0 ? (
              <p className="text-secondary">No data available</p>
            ) : (
              data.map((item) => {
                const problemObj = problems.find((p) => p._id === item)
                return (
                  <div key={item._id} className="bg-tertiary/20 mb-2 w-full rounded-lg p-2">
                    <p className="text-secondary">{problemObj ? problemObj.title : item}</p>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
      <div className="my-8 flex gap-8">
        <div className="flex h-[500px] flex-4/6 gap-8">
          <div className="bg-secondary border-secondary flex h-[350px] flex-1/2 rounded-lg border"></div>
          <div className="bg-secondary border-secondary flex h-[350px] flex-1/2 rounded-lg border"></div>
        </div>

        <div className="bg-secondary border-secondary flex h-[350px] flex-2/6 rounded-lg border p-4">
          <p className="text-secondary text-md font-semibold">Streak</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
