import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  Ellipsis,
  Funnel,
  FunnelX,
  Star,
} from "lucide-react"
import React, { useEffect, useState } from "react"
import "./problem.css"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import FilterPopover from "@/components/popover/FilterPopover"
import { clearProblemDetails, fetchProblems } from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { getAllProblems, getProblemCategory, getProblemCompanies, getProblemDifficulties, getProblemTags } from "@/services/problem.service"

const Problem = () => {
  const { run, loading } = useAsyncHandler()
  const { problems } = useSelector((state) => state.problem)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [filters, setFilters] = useState()
  const [filterData, setFilterData] = useState({})
  const [searchText, setSearchText] = useState("")
  // const [isSortOpen, setIsSortOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortBy, setSortBy] = useState("createdAt")

  const sortOptions = [
    {
      label: "Date",
      value: "createdAt",
      icon: <CalendarDays size={14} />,
    },
    {
      label: "Difficulty",
      value: "difficulty",
      icon: <ChartNoAxesCombined size={14} />,
    },
  ]

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

  return (
    <div className="problem-container">
      <div className="problem-content">
        <div className="problem-courses">
          {/* <div className="problem-courses_card">Problems</div>
          <div className="problem-courses_card">Contests</div>
          <div className="problem-courses_card">Solutions</div> */}
          <div className="problem-courses_card">Top Interview Questions</div>
          <div className="problem-courses_card">Javascript 30Day Challange</div>
        </div>
        <div className="problem-header">
          <div className="problem-search_box">
            <input type="search" placeholder="add two numbers..." className="" value={searchText} onChange={handleSearch} />
            {filters && (
              <button onClick={() => setFilters()} className="problem-search_box_clear">
                {" "}
                <FunnelX size={14} /> Clear Filters
              </button>
            )}
          </div>
          <div className="problem-filter">
            <FilterPopover icon={<ArrowDownUp size={14} />}>
              <div className="w-64">
                <div className="m-1 px-3 py-4 text-center border border-border-default shadow rounded-xl">
                  <p className=" font-semibold">Sort By</p>
                </div>
                <div className="p-2 flex flex-col gap-2">
                  {sortOptions.map((option, index) => (
                    <div
                      key={index}
                      className={` ${
                        sortBy === option.value ? "bg-accent-fg/70" : "hover:bg-accent-subtle"
                      } flex justify-between items-center text-fg-default gap-4 cursor-pointer  px-2 py-2 rounded-lg `}
                      onClick={() => {
                        setSortBy(option.value)
                        handleSort(option.value)
                      }}
                    >
                      <span className="flex items-center gap-2">
                        {option.icon} {option.label}
                      </span>
                      {sortBy === option.value && (
                        <button
                          onClick={() => {
                            setSortBy(option.value)
                            handleSort(option.value)
                          }}
                          className={`cursor-pointer p-0.5 rounded-full  hover:bg-accent-subtle `}
                        >
                          {sortOrder === "asc" ? <ArrowDownNarrowWide size={14} /> : <ArrowDownWideNarrow size={14} />}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FilterPopover>
            <FilterPopover icon={<Funnel size={14} />}>
              <div className="w-64">
                <div className="m-1 px-3 py-4 text-center border border-border-default shadow rounded-xl">
                  <p className=" font-semibold">Filter</p>
                </div>
                <div className="p-2 flex flex-col gap-2 w-64">
                  <div className="flex flex-col p-2 border-b border-border-default gap-2">
                    <p>Difficulty</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {filterData.difficulties &&
                        filterData.difficulties.map((difficulty, i) => (
                          <div
                            key={i}
                            className="px-2 py-1 rounded-lg bg-basebg-surface2 border border-border-default text-fg-muted hover:bg-accent-emphasis hover:text-fg-default cursor-pointer"
                            onClick={() => setFilters({ ...filters, difficulty })}
                          >
                            {difficulty}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col p-2 gap-2 ">
                    <p>Category</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {filterData.categories &&
                        filterData.categories.map((category, i) => (
                          <div
                            key={i}
                            className="px-2 py-1 rounded-lg bg-basebg-surface2 border border-border-default text-fg-muted hover:bg-accent-emphasis hover:text-fg-default cursor-pointer"
                            onClick={() => setFilters({ ...filters, category })}
                          >
                            {category}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-center p-2 gap-2 ">
                    <button className="w-full flex items-center justify-center gap-2 py-2 text-sm rounded-lg border border-border-muted text-fg-default hover:bg-accent-subtle cursor-pointer">
                      Reset
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-accent-fg text-[#f8f8f8] hover:bg-accent-emphasis cursor-pointer">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </FilterPopover>
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
                      <div
                        className={`px-2 py-1 rounded-lg flex items-center gap-1 bg-basebg-default border tracking-wide shadow ${
                          problem.difficulty == "easy"
                            ? "border-success-fg/50"
                            : problem.difficulty == "medium"
                            ? "border-warning-fg/50"
                            : "border-danger-fg/50"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full ${
                            problem.difficulty == "easy" ? "bg-success-fg" : problem.difficulty == "medium" ? "bg-warning-fg" : "bg-danger-fg"
                          }`}
                        ></span>
                        <p
                          className={`text-xxs ${
                            problem.difficulty == "easy" ? "text-success-fg" : problem.difficulty == "medium" ? "text-warning-fg" : "text-danger-fg"
                          }`}
                        >
                          {problem.difficulty.length > 4 ? `${problem.difficulty.slice(0, 3)}.` : problem.difficulty}
                        </p>
                      </div>
                      <button className="problem-item-more text-fg-muted hover:text-fg-default" title="Add to favorites">
                        <Star size={14} />
                      </button>
                      <button className="problem-item-more">
                        <Ellipsis size={14} />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
      {/* <div className="problem-right_sidebar">
        <p>Top Companies</p>
        {filterData.tags &&
          filterData.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-fg-default font-normal items-center flex-wrap hover:text-fg-default inline-block cursor-pointer px-2 py-1 rounded-lg hover:bg-accent-subtle/20 border border-border-default m-1"
            >
              <p>{tag}</p>
            </span>
          ))}
      </div> */}
    </div>
  )
}

export default Problem
