import React, { useEffect, useState } from "react"
import "./problemDetails.css"
import { useParams } from "react-router"
import CodeEditor from "@/components/editor/CodeEditor"
import { getProblemDetails } from "@/services/problem.service"
import {
  BookText,
  Ellipsis,
  FileText,
  History,
  Lightbulb,
  PanelTopOpen,
  Pin,
  Play,
  SquareChartGantt,
  SquareCode,
  SquareDashedBottomCode,
  SquareTerminalIcon,
} from "lucide-react"

const ProblemDetails = () => {
  const [problemDetails, setProblemDetails] = useState({})
  const { id } = useParams()

  const [problemInfoTab, setProblemInfoTab] = useState([
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
      label: "Submitions",
      type: "submitions",
      icon: <Pin size={14} />,
    },
    {
      id: "tab4",
      label: "Hints",
      type: "hint",
      icon: <Lightbulb size={14} />,
    },
  ])
  const [editorTab, setEditorTab] = useState([
    {
      id: "tab1",
      label: "Code Editor",
      type: "code",
      language: "javascript",
      icon: <SquareCode size={14} />,
    },
    {
      id: "tab2",
      label: "Diff Editor",
      type: "diff",
      language: "javascript",
      icon: <SquareDashedBottomCode size={14} />,
    },
  ])
  const [outputTab, setOutputTab] = useState([
    {
      id: "tab1",
      label: "Testcase",
      type: "testcase",
      icon: <SquareChartGantt size={14} />,
    },
    {
      id: "tab2",
      label: "Console",
      type: "console",
      icon: <SquareTerminalIcon size={14} />,
    },
  ])

  const [activeProblemInfoTabId, setActiveProblemInfoTabId] = useState(
    problemInfoTab[0].id
  )
  const [activeEdiorTabId, setActiveEditorTabId] = useState(editorTab[0].id)
  const [activeOutputTabId, setActiveOutputTabId] = useState(outputTab[0].id)

  const activeProblemInfoTab = problemInfoTab.find(
    (tab) => tab.id === activeProblemInfoTabId
  )
  const activeEditorTab = editorTab.find((tab) => tab.id === activeEdiorTabId)
  const activeOutputTab = outputTab.find((tab) => tab.id === activeOutputTabId)

  const handleGetProblemDetails = async (problemId) => {
    const response = await getProblemDetails(problemId)
    setProblemDetails(response.data.data)
  }

  console.log(problemDetails, "ProblemDetails")
  useEffect(() => {
    handleGetProblemDetails(id)
  }, [id])
  return (
    <div className="p-1.5 h-[calc(100vh-3rem)] w-full flex flex-row justify-center items-start gap-1.5">
      <div className="h-full w-1/2 bg-[#1e1e1e] rounded-lg border border-border-default overflow-hidden">
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
        </div>
        {activeProblemInfoTab.type === "desc" && (
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3>{problemDetails.title} </h3>
              <div>
                <span
                  className={`text-xxs px-1.5 py-1 border rounded ${
                    problemDetails.difficulty === "easy"
                      ? "bg-success-subtle/50 border-success-emphasis"
                      : problemDetails.difficulty === "medium"
                      ? "bg-warning-subtle/50 border-warning-emphasis"
                      : "bg-danger-subtle/50 border-danger-emphasis"
                  }`}
                >
                  {problemDetails.difficulty}
                </span>
              </div>
            </div>
            <p className="mt-2 py-2">Problem Description</p>
            <div className="p-2 rounded h-full">
              <p>{problemDetails.description}</p>
              <div className="mt-2">
                <p>
                  Explanation:
                  <br /> {problemDetails?.examples?.JAVASCRIPT?.explanation}
                </p>
                <p>Input: {problemDetails?.examples?.JAVASCRIPT?.input}</p>
                <p>Output: {problemDetails?.examples?.JAVASCRIPT?.output}</p>
              </div>
            </div>
          </div>
        )}

        {activeProblemInfoTab.type === "solution" && <div>Solution</div>}
        {activeProblemInfoTab.type === "submitions" && <div>Submittion</div>}
        {activeProblemInfoTab.type === "hint" && <div>Hints</div>}
      </div>
      <div className="h-full w-1/2 rounded-lg flex flex-col justify-start items-start gap-1.5 ">
        {/* Editor */}
        <div className="h-2/3 w-full rounded-lg overflow-hidden flex flex-col bg-[#1e1e1e] border border-border-default">
          <div className="h-8 w-full flex justify-between items-center border-b border-border-default">
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
              <button className="px-2 py-1 rounded bg-accent-fg text-[#f8f8f8] flex justify-center items-center gap-0.5 hover:bg-accent-emphasis cursor-pointer">
                <Play size={14} />
                Run
              </button>
              <button>
                <Ellipsis size={14} />
              </button>
            </div>
          </div>
          <div className="flex-1">
            {activeEditorTab.type === "code" && (
              <CodeEditor
                sourceCode={problemDetails?.codeSnippets?.JAVASCRIPT}
              />
            )}
            {activeEditorTab.type === "diff" && <div>Diff Edior</div>}
          </div>
          <div className="px-1 py-1 text-xs border-t border-border-default flex justify-between items-center">
            <button className="flex items-center gap-1 px-2 p-1 rounded bg-basebg-surface2 cursor-pointer">
              <History size={14} />
              History
            </button>
            <p>Javascript</p>
          </div>
        </div>
        <div className="min-h-10 h-1/3  w-full rounded-lg bg-[#1e1e1e] border border-border-default overflow-hidden">
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
              {/* <button className="px-2 py-1 rounded bg-accent-fg text-[#f8f8f8] flex justify-center items-center gap-0.5 hover:bg-accent-emphasis cursor-pointer">
                <Play size={14} />
                Run
              </button> */}
              <button>
                <PanelTopOpen size={14} />
              </button>
              <button>
                <Ellipsis size={14} />
              </button>
            </div>
          </div>
          {activeOutputTab.type === "testcase" && (
            <div className="p-2">Test Cases</div>
          )}
          {activeOutputTab.type === "console" && (
            <div className="p-2">Console</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProblemDetails
