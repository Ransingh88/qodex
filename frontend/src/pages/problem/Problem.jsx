import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  EllipsisVertical,
  Funnel,
  FunnelX,
  SquarePen,
  Star,
  Trash2,
} from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import "./problem.css"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, useLocation, useNavigate } from "react-router"
import { Badge } from "@/components/badge/Badge"
import Button from "@/components/button/Button"
import Checkbox from "@/components/input/Checkbox"
import Input from "@/components/input/Input"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import Modal from "@/components/modal/Modal"
import AddPlaylistModal from "@/components/playlist/AddPlaylistModal"
import FilterPopover from "@/components/popover/FilterPopover"
import {
  addSelectedProblem,
  clearProblemDetails,
  clearSelectedProblems,
  fetchProblems,
  removeSelectedProblem,
} from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import {
  deleteProblem,
  getAllProblems,
  getProblemCategory,
  getProblemCompanies,
  getProblemDifficulties,
  getProblemTags,
} from "@/services/problem.service"

const Problem = ({ showAddPlaylist = true, showSolvedCheck = true, showFevorite = true, showActionBtns = false }) => {
  const { run, loading } = useAsyncHandler()
  const { problems, selectedProblems } = useSelector((state) => state.problem)
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  const [filters, setFilters] = useState()
  const [filterData, setFilterData] = useState({})
  const [searchText, setSearchText] = useState("")
  // const [isSortOpen, setIsSortOpen] = useState(false)
  const [sortOrder, setSortOrder] = useState("asc")
  const [sortBy, setSortBy] = useState("createdAt")
  const [problemDeleteId, setProblemDeleteId] = useState(null)

  const [isAddPlaylistModalOpen, setIsAddPlaylistModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const navigate = useNavigate()

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

  const getAllProblem = run(async (filter) => {
    const response = await getAllProblems(filter)
    dispatch(fetchProblems(response.data.data.allProblems))
  })

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
    setFilters({
      ...filters,
      order: sortOrder === "asc" ? "desc" : "asc",
      sortBy: sortBy,
    })
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const handleToggleProblem = (problemId) => {
    if (selectedProblems.includes(problemId)) {
      dispatch(removeSelectedProblem(problemId))
    } else {
      dispatch(addSelectedProblem(problemId))
    }
  }

  const handleDeleteProblem = run(async (problemId) => {
    await deleteProblem(problemId)
    setIsDeleteModalOpen(false)
    getAllProblem(filters)
  })

  useEffect(() => {
    fetchFilters()
  }, [])

  useEffect(() => {
    console.log(location.pathname)
    getAllProblem(filters)
    dispatch(clearProblemDetails())
  }, [filters, dispatch])

  const mainCheckboxRef = useRef(null)

  useEffect(() => {
    if (mainCheckboxRef.current) {
      mainCheckboxRef.current.indeterminate = selectedProblems.length > 0 && selectedProblems.length < problems.length
    }
  }, [selectedProblems, problems.length])

  return (
    <div className="problem-container">
      <div className="problem-content">
        <div className="problem-courses">
          <div className="bg-primary text-primary border-primary flex h-36 w-72 items-center justify-center rounded-lg border">Problems</div>
          <div className="bg-primary text-primary border-primary flex h-36 w-72 items-center justify-center rounded-lg border">Contests</div>
          <div className="bg-primary text-primary border-primary flex h-36 w-72 items-center justify-center rounded-lg border">Solutions</div>
        </div>
        <div className="border-primary mb-4 flex items-center justify-between border-b py-4">
          <h2 className="flex gap-2">Problems {selectedProblems.length > 0 && <Badge className="mt-1">{selectedProblems.length} selected</Badge>}</h2>
          <div className="flex w-1/4 items-center justify-end gap-2">
            <div className="flex items-center gap-2">
              {filters && (
                <Button color="secondary" onClick={() => setFilters()}>
                  <span className="flex items-center gap-2">
                    <FunnelX size={14} /> Clear Filters
                  </span>
                </Button>
              )}
              {selectedProblems.length > 1 && (
                <Button
                  color="secondary"
                  onClick={() => {
                    setIsAddPlaylistModalOpen(true)
                  }}
                >
                  Add to Playlist
                </Button>
              )}
            </div>
            <Input placeholder="Search problem" className="w-64" value={searchText} onChange={handleSearch} />
            <FilterPopover icon={<ArrowDownUp size={14} title="Sort Problems" />}>
              <div className="w-64">
                <div className="border-border-default m-1 rounded-xl border px-3 py-4 text-center shadow">
                  <p className="font-semibold">Sort By</p>
                </div>
                <div className="flex flex-col gap-2 p-2">
                  {sortOptions.map((option, index) => (
                    <div
                      key={index}
                      className={` ${
                        sortBy === option.value ? "bg-accent-fg/70" : "hover:bg-accent-subtle"
                      } text-fg-default flex cursor-pointer items-center justify-between gap-4 rounded-lg px-2 py-2`}
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
                          className={`hover:bg-accent-subtle cursor-pointer rounded-full p-0.5`}
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
                <div className="border-border-default m-1 rounded-xl border px-3 py-4 text-center shadow">
                  <p className="font-semibold">Filter</p>
                </div>
                <div className="flex w-64 flex-col gap-2 p-2">
                  <div className="border-border-default flex flex-col gap-2 border-b p-2">
                    <p>Difficulty</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {filterData.difficulties &&
                        filterData.difficulties.map((difficulty, i) => (
                          <div
                            key={i}
                            className="bg-basebg-surface2 border-border-default text-fg-muted hover:bg-accent-emphasis hover:text-fg-default cursor-pointer rounded-lg border px-2 py-1"
                            onClick={() => setFilters({ ...filters, difficulty })}
                          >
                            {difficulty}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-2">
                    <p>Category</p>
                    <div className="flex flex-wrap items-center gap-2">
                      {filterData.categories &&
                        filterData.categories.map((category, i) => (
                          <div
                            key={i}
                            className="bg-basebg-surface2 border-border-default text-fg-muted hover:bg-accent-emphasis hover:text-fg-default cursor-pointer rounded-lg border px-2 py-1"
                            onClick={() => setFilters({ ...filters, category })}
                          >
                            {category}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-center gap-2 p-2">
                    <button className="border-border-muted text-fg-default hover:bg-accent-subtle flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border py-2 text-sm">
                      Reset
                    </button>
                    <button className="bg-accent-fg hover:bg-accent-emphasis flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-[#f8f8f8]">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </FilterPopover>
          </div>
        </div>
        <div className="">
          <div className="border-secondary mb-4 flex items-center justify-between rounded-xl border p-0.5">
            <div className="flex flex-wrap gap-1 font-semibold">
              {filterData?.tags?.map((menu, index) => (
                <Button color="tertiary" key={index} className="bg-secondary text-sm">
                  {menu}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="problem-list">
          {loading ? (
            <div>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {/* Main checkbox for select all/deselect all */}
              <div className="mb-2 flex items-center">
                {/* <input
                  ref={mainCheckboxRef}
                  type="checkbox"
                  className="accent-accent-fg border-border-default mr-3 h-4 w-4 rounded border"
                  checked={problems.length > 0 && selectedProblems.length === problems.length}
                  onChange={() => {
                    if (selectedProblems.length === problems.length) {
                      dispatch(clearSelectedProblems())
                    } else {
                      dispatch(addSelectedProblem(problems.map((p) => p._id)))
                    }
                  }}
                  title="Select all problems"
                /> */}
                <Checkbox
                  label="Select All"
                  indeterminate={selectedProblems.length > 0 && selectedProblems.length < problems.length}
                  checked={problems.length > 0 && selectedProblems.length === problems.length}
                  onChange={() => {
                    if (selectedProblems.length === problems.length) {
                      dispatch(clearSelectedProblems())
                    } else {
                      dispatch(addSelectedProblem(problems.map((p) => p._id)))
                    }
                  }}
                />
              </div>
              {problems.map((problem, index) => (
                <div key={problem._id} className="flex items-center gap-2">
                  {/* Checkbox for bulk/single add to playlist */}
                  {/* <input
                    type="checkbox"
                    className="accent-accent-fg border-primary mr-3 h-3 w-2.5 rounded border hover:cursor-pointer"
                    checked={selectedProblems.includes(problem._id)}
                    onChange={() => handleToggleProblem(problem._id)}
                    title="Select for playlist"
                  /> */}
                  <Checkbox checked={selectedProblems.includes(problem._id)} onChange={() => handleToggleProblem(problem._id)} />
                  <Link to={`${location.pathname}/${problem._id}`} className="flex-1">
                    <div className="problem-item">
                      <div className="problem-item-left">
                        {isAuthenticated && showSolvedCheck && (
                          <span className={`problem-item-check`}>{problem.solvedBy.includes(user._id) ? <Check size={14} /> : ""}</span>
                        )}
                        <p className="problem-item-index">{index + 1}.</p>
                        <p className="problem-item-title">{problem.title}</p>
                      </div>
                      <div className="problem-item-right">
                        <Badge
                          withDot={true}
                          dotColor={problem.difficulty == "easy" ? "success" : problem.difficulty == "medium" ? "warning" : "error"}
                        >
                          {problem.difficulty == "easy" ? "Easy" : problem.difficulty == "medium" ? "Med." : "Hard"}
                        </Badge>

                        {showFevorite && (
                          <button className="problem-item-more text-fg-muted hover:text-fg-default" title="Add to favorites">
                            <Star size={14} />
                          </button>
                        )}
                        {showActionBtns && (
                          <>
                            <button
                              className="problem-item-more"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                navigate(`${problem._id}`)
                              }}
                            >
                              <SquarePen size={14} />
                            </button>
                            <button
                              className="problem-item-more hover:text-error-primary_hover"
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setProblemDeleteId(problem._id)
                                setIsDeleteModalOpen(true)
                              }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}
                        <button className="problem-item-more">
                          <EllipsisVertical
                            size={14}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                            }}
                          />
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <AddPlaylistModal isOpen={isAddPlaylistModalOpen} onClose={() => setIsAddPlaylistModalOpen(false)} />
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
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Are you sure you want to delete this problem?"
        subtitle="This action cannot be undone."
        size="md"
        modalIconColor="error"
        modalIcon={<Trash2 />}
        iconPosition="center"
      >
        <div className="mt-4 flex w-full justify-center gap-4">
          <Button color="secondary" onClick={() => setIsDeleteModalOpen(false)} size="sm" width="full">
            Cancel
          </Button>
          <Button
            color="primary-destructive"
            size="sm"
            width="full"
            loading={loading}
            onClick={() => {
              handleDeleteProblem(problemDeleteId)
            }}
          >
            {loading ? "Deleting" : "Delete"}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default Problem
