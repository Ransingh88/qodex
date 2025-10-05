import OpenAI from "openai"

export default class OpenAIProvider {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generate(systemPrompt, prompt) {
    const response = await this.client.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      text: {
        format: { type: "json_object" },
      },
    })
    try {
      return response.output_text
    } catch (error) {
      console.error(error)
      throw new Error("Failed to generate response")
    }
  }
}
