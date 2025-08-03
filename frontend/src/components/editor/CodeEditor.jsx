import Editor from "@monaco-editor/react"

const CodeEditor = ({ sourceCode }) => {
  return (
    <Editor
      // height="90%"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue={sourceCode}
      options={{ automaticLayout: true, padding: { top: 16, bottom: 16 } }}
      language="javascript"
    />
  )
}

export default CodeEditor
