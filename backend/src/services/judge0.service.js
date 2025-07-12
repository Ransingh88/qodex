import { judge0Axios } from "../config/axios.js"

export const getLanguageId = (language) => {
  const languageMap = {
    c: 50,
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63,
    ruby: 72,
    go: 60,
    csharp: 52,
    kotlin: 78,
    php: 56,
    swift: 73,
    typescript: 74,
    rust: 79,
    scala: 64,
    perl: 55,
    haskell: 57,
  }

  return languageMap[language.toLowerCase()] || null
}

export const getLanguageName = async (languageId) => {
  const languageMap = {
    62: "java",
    71: "python",
    63: "javascript",
  }

  return languageMap[languageId] || null
}

export const getLanguages = async () => {
  const response = await judge0Axios.get(`/languages`)
  return response.data
}

export const batchSubmit = async (submissions) => {
  const response = await judge0Axios.post(
    `/submissions/batch?base64_encoded=false`,
    { submissions }
  )
  return response.data
}

export const pollingBatchResults = async (tokens) => {
  while (true) {
    const response = await judge0Axios.get(`/submissions/batch`, {
      params: {
        tokens: tokens.join(","),
        base64_encoded: false,
      },
    })

    const isAllDone = response.data.submissions.every(
      (submission) => submission.status.id !== 1 && submission.status.id !== 2
    )

    if (isAllDone) {
      return response.data.submissions
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

export const submitCode = async (languageId, sourceCode, stdin) => {
  const response = await judge0Axios.post(`/submissions?base64_encoded=false`, {
    language_id: languageId,
    source_code: sourceCode,
    stdin,
  })
  return response.data
}

export const getSubmission = async (token) => {
  const response = await judge0Axios.get(`/submissions/${token}`)
  return response.data
}
