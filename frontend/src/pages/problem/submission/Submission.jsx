import React from "react"
import { useSelector } from "react-redux"

const Submission = () => {
  const { problemSubmissions } = useSelector((state) => state.problem)
  return (
    <div className="overflow-x-auto mt-4">
      {problemSubmissions.length === 0 ? (
        <p className="text-center">No submissions yet.</p>
      ) : (
        <table className="min-w-full border border-border-default rounded-lg shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">#</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Language</th>
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Memory</th>
            </tr>
          </thead>
          <tbody>
            {[...problemSubmissions]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((submission, index) => {
                let statusClass = ""
                if (submission.status === "Accepted") statusClass = "text-green-600"
                else if (submission.status === "Wrong Answer") statusClass = "text-red-600"
                const dateObj = new Date(submission.createdAt)
                const options = { month: "short", day: "2-digit", year: "numeric" }
                const formattedDate = dateObj.toLocaleDateString("en-US", options)
                let hours = dateObj.getHours()
                const minutes = dateObj.getMinutes().toString().padStart(2, "0")
                const ampm = hours >= 12 ? "pm" : "am"
                hours = hours % 12 || 12
                const formattedTime = `${hours}:${minutes}${ampm}`
                return (
                  <tr key={index} className="border-t border-border-default">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className={`px-4 py-2 ${statusClass}`}>{submission.status}</td>
                    <td className="px-4 py-2 flex flex-col">
                      <p>{formattedDate}</p>
                      <p className="text-xs text-fg-muted">{formattedTime}</p>
                    </td>
                    <td className="px-4 py-2 capitalize">{submission.language}</td>
                    <td className="px-4 py-2">{submission.time}</td>
                    <td className="px-4 py-2">{submission.memory}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Submission
