import {
  Bookmark,
  BookText,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Clock,
  Cpu,
  Ellipsis,
  FileChartLine,
  FileText,
  History,
  Lightbulb,
  PanelBottomClose,
  PanelBottomOpen,
  PanelLeftClose,
  PanelLeftOpen,
  PanelTopClose,
  PanelTopOpen,
  Pin,
  Play,
  Sparkles,
  SquareChartGantt,
  SquareCode,
  SquareTerminalIcon,
} from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import "./problemDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { Link, useOutletContext, useParams } from "react-router"
import { toast } from "react-toastify"
import CodeEditor from "@/components/editor/CodeEditor"
import LoadingSpinner from "@/components/loaders/LoadingSpinner"
import { LANGUAGES } from "@/constants/constant"
import {
  fetchProblemDetails,
  executeProblems,
  executeProblemsStart,
  fetchProblemSubmissionsStart,
  fetchProblemSubmissions,
  fetchProblemDetailsStart,
} from "@/features/rtk/problem/problemSlice"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { useCodeEditor } from "@/hooks/useCodeEditor"
import { analyzeCodeComplexity } from "@/services/ai.servise"
import { executeCode } from "@/services/execution.service"
import { getProblemDetails, getProblemSubmissions } from "@/services/problem.service"
import Submission from "./submission/Submission"

