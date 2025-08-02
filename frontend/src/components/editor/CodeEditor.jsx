import Editor from "@monaco-editor/react"

const CodeEditor = ({ sourceCode }) => {
  return (
    <div>
      <Editor
        height="90vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={sourceCode}
        options={{ automaticLayout: true }}
        language="javascript"
      />
    </div>
  )
}

export default CodeEditor
