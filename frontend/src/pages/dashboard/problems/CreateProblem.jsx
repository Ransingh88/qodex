import { useState } from "react"
import Button from "@/components/button/Button"
import Input from "@/components/input/Input"
import { useAsyncHandler } from "@/hooks/useAsyncHandler"
import { createProblem } from "@/services/problem.service"
import Textarea from "@/components/input/Textarea"
import Dropdown from "@/components/input/Dropdown"

const LANGUAGES = ["JAVASCRIPT", "PYTHON", "JAVA", "C++", "C"]

const CreateProblem = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "EASY",
    tags: [],
    constraints: "",
  })

  // Object-based state (not arrays)
  const [examples, setExamples] = useState({})
  const [codeSnippets, setCodeSnippets] = useState({})
  const [referenceSolutions, setReferenceSolutions] = useState({})
  const [testcases, setTestcases] = useState([{ input: "", output: "" }])

  // Track selected languages
  const [selectedExampleLangs, setSelectedExampleLangs] = useState([])
  const [selectedSnippetLangs, setSelectedSnippetLangs] = useState([])
  const [selectedSolutionLangs, setSelectedSolutionLangs] = useState([])

  const { loading, run } = useAsyncHandler()

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTags = (e) => {
    const tags = e.target.value.split(",").map((t) => t.trim())
    setFormData((prev) => ({ ...prev, tags }))
  }

  // === Dynamic example handlers ===
  const addExampleLang = (lang) => {
    if (lang && !examples[lang]) {
      setExamples((prev) => ({
        ...prev,
        [lang]: { input: "", output: "", explanation: "" },
      }))
      setSelectedExampleLangs([...selectedExampleLangs, lang])
    }
  }

  const updateExample = (lang, field, value) => {
    setExamples((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }))
  }

  const removeExampleLang = (lang) => {
    const updated = { ...examples }
    delete updated[lang]
    setExamples(updated)
    setSelectedExampleLangs(selectedExampleLangs.filter((l) => l !== lang))
  }

  // === Code snippets handlers ===
  const addSnippetLang = (lang) => {
    if (lang && !codeSnippets[lang]) {
      setCodeSnippets((prev) => ({ ...prev, [lang]: "" }))
      setSelectedSnippetLangs([...selectedSnippetLangs, lang])
    }
  }

  const updateSnippet = (lang, value) => {
    setCodeSnippets((prev) => ({ ...prev, [lang]: value }))
  }

  const removeSnippetLang = (lang) => {
    const updated = { ...codeSnippets }
    delete updated[lang]
    setCodeSnippets(updated)
    setSelectedSnippetLangs(selectedSnippetLangs.filter((l) => l !== lang))
  }

  // === Reference solutions handlers ===
  const addSolutionLang = (lang) => {
    if (lang && !referenceSolutions[lang]) {
      setReferenceSolutions((prev) => ({ ...prev, [lang]: "" }))
      setSelectedSolutionLangs([...selectedSolutionLangs, lang])
    }
  }

  const updateSolution = (lang, value) => {
    setReferenceSolutions((prev) => ({ ...prev, [lang]: value }))
  }

  const removeSolutionLang = (lang) => {
    const updated = { ...referenceSolutions }
    delete updated[lang]
    setReferenceSolutions(updated)
    setSelectedSolutionLangs(selectedSolutionLangs.filter((l) => l !== lang))
  }

  // === Testcases ===
  const addTestcase = () => setTestcases([...testcases, { input: "", output: "" }])

  const updateTestcase = (index, field, value) => {
    const updated = [...testcases]
    updated[index][field] = value
    setTestcases(updated)
  }

  const removeTestcase = (index) => setTestcases(testcases.filter((_, i) => i !== index))

  // === Submit ===
  const handleSubmit = run(async () => {
    const payload = {
      ...formData,
      examples,
      testcases,
      codeSnippets,
      referenceSolutions,
    }
    const res = await createProblem(payload)
    return res
  })

  return (
    <div className="space-y-8 p-6">
      <div>
        <h5>Create Problem</h5>
      </div>
      {/* BASIC INFO */}
      <div className="bg-secondary text-secondary flex gap-8 rounded-xl p-8">
        <div className="flex flex-1 flex-col gap-4">
          <section className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block font-semibold">Title</label>
              <Input name="title" onChange={handleChange} />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Description</label>
              <Textarea name="description" onChange={handleChange} />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Difficulty</label>
              <Dropdown
                options={[
                  { value: "EASY", label: "EASY" },
                  { value: "MEDIUM", label: "MEDIUM" },
                  { value: "HARD", label: "HARD" },
                ]}
                name="difficulty"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Tags</label>
              <Input onChange={handleTags} />
            </div>

            <div>
              <label className="mb-1 block font-semibold">Constraints</label>
              <Textarea name="constraints" onChange={handleChange} />
            </div>
          </section>

          {/* === EXAMPLES === */}
          <section>
            <label className="mb-1 block font-semibold">Examples</label>
            <div
              className={`bg-primary ring-primary focus-within:ring-brand relative mb-2 flex w-full rounded-lg p-2 shadow-xs ring-1 transition-shadow duration-100 ease-linear ring-inset focus-within:ring-1`}
            >
              <select
                onChange={(e) => addExampleLang(e.target.value)}
                className="text-primary placeholder:text-placeholder autofill:text-primary [&>*]:bg-secondary [&>*]:text-primary [&>option:hover]:bg-brand [&>option:checked]:bg-brand m-0 w-full cursor-pointer bg-transparent text-sm ring-0 outline-hidden autofill:rounded-lg [&>*]:p-2 [&>option]:cursor-pointer"
              >
                <option value="">Add Language Example</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {Object.keys(examples).map((lang) => (
              <div key={lang} className="border-primary mb-4 rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <label className="font-semibold">{lang}</label>
                  <Button color="link-destructive" onClick={() => removeExampleLang(lang)}>
                    ✕ Remove
                  </Button>
                </div>
                <div className="flex flex-col gap-1">
                  {["input", "output", "explanation"].map((field) => (
                    <Input
                      key={field}
                      placeholder={field}
                      value={examples[lang][field]}
                      onChange={(e) => updateExample(lang, field, e.target.value)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className="flex flex-2 flex-col gap-4">
          {/* === TESTCASES === */}
          <section>
            <label className="mb-1 block font-semibold">Testcases</label>
            {testcases.map((tc, idx) => (
              <div key={idx} className="mb-2 flex items-center gap-2">
                <label className="font-semibold">{idx + 1}. </label>
                <Input placeholder="Input" value={tc.input} onChange={(e) => updateTestcase(idx, "input", e.target.value)} />
                <Input placeholder="Output" value={tc.output} onChange={(e) => updateTestcase(idx, "output", e.target.value)} />
                <Button color="tertiary-destructive" onClick={() => removeTestcase(idx)}>
                  ✕
                </Button>
              </div>
            ))}
            <Button color="secondary" onClick={addTestcase}>
              + Add Testcase
            </Button>
          </section>

          {/* === CODE SNIPPETS === */}
          <section>
            <label className="mb-1 block font-semibold">Code Snippets</label>
            <div
              className={`bg-primary ring-primary focus-within:ring-brand relative mb-2 flex w-full rounded-lg p-2 shadow-xs ring-1 transition-shadow duration-100 ease-linear ring-inset focus-within:ring-1`}
            >
              <select
                onChange={(e) => addSnippetLang(e.target.value)}
                className="text-primary placeholder:text-placeholder autofill:text-primary [&>*]:bg-secondary [&>*]:text-primary [&>option:hover]:bg-brand [&>option:checked]:bg-brand m-0 w-full cursor-pointer bg-transparent text-sm ring-0 outline-hidden autofill:rounded-lg [&>*]:p-2 [&>option]:cursor-pointer"
              >
                <option value="">Add Language Snippet</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {Object.keys(codeSnippets).map((lang) => (
              <div key={lang} className="border-primary mb-3 rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-semibold">{lang}</label>
                  <Button color="link-destructive" onClick={() => removeSnippetLang(lang)}>
                    ✕ Remove
                  </Button>
                </div>
                <Textarea placeholder={`${lang} code`} value={codeSnippets[lang]} onChange={(e) => updateSnippet(lang, e.target.value)} rows={5} />
              </div>
            ))}
          </section>

          {/* === REFERENCE SOLUTIONS === */}
          <section>
            <label className="mb-1 block font-semibold">Reference Solutions</label>
            <div
              className={`bg-primary ring-primary focus-within:ring-brand relative mb-2 flex w-full rounded-lg p-2 shadow-xs ring-1 transition-shadow duration-100 ease-linear ring-inset focus-within:ring-1`}
            >
              <select
                onChange={(e) => addSolutionLang(e.target.value)}
                className="text-primary placeholder:text-placeholder autofill:text-primary [&>*]:bg-secondary [&>*]:text-primary [&>option:hover]:bg-brand [&>option:checked]:bg-brand m-0 w-full cursor-pointer bg-transparent text-sm ring-0 outline-hidden autofill:rounded-lg [&>*]:p-2 [&>option]:cursor-pointer"
              >
                <option value="">Add Language Solution</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang}>{lang}</option>
                ))}
              </select>
            </div>

            {Object.keys(referenceSolutions).map((lang) => (
              <div key={lang} className="border-primary mb-3 rounded-lg border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-semibold">{lang}</label>
                  <Button color="link-destructive" onClick={() => removeSolutionLang(lang)}>
                    ✕ Remove
                  </Button>
                </div>
                <Textarea
                  placeholder={`${lang} solution`}
                  value={referenceSolutions[lang]}
                  onChange={(e) => updateSolution(lang, e.target.value)}
                  rows={5}
                />
              </div>
            ))}
          </section>
        </div>
      </div>
      <div>
        <Button loading={loading} onClick={handleSubmit}>
          {loading ? "Creating..." : "Create Problem"}
        </Button>
      </div>
    </div>
  )
}

export default CreateProblem
