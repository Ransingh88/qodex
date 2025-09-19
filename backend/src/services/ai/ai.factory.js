import OpenAIProvider from "./openai.provider.js"

const providers = {
  openai: OpenAIProvider,
}

const getAIProvider = () => {
  const providerName = process.env.AI_PROVIDER || "openai"
  const Provider = providers[providerName]

  if (!Provider) {
    throw new Error(`AI provider "${providerName}" is not supported.`)
  }
  return new Provider()
}

export { getAIProvider }
