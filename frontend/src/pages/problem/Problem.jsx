import { ArrowDownNarrowWide, ArrowDownUp, ArrowDownWideNarrow, Check, Funnel } from "lucide-react"
import React, { useEffect, useState } from "react"
import "./problem.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { clearProblemDetails, fetchProblems } from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getAllProblems, getProblemCategory, getProblemCompanies, getProblemDifficulties, getProblemTags } from "@/services/problem.service"
import FilterPopover from "@/components/popover/FilterPopover"

const Problem = () => {
  const { run, loading } = useAsyncHandler()
  const { problems } = useSelector((state) => state.problem)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [filters, setFilters] = useState({})
  const [filterData, setFilterData] = useState({})
  const [searchText, setSearchText] = useState("")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortBy, setSortBy] = useState("createdAt")

  const getAllProblem = async (filter) => {
    const response = await run(() => getAllProblems(filter))
    dispatch(fetchProblems(response.data.data.allProblems))
  }

  const fetchFilters = async () => {
    const [categories, tags, companies, difficulties] = await Promise.all([
      getProblemCategory(),
      getProblemTags(),
      getProblemCompanies(),
      getProblemDifficulties(),
    ])

    setFilterData({
      categories: categories.data.data,
      tags: tags.data.data,
      companies: companies.data.data,
      difficulties: difficulties.data.data,
    })

    return { categories, tags, companies, difficulties }
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value)
    setFilters({ ...filters, search: e.target.value })
  }

  const handleSort = () => {
    setFilters({ ...filters, order: sortOrder === "asc" ? "desc" : "asc", sortBy: sortBy })
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  // const handleFilter = (filter) => {
  //   setFilters({ ...filters, ...filter })
  // }

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    getAllProblem(filters)
    dispatch(clearProblemDetails())
  }, [filters, dispatch])

  // container - guttered
  return (
    <div className="problem-main_container">
      <div className="problem-container ">
        <div className="problem-sidebar">
          <div>
            <p>Category</p>
            <div>{filterData.categories && filterData.categories.map((category, i) => <div key={i}>{category}</div>)}</div>
          </div>
        </div>
        <div className="problem-content">
          {/* <div className="problem-courses">
            <div className="problem-courses_card">Problems</div>
            <div className="problem-courses_card">Contests</div>
            <div className="problem-courses_card">Solutions</div>
            <div className="problem-courses_card">Solutions</div>
          </div> */}
          <div className="problem-header">
            <div className="problem-search_box">
              <input type="search" placeholder="add two numbers..." className="" value={searchText} onChange={handleSearch} />
            </div>
            <div className="problem-filter">
              <FilterPopover icon={<ArrowDownUp size={14} />}>
                <div className="problem-filter_sort-card p-2">
                  <p
                    onClick={() => {
                      setSortBy("createdAt")
                    }}
                    className={`${sortBy === "createdAt" ? "bg-accent-emphasis" : ""}`}
                  >
                    Date{" "}
                    <button onClick={() => handleSort("date")}>
                      {sortOrder === "asc" ? <ArrowDownNarrowWide size={14} /> : <ArrowDownWideNarrow size={14} />}
                    </button>
                  </p>
                  <p
                    onClick={() => {
                      setSortBy("difficulty")
                    }}
                    className={`${sortBy === "difficulty" ? "bg-accent-emphasis" : ""}`}
                  >
                    Difficulty{" "}
                    <button onClick={() => handleSort("difficulty")}>
                      {sortOrder === "asc" ? <ArrowDownNarrowWide size={14} /> : <ArrowDownWideNarrow size={14} />}
                    </button>
                  </p>
                </div>
              </FilterPopover>
              {/* <button onClick={() => setIsSortOpen(!isSortOpen)} className="problem-filter_sort">
                <ArrowDownUp size={14} />
                {isSortOpen && (
                  <div className="problem-filter_sort-card">
                    <p
                      onClick={() => {
                        setSortBy("createdAt")
                      }}
                      className={`${sortBy === "createdAt" ? "bg-accent-emphasis" : ""}`}
                    >
                      Date{" "}
                      <button onClick={() => handleSort("date")}>
                        {sortOrder === "asc" ? <ArrowDownNarrowWide size={14} /> : <ArrowDownWideNarrow size={14} />}
                      </button>
                    </p>
                    <p
                      onClick={() => {
                        setSortBy("difficulty")
                      }}
                      className={`${sortBy === "difficulty" ? "bg-accent-emphasis" : ""}`}
                    >
                      Difficulty{" "}
                      <button onClick={() => handleSort("difficulty")}>
                        {sortOrder === "asc" ? <ArrowDownNarrowWide size={14} /> : <ArrowDownWideNarrow size={14} />}
                      </button>
                    </p>
                  </div>
                )}
              </button> */}
              <button>
                <Funnel size={14} />
              </button>
            </div>
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
                            problem.difficulty == "easy" ? "text-success-fg" : problem.difficulty == "medium" ? "text-warning-fg" : "text-danger-fg"
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
