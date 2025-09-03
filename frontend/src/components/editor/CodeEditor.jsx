import Editor from "@monaco-editor/react"

const CodeEditor = ({ sourceCode, onChange, selectedLanguage, value }) => {
  return (
    sourceCode && (
      <Editor
        // height="90%"
        onChange={onChange}
        value={value}
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={sourceCode}
        options={{ automaticLayout: true, padding: { top: 16, bottom: 16 } }}
        language={selectedLanguage}
      />
    )
  )
}

export default CodeEditor
