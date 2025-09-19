import OpenAI from "openai"

export default class OpenAIProvider {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async generate(prompt) {
    const response = await this.client.responses.create({
      model: "gpt-4o",
      input: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })
    try {
      return response.output_text
    } catch (error) {
      throw new Error("Failed to generate response")
    }
  }
}