const ProblemDetails = () => {
  const { id } = useParams()
  const { run, loading } = useAsyncHandler()
  const { registerSubmitHandler } = useOutletContext()
  const { changeLang, codes, currentLanguage, updateCode } = useCodeEditor()
  const [analysis, setAnalysis] = useState("")

  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { problemDetails, problemOutput, isLoading } = useSelector((state) => state.problem)

  const [isLeftOpen, setIsLeftOpen] = useState(true)
  const [isCodeOpen, setIsCodeOpen] = useState(true)
  const [isTestOpen, setIsTestOpen] = useState(true)

  const [problemInfoTab] = useState([
    {
      id: "tab1",
      label: "Description",
      type: "desc",
      icon: <FileText size={14} />,
    },
    {
      id: "tab2",
      label: "Solution",
      type: "solution",
      icon: <BookText size={14} />,
    },
    {
      id: "tab3",
      label: "Submissions",
      type: "submissions",
      icon: <Pin size={14} />,
    },
    {
      id: "tab4",
      label: "Hints",
      type: "hint",
      icon: <Lightbulb size={14} />,
    },
  ])
  const [editorTab] = useState([
    {
      id: "tab1",
      label: "Code Editor",
      type: "code",
      language: "javascript",
      icon: <SquareCode size={14} />,
    },
    // {
    //   id: "tab2",
    //   label: "Diff Editor",
    //   type: "diff",
    //   language: "javascript",
    //   icon: <SquareDashedBottomCode size={14} />,
    // },
  ])
  const [outputTab] = useState([
    {
      id: "tab1",
      label: "Testcase",
      type: "testcase",
      icon: <SquareChartGantt size={14} />,
    },
    {
      id: "tab2",
      label: "Test Results",
      type: "testresult",
      icon: <ClipboardCheck size={14} />,
    },
    {
      id: "tab3",
      label: "Complexity",
      type: "complexity",
      icon: <FileChartLine size={14} />,
    },
    {
      id: "tab4",
      label: "Console",
      type: "console",
      icon: <SquareTerminalIcon size={14} />,
    },
  ])

  const [activeProblemInfoTabId, setActiveProblemInfoTabId] = useState(problemInfoTab[0].id)
  const [activeEdiorTabId, setActiveEditorTabId] = useState(editorTab[0].id)
  const [activeOutputTabId, setActiveOutputTabId] = useState(outputTab[0].id)
  const [testcaseActiveTabId, setTestcaseActiveTabId] = useState(0)

  const activeProblemInfoTab = problemInfoTab.find((tab) => tab.id === activeProblemInfoTabId)
  const activeEditorTab = editorTab.find((tab) => tab.id === activeEdiorTabId)
  const activeOutputTab = outputTab.find((tab) => tab.id === activeOutputTabId)

  const handleGetProblemDetails = run(async (problemId) => {
    dispatch(fetchProblemDetailsStart())
    const response = await getProblemDetails(problemId)
    dispatch(fetchProblemDetails(response.data.data))
    // setProgramCode(response.data.data?.codeSnippets?.JAVASCRIPT || "")
  })

  const handleGetProblemSubmissions = run(async (problemId) => {
    dispatch(fetchProblemSubmissionsStart())
    const response = await getProblemSubmissions(problemId)
    dispatch(fetchProblemSubmissions(response.data.data))
  })

  const handleCodeExecution = run(async () => {
    const lang = LANGUAGES[currentLanguage]
    const payload = {
      languageId: lang.judge0ID,
      sourceCode: codes,
      stdInput: problemDetails?.testcases?.map((tc) => tc?.input),
      expectedOutput: problemDetails?.testcases?.map((tc) => tc?.output),
      problemId: problemDetails._id,
      isSubmit: false,
    }
    const response = await executeCode(payload)
    if (response.data.success) {
      toast.success(response.data.message)
    }
    dispatch(executeProblems(response.data.data))
    setActiveOutputTabId("tab2")
  })

  const runCodeAndSubmit = run(async () => {
    dispatch(executeProblemsStart())
    const lang = LANGUAGES[currentLanguage]
    const payload = {
      languageId: lang.judge0ID,
      sourceCode: codes,
      stdInput: problemDetails?.testcases?.map((tc) => tc?.input),
      expectedOutput: problemDetails?.testcases?.map((tc) => tc?.output),
      problemId: problemDetails._id,
      isSubmit: true,
    }
    const response = await executeCode(payload)
    if (response.data.success) {
      toast.success(response.data.message)
    }

    dispatch(executeProblems(response.data.data))
    setActiveOutputTabId("tab2")
    handleGetProblemSubmissions(id)
  })

  const handleCodeChange = (code) => {
    // setProgramCode(code)
    updateCode(code)
  }

  const handleAnalyzeCodeComplexity = run(async () => {
    const ress = await analyzeCodeComplexity(codes, currentLanguage, problemDetails.description)
    setAnalysis(ress.data)
    console.log(ress)
  })

  const rightOpenCount = (isCodeOpen ? 1 : 0) + (isTestOpen ? 1 : 0)

  const codeHeight = useMemo(() => {
    if (!isCodeOpen) return "h-0"
    return rightOpenCount === 2 ? "h-2/3" : "h-full"
  }, [isCodeOpen, rightOpenCount])

  const testHeight = useMemo(() => {
    if (!isTestOpen) return " h-0"
    return rightOpenCount === 2 ? "h-1/3" : "h-full"
  }, [isTestOpen, rightOpenCount])

  const toggleCode = () => {
    if (isCodeOpen && !isTestOpen) return
    setIsCodeOpen((v) => !v)
  }

  const toggleTests = () => {
    if (isTestOpen && !isCodeOpen) return
    setIsTestOpen((v) => !v)
  }

  useEffect(() => {
    handleGetProblemDetails(id)
    if (isAuthenticated) {
      handleGetProblemSubmissions(id)
    }
  }, [id])

  // Restore last layout
  useEffect(() => {
    const raw = localStorage.getItem("problemDetailLayout:v1")
    if (!raw) return
    try {
      if (raw) {
        const parsed = JSON.parse(raw)
        setIsLeftOpen(parsed.isLeftOpen ?? true)
        setIsCodeOpen(parsed.isCodeOpen ?? true)
        setIsTestOpen(parsed.isTestOpen ?? true)
      }
    } catch {
      // Handle error
    }
  }, [])

  // Persist layout changes
  useEffect(() => {
    localStorage.setItem(
      "problemDetailLayout:v1",
      JSON.stringify({
        isLeftOpen,
        isCodeOpen,
        isTestOpen,
      })
    )
  }, [isLeftOpen, isCodeOpen, isTestOpen])

  useEffect(() => {
    // register the handler when this component mounts
    registerSubmitHandler(() => runCodeAndSubmit(codes))
  }, [registerSubmitHandler, codes])

  return (
    <div className={`flex h-[calc(100vh-3rem)] w-full flex-row items-start justify-start p-1.5 ${isLeftOpen ? "gap-1.5" : ""}`}>
      {/* Left Pannel */}
      <div
        className={`h-full ${
          isLeftOpen ? "w-1/2 min-w-40" : "w-0 border-0"
        } border-border-default overflow-hidden rounded-lg border bg-[#1e1e1e] transition-all duration-200 ease-out`}
      >
        <div className="border-border-default flex h-8 w-full items-center justify-between border-b">
          <ul className="flex h-full items-center text-xs">
            {problemInfoTab.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveProblemInfoTabId(tab.id)}
                className={`flex h-full cursor-pointer items-center justify-center gap-1 px-2 ${
                  tab.id === activeProblemInfoTabId
                    ? "bg-basebg-surface2 border-accent-emphasis border-x border-t border-b-2 border-x-transparent border-t-transparent"
                    : "border-border-default border"
                }`}
              >
                {tab.icon}
                {tab.label}
              </li>
            ))}
          </ul>
          <div className="mx-2">
            <button onClick={() => setIsLeftOpen(false)} className="cursor-pointer">
              <PanelLeftClose size={14} />
            </button>
          </div>
        </div>
        {activeProblemInfoTab.type === "desc" && (
          <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">
            {isLoading ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="">{problemDetails.title} </h3>

                  <div className="flex items-center justify-center gap-1">
                    <span className="text-xxs border-border-default bg-basebg-surface2 text-fg-default/50 rounded border px-1 py-0.5 font-medium capitalize">
                      {problemDetails.tags && problemDetails?.tags[0]}
                    </span>
                    <span className="text-xxs border-border-default bg-basebg-surface2 text-fg-default/50 rounded border px-1 py-0.5 font-medium capitalize">
                      {problemDetails.tags && problemDetails?.tags[1]}
                    </span>
                    <span
                      className={`text-xxs rounded border px-1 py-0.5 font-medium capitalize opacity-70 ${
                        problemDetails.difficulty === "easy"
                          ? "bg-success-subtle/50 border-success-emphasis text-green-200"
                          : problemDetails.difficulty === "medium"
                            ? "bg-warning-subtle/50 border-warning-emphasis text-yellow-200"
                            : "bg-danger-subtle/50 border-danger-emphasis text-red-200"
                      }`}
                    >
                      {problemDetails?.difficulty}
                    </span>
                    <button className="cursor-pointer">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
                <span className="text-xxs border-border-default bg-basebg-surface2 text-fg-default/50 rounded border px-1 py-0.5 font-medium capitalize">
                  AskedBy:{" "}
                  {problemDetails.askedBy &&
                    problemDetails?.askedBy.map((org) => (
                      <span key={org} className="text-fg-default/80">
                        {org}
                      </span>
                    ))}
                </span>
                <h6 className="mt-2 py-2">Problem Description</h6>
                <div className="border-border-default font-body h-full overflow-auto rounded border p-2 text-sm">
                  <p className="text-fg-default/80 whitespace-pre-wrap">{problemDetails.description}</p>
                  {/* <p className="my-2 text-fg-default/80">
                Explanation: {problemDetails?.examples?.JAVASCRIPT?.explanation}
              </p> */}
                  <div className="divide-border-default border-border-default font-code my-6 flex flex-col divide-y rounded border px-4 py-1">
                    <p className="py-2">
                      <span className="block font-semibold">Input</span>{" "}
                      <span className="text-fg-default/80">{problemDetails?.examples?.JAVASCRIPT?.input}</span>
                    </p>
                    <p className="py-2">
                      <span className="block font-semibold">Output</span>
                      <span className="text-fg-default/80 pt-2">{problemDetails?.examples?.JAVASCRIPT?.output}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-basebg-surface font-code flex flex-col rounded px-4 py-2">
                      <p className="mb-2 font-semibold">Example 1</p>
                      <p>
                        <span className="text-fg-default/70 font-semibold">Input:</span> {problemDetails?.examples?.JAVASCRIPT?.input}
                      </p>
                      <span>
                        <p>
                          <span className="text-fg-default/70 font-semibold">Output:</span> {problemDetails?.examples?.JAVASCRIPT?.output}
                        </p>
                      </span>
                      <span>
                        <p>
                          <span className="text-fg-default/70 font-semibold">Explanation:</span> {problemDetails?.examples?.JAVASCRIPT?.explanation}
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="px-4">
                    <p className="py-2">
                      <span className="block font-semibold">Constraints</span>
                      <span className="text-fg-default/80 pt-2">{problemDetails?.constraints}</span>
                    </p>
                    <p className="py-2">
                      <span className="block font-semibold">Bonus</span>
                      <span className="text-fg-default/80 pt-2">{problemDetails?.bonus?.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeProblemInfoTab.type === "solution" && <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">Solution</div>}
        {activeProblemInfoTab.type === "submissions" && (
          <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">
            {isAuthenticated ? (
              <Submission />
            ) : (
              <div className="flex h-1/2 items-center justify-center">
                <Link to={"/auth/login"}>
                  <button className="bg-accent-fg hover:bg-accent-emphasis flex w-20 cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-[#f8f8f8]">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
        {activeProblemInfoTab.type === "hint" && <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">Hints</div>}
      </div>
      {/* Right Pannel */}
      <div className="flex h-full w-1/2 flex-1 flex-col items-start justify-start gap-1.5 rounded-lg">
        {/* Editor */}
        <div
          className={`min-h-8 ${codeHeight} border-border-default flex w-full flex-col overflow-hidden rounded-lg border bg-[#1e1e1e] transition-all duration-200 ease-out`}
        >
          <div className="border-border-default relative flex h-8 w-full items-center justify-between border-b">
            <ul className="flex h-full items-center text-xs">
              {editorTab.map((tab) => (
                <li
                  key={tab.id}
                  onClick={() => setActiveEditorTabId(tab.id)}
                  className={`flex h-full cursor-pointer items-center justify-center gap-1 px-2 ${
                    tab.id === activeEdiorTabId
                      ? "bg-basebg-surface2 border-accent-emphasis border-x border-t border-b-2 border-x-transparent border-t-transparent"
                      : "border-border-default border"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 px-2 text-xs">
              <div>
                <select
                  name="language"
                  id="language"
                  value={currentLanguage}
                  onChange={(e) => changeLang(e.target.value)}
                  className="border-border-default text-fg-default/80 rounded border bg-transparent px-1 py-0.5 text-xs outline-none"
                >
                  {Object.entries(LANGUAGES).map(([key, lang]) => (
                    <option key={key} value={key} className="bg-basebg-default">
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleCodeExecution}
                disabled={loading}
                className="bg-accent-fg hover:bg-accent-emphasis flex h-6 w-12 cursor-pointer items-center justify-center gap-0.5 rounded text-[#f8f8f8]"
              >
                {loading ? (
                  <LoadingSpinner size={14} />
                ) : (
                  <>
                    <Play size={14} /> Run
                  </>
                )}
              </button>
              {!isLeftOpen && (
                <button onClick={() => setIsLeftOpen(true)} className="cursor-pointer">
                  <PanelLeftOpen size={14} />
                </button>
              )}
              <button onClick={toggleCode}>{isCodeOpen ? <PanelTopClose size={14} /> : <PanelTopOpen size={14} />}</button>
              <button>
                <Ellipsis size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1">
            {activeEditorTab.type === "code" && isCodeOpen && (
              <CodeEditor
                sourceCode={problemDetails?.codeSnippets?.JAVASCRIPT}
                language={LANGUAGES[currentLanguage].monaco}
                onChange={handleCodeChange}
                value={codes}
              />
            )}
            {activeEditorTab.type === "diff" && <div>Diff Edior</div>}
          </div>
          {isCodeOpen && (
            <div className="border-border-default flex items-center justify-between border-t px-1 py-1 text-xs">
              <button className="bg-basebg-surface2 flex cursor-pointer items-center gap-1 rounded p-1 px-2">
                <History size={14} />
                History
              </button>
              <p>{LANGUAGES[currentLanguage].label}</p>
            </div>
          )}
        </div>
        {/* TestCases */}
        <div
          className={`min-h-8 ${testHeight} border-border-default w-full overflow-hidden rounded-lg border bg-[#1e1e1e] transition-all duration-200 ease-out`}
        >
          <div className="border-border-default flex h-8 w-full items-center justify-between border-b">
            <ul className="flex h-full items-center text-xs">
              {outputTab.map((tab) => (
                <li
                  key={tab.id}
                  onClick={() => setActiveOutputTabId(tab.id)}
                  className={`flex h-full cursor-pointer items-center justify-center gap-1 px-2 ${
                    tab.id === activeOutputTabId
                      ? "bg-basebg-surface2 border-accent-emphasis border-x border-t border-b-2 border-x-transparent border-t-transparent"
                      : "border-border-default border"
                  }`}
                >
                  {tab.icon} {tab.label}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 px-2 text-xs">
              <button onClick={toggleTests}>{isTestOpen ? <PanelBottomClose size={14} /> : <PanelBottomOpen size={14} />}</button>
              <button>
                <Ellipsis size={14} />
              </button>
            </div>
          </div>
          {activeOutputTab.type === "testcase" && (
            <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">
              <div className="p-2">
                <div className="flex justify-between gap-2">
                  <div className="flex gap-2 p-2">
                    {problemDetails?.testcases?.map((testcase, index) => (
                      <div
                        key={index}
                        className={`bg-basebg-surface2 hover:bg-basebg-surface cursor-pointer rounded px-2 py-1 text-xs ${
                          testcaseActiveTabId === index ? "border-accent-fg/50 border-s" : ""
                        } `}
                        onClick={() => setTestcaseActiveTabId(index)}
                      >
                        <p>Case {index + 1}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    {loading ? (
                      <div className="text-fg-muted flex items-center gap-2 text-xs">
                        <LoadingSpinner size={14} /> Running...{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col gap-2 p-1">
                  <div>
                    <p className="text-fg-muted font-semibold">Input</p>
                    <p className="bg-basebg-surface border-border-default mt-1 rounded border px-2 py-1.5">
                      {problemDetails.testcases && problemDetails?.testcases[testcaseActiveTabId]?.input}
                    </p>
                  </div>
                  <div>
                    <p className="text-fg-muted font-semibold">Output</p>
                    <p className="bg-basebg-surface border-border-default mt-1 rounded border px-2 py-1.5">
                      {problemDetails.testcases && problemDetails?.testcases[testcaseActiveTabId]?.output}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeOutputTab.type === "testresult" && (
            <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">
              <div className="h-full p-2">
                {problemOutput.status ? (
                  <>
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-2 p-2">
                        {problemOutput?.testCases?.map((testcase, index) => (
                          <div
                            key={index}
                            className={`bg-basebg-surface2 hover:bg-basebg-surface flex cursor-pointer items-center rounded px-2 py-1 text-xs ${
                              testcaseActiveTabId === index ? "border-accent-fg/50 border-s" : ""
                            }`}
                            onClick={() => setTestcaseActiveTabId(index)}
                          >
                            <span className={`mr-2 h-1 w-1 rounded-full ${testcase.isPassed ? "bg-success-fg" : "bg-danger-fg"}`}></span>
                            <p>Case {testcase.testcaseNo}</p>
                          </div>
                        ))}
                      </div>
                      <div
                        className={`font-semibold ${
                          problemOutput.status === "Accepted"
                            ? "text-success-fg"
                            : problemOutput.status === "Partially Accepted"
                              ? "text-warning-fg"
                              : "text-danger-fg"
                        }`}
                      >
                        {loading ? (
                          <div className="text-fg-muted flex items-center gap-2 text-xs">
                            <LoadingSpinner size={14} /> Running...{" "}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <p className="text-fg-muted flex items-center gap-1 text-xs">
                              <Clock size={12} /> {problemOutput?.time}
                            </p>
                            <p className="text-fg-muted flex items-center gap-1 text-xs">
                              <Cpu size={12} /> {problemOutput?.memory}
                            </p>
                            <p className="flex items-center gap-1">
                              {problemOutput?.status === "Accepted" ? <CircleCheck size={12} /> : <CircleX size={12} />} {problemOutput?.status}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="bg-basebg-surface border-border-default mx-2 rounded border px-2 py-1">
                      <div className="text-fg-muted flex gap-4 text-xs">
                        <p>Status: {problemOutput?.testCases[testcaseActiveTabId]?.status}</p>
                        <p>Memory: {problemOutput?.testCases[testcaseActiveTabId]?.memory} bit</p>
                        <p>Time: {problemOutput?.testCases[testcaseActiveTabId]?.time} ms</p>
                      </div>
                      <div className="mt-2 flex flex-col gap-1">
                        <p>Input: {problemOutput?.testCases[testcaseActiveTabId]?.stdin}</p>
                        <p>Output: {problemOutput?.testCases[testcaseActiveTabId]?.stdout}</p>
                        <p>Expected Output: {problemOutput?.testCases[testcaseActiveTabId]?.expectedOutput}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-fg-muted mt-5 flex items-center justify-center">Run test cases</div>
                )}
              </div>
            </div>
          )}
          {activeOutputTab.type === "complexity" && (
            <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">
              {problemDetails ? (
                <div className="p-2">
                  <p className="font-code text-sm">Time Complexity: {problemDetails?.complexity?.time || "Not Available"}</p>
                  <p className="font-code text-sm">Space Complexity: {problemDetails?.complexity?.space || "Not Available"}</p>
                  <button
                    onClick={handleAnalyzeCodeComplexity}
                    className="border-border-default hover:bg-basebg-surface flex cursor-pointer items-center gap-1 rounded border px-2 py-1"
                  >
                    <Sparkles size={14} />
                    Analyze
                  </button>
                  <p>{analysis.stringify}</p>
                </div>
              ) : (
                <div className="text-fg-muted mt-5 flex items-center justify-center">
                  <button
                    onClick={handleAnalyzeCodeComplexity}
                    className="border-border-default hover:bg-basebg-surface flex cursor-pointer items-center gap-1 rounded border px-2 py-1"
                  >
                    <Sparkles size={14} />
                    Analyze
                  </button>
                </div>
              )}
            </div>
          )}
          {activeOutputTab.type === "console" && (
            <div className="problemDetails_desc h-[calc(100%-2rem)] overflow-auto">
              {problemOutput.length > 0 ? (
                <div className="p-2">
                  <p className="font-code text-sm">
                    {problemOutput && problemOutput?.testCases[0]?.stdout?.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                  </p>
                  <p className="text-danger-fg font-code text-sm">{problemOutput && problemOutput?.testCases[0]?.status}</p>
                  <p className="text-danger-fg font-code text-sm">
                    {problemOutput && problemOutput?.testCases[0]?.stderr?.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                  </p>
                </div>
              ) : (
                <div className="text-fg-muted mt-5 flex items-center justify-center">Run code to see the console output</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProblemDetails
