import {
  Bookmark,
  BookText,
  CircleCheck,
  CircleX,
  ClipboardCheck,
  Clock,
  Cpu,
  Ellipsis,
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
  SquareChartGantt,
  SquareCode,
  SquareTerminalIcon,
} from "lucide-react"
import React, { useEffect, useMemo, useState } from "react"
import "./problemDetails.css"
import { useDispatch, useSelector } from "react-redux"
import { useOutletContext, useParams } from "react-router"
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
import { executeCode } from "@/services/execution.service"
import { getProblemDetails, getProblemSubmissions } from "@/services/problem.service"
import Submission from "./submission/Submission"

const ProblemDetails = () => {
  const { id } = useParams()
  const { run, loading } = useAsyncHandler()
  const { registerSubmitHandler } = useOutletContext()
  const { changeLang, codes, currentLanguage, updateCode } = useCodeEditor()

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

  const handleGetProblemDetails = async (problemId) => {
    dispatch(fetchProblemDetailsStart())
    const response = await getProblemDetails(problemId)
    dispatch(fetchProblemDetails(response.data.data))
    // setProgramCode(response.data.data?.codeSnippets?.JAVASCRIPT || "")
  }

  const handleGetProblemSubmissions = async (problemId) => {
    dispatch(fetchProblemSubmissionsStart())
    const response = await run(() => getProblemSubmissions(problemId))
    dispatch(fetchProblemSubmissions(response.data.data))
  }

  const handleCodeExecution = async () => {
    const lang = LANGUAGES[currentLanguage]
    const payload = {
      languageId: lang.judge0ID,
      sourceCode: codes,
      stdInput: problemDetails?.testcases?.map((tc) => tc?.input),
      expectedOutput: problemDetails?.testcases?.map((tc) => tc?.output),
      problemId: problemDetails._id,
      isSubmit: false,
    }
    const response = await run(() => executeCode(payload))
    if (response.data.success) {
      toast.success(response.data.message)
    }
    dispatch(executeProblems(response.data.data))
    setActiveOutputTabId("tab2")
  }

  const runCodeAndSubmit = async () => {
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
    const response = await run(() => executeCode(payload))
    if (response.data.success) {
      toast.success(response.data.message)
    }

    dispatch(executeProblems(response.data.data))
    setActiveOutputTabId("tab2")
    handleGetProblemSubmissions(id)
  }

  const handleCodeChange = (code) => {
    // setProgramCode(code)
    updateCode(code)
  }

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
    <div className={`p-1.5 h-[calc(100vh-3rem)] w-full flex flex-row justify-start items-start ${isLeftOpen ? "gap-1.5" : ""}`}>
      {/* Left Pannel */}
      <div
        className={`h-full ${
          isLeftOpen ? "min-w-40 w-1/2" : "w-0 border-0"
        } bg-[#1e1e1e] rounded-lg border border-border-default overflow-hidden transition-all duration-200 ease-out`}
      >
        <div className="h-8 w-full flex justify-between items-center border-b border-border-default">
          <ul className="flex h-full text-xs items-center">
            {problemInfoTab.map((tab) => (
              <li
                key={tab.id}
                onClick={() => setActiveProblemInfoTabId(tab.id)}
                className={`px-2 h-full flex justify-center items-center cursor-pointer gap-1 ${
                  tab.id === activeProblemInfoTabId
                    ? "bg-basebg-surface2 border-b-2 border-accent-emphasis border-t border-t-transparent border-x border-x-transparent"
                    : "border border-border-default"
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
          <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">
            {isLoading ? (
              <div>
                <LoadingSpinner />
              </div>
            ) : (
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="">{problemDetails.title} </h3>

                  <div className="flex justify-center items-center gap-1">
                    <span className="text-xxs px-1 py-0.5 border border-border-default rounded capitalize font-medium bg-basebg-surface2 text-fg-default/50">
                      {problemDetails.tags && problemDetails?.tags[0]}
                    </span>
                    <span className="text-xxs px-1 py-0.5 border border-border-default rounded capitalize font-medium bg-basebg-surface2 text-fg-default/50">
                      {problemDetails.tags && problemDetails?.tags[1]}
                    </span>
                    <span
                      className={`text-xxs px-1 py-0.5 border rounded capitalize font-medium opacity-70 ${
                        problemDetails.difficulty === "easy"
                          ? "bg-success-subtle/50 text-green-200 border-success-emphasis"
                          : problemDetails.difficulty === "medium"
                          ? "bg-warning-subtle/50 text-yellow-200 border-warning-emphasis"
                          : "bg-danger-subtle/50 text-red-200 border-danger-emphasis"
                      }`}
                    >
                      {problemDetails?.difficulty}
                    </span>
                    <button className="cursor-pointer">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
                <span className="text-xxs px-1 py-0.5 border border-border-default rounded capitalize font-medium bg-basebg-surface2 text-fg-default/50">
                  AskedBy:{" "}
                  {problemDetails.askedBy &&
                    problemDetails?.askedBy.map((org) => (
                      <span key={org} className="text-fg-default/80">
                        {org}
                      </span>
                    ))}
                </span>
                <h6 className="mt-2 py-2">Problem Description</h6>
                <div className="p-2 rounded h-full border border-border-default overflow-auto text-sm font-body">
                  <p className="whitespace-pre-wrap text-fg-default/80">{problemDetails.description}</p>
                  {/* <p className="my-2 text-fg-default/80">
                Explanation: {problemDetails?.examples?.JAVASCRIPT?.explanation}
              </p> */}
                  <div className="my-6 border divide-y divide-border-default flex flex-col border-border-default rounded py-1 px-4 font-code">
                    <p className="py-2">
                      <span className="font-semibold block">Input</span>{" "}
                      <span className="text-fg-default/80">{problemDetails?.examples?.JAVASCRIPT?.input}</span>
                    </p>
                    <p className="py-2">
                      <span className="font-semibold block">Output</span>
                      <span className="pt-2 text-fg-default/80">{problemDetails?.examples?.JAVASCRIPT?.output}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col px-4 py-2 bg-basebg-surface rounded font-code">
                      <p className="font-semibold mb-2">Example 1</p>
                      <p>
                        <span className="font-semibold text-fg-default/70">Input:</span>{" "}
                        {problemDetails?.examples?.JAVASCRIPT?.input}
                      </p>
                      <span>
                        <p>
                          <span className="font-semibold text-fg-default/70">Output:</span>{" "}
                          {problemDetails?.examples?.JAVASCRIPT?.output}
                        </p>
                      </span>
                      <span>
                        <p>
                          <span className="font-semibold text-fg-default/70">Explanation:</span>{" "}
                          {problemDetails?.examples?.JAVASCRIPT?.explanation}
                        </p>
                      </span>
                    </div>
                  </div>
                  <div className="px-4">
                    <p className="py-2">
                      <span className="font-semibold block">Constraints</span>
                      <span className="pt-2 text-fg-default/80">{problemDetails?.constraints}</span>
                    </p>
                    <p className="py-2">
                      <span className="font-semibold block">Bonus</span>
                      <span className="pt-2 text-fg-default/80">{problemDetails?.bonus?.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeProblemInfoTab.type === "solution" && (
          <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">Solution</div>
        )}
        {activeProblemInfoTab.type === "submissions" && (
          <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">
            <Submission />
          </div>
        )}
        {activeProblemInfoTab.type === "hint" && (
          <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">Hints</div>
        )}
      </div>
      {/* Right Pannel */}
      <div className="h-full w-1/2 rounded-lg flex-1 flex flex-col justify-start items-start gap-1.5 ">
        {/* Editor */}
        <div
          className={`min-h-8 ${codeHeight} w-full rounded-lg overflow-hidden flex flex-col bg-[#1e1e1e] border border-border-default transition-all duration-200 ease-out`}
        >
          <div className="h-8 w-full flex justify-between items-center border-b border-border-default relative">
            <ul className="flex h-full text-xs items-center">
              {editorTab.map((tab) => (
                <li
                  key={tab.id}
                  onClick={() => setActiveEditorTabId(tab.id)}
                  className={`px-2 h-full flex justify-center items-center cursor-pointer gap-1 ${
                    tab.id === activeEdiorTabId
                      ? "bg-basebg-surface2 border-b-2 border-accent-emphasis border-t border-t-transparent border-x border-x-transparent"
                      : "border border-border-default"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </li>
              ))}
            </ul>
            <div className="px-2 flex items-center gap-2 text-xs">
              <div>
                <select
                  name="language"
                  id="language"
                  value={currentLanguage}
                  onChange={(e) => changeLang(e.target.value)}
                  className="bg-transparent outline-none border border-border-default text-fg-default/80 text-xs rounded px-1 py-0.5"
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
                className=" h-6 w-12 rounded bg-accent-fg text-[#f8f8f8] flex justify-center items-center gap-0.5 hover:bg-accent-emphasis cursor-pointer"
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
            <div className="px-1 py-1 text-xs border-t border-border-default flex justify-between items-center">
              <button className="flex items-center gap-1 px-2 p-1 rounded bg-basebg-surface2 cursor-pointer">
                <History size={14} />
                History
              </button>
              <p>{LANGUAGES[currentLanguage].label}</p>
            </div>
          )}
        </div>
        {/* TestCases */}
        <div
          className={`min-h-8 ${testHeight} w-full rounded-lg bg-[#1e1e1e] border border-border-default overflow-hidden transition-all duration-200 ease-out`}
        >
          <div className="h-8 w-full flex justify-between items-center border-b border-border-default">
            <ul className="flex h-full text-xs items-center">
              {outputTab.map((tab) => (
                <li
                  key={tab.id}
                  onClick={() => setActiveOutputTabId(tab.id)}
                  className={`px-2 h-full flex justify-center items-center cursor-pointer gap-1 ${
                    tab.id === activeOutputTabId
                      ? "bg-basebg-surface2 border-b-2 border-accent-emphasis border-t border-t-transparent border-x border-x-transparent"
                      : "border border-border-default"
                  }`}
                >
                  {tab.icon} {tab.label}
                </li>
              ))}
            </ul>
            <div className="px-2 flex items-center gap-2 text-xs">
              <button onClick={toggleTests}>{isTestOpen ? <PanelBottomClose size={14} /> : <PanelBottomOpen size={14} />}</button>
              <button>
                <Ellipsis size={14} />
              </button>
            </div>
          </div>
          {activeOutputTab.type === "testcase" && (
            <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">
              <div className="p-2">
                <div className="flex justify-between gap-2">
                  <div className="flex gap-2 p-2">
                    {problemDetails?.testcases?.map((testcase, index) => (
                      <div
                        key={index}
                        className={`px-2 py-1 bg-basebg-surface2 rounded text-xs cursor-pointer hover:bg-basebg-surface ${
                          testcaseActiveTabId === index ? "border-s border-accent-fg/50 " : ""
                        } `}
                        onClick={() => setTestcaseActiveTabId(index)}
                      >
                        <p>Case {index + 1}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    {loading ? (
                      <div className="flex items-center gap-2 text-fg-muted text-xs">
                        <LoadingSpinner size={14} /> Running...{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="p-1 flex flex-col gap-2">
                  <div>
                    <p className="font-semibold text-fg-muted">Input</p>
                    <p className="py-1.5 px-2 mt-1 bg-basebg-surface border border-border-default rounded">
                      {problemDetails.testcases && problemDetails?.testcases[testcaseActiveTabId]?.input}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-fg-muted">Output</p>
                    <p className="py-1.5 px-2 mt-1 bg-basebg-surface border border-border-default rounded">
                      {problemDetails.testcases && problemDetails?.testcases[testcaseActiveTabId]?.output}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeOutputTab.type === "testresult" && (
            <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">
              <div className="p-2 h-full">
                {problemOutput.status ? (
                  <>
                    <div className="flex justify-between gap-2">
                      <div className="flex gap-2 p-2">
                        {problemOutput?.testCases?.map((testcase, index) => (
                          <div
                            key={index}
                            className={`px-2 py-1 bg-basebg-surface2 rounded text-xs cursor-pointer hover:bg-basebg-surface flex items-center ${
                              testcaseActiveTabId === index ? "border-s border-accent-fg/50" : ""
                            }`}
                            onClick={() => setTestcaseActiveTabId(index)}
                          >
                            <span
                              className={`h-1 w-1 rounded-full mr-2 ${testcase.isPassed ? "bg-success-fg" : "bg-danger-fg"}`}
                            ></span>
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
                          <div className="flex items-center gap-2 text-fg-muted text-xs">
                            <LoadingSpinner size={14} /> Running...{" "}
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <p className="text-fg-muted text-xs flex items-center gap-1">
                              <Clock size={12} /> {problemOutput?.time}
                            </p>
                            <p className="text-fg-muted text-xs flex items-center gap-1">
                              <Cpu size={12} /> {problemOutput?.memory}
                            </p>
                            <p className="flex items-center gap-1">
                              {problemOutput?.status === "Accepted" ? <CircleCheck size={12} /> : <CircleX size={12} />}{" "}
                              {problemOutput?.status}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mx-2 py-1 px-2 bg-basebg-surface rounded border border-border-default">
                      <div className="flex gap-4 text-xs text-fg-muted">
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
                  <div className="mt-5 text-fg-muted flex justify-center items-center">Run test cases</div>
                )}
              </div>
            </div>
          )}
          {activeOutputTab.type === "console" && (
            <div className="h-[calc(100%-2rem)] overflow-auto problemDetails_desc">
              <div className="p-2">
                <p className=" text-sm font-code">
                  {problemOutput &&
                    problemOutput?.testCases[0]?.stdout?.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                </p>
                <p className="text-danger-fg text-sm font-code">{problemOutput && problemOutput?.testCases[0]?.status}</p>
                <p className="text-danger-fg text-sm font-code">
                  {problemOutput &&
                    problemOutput?.testCases[0]?.stderr?.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProblemDetails
