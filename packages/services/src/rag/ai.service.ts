import { ReviewInput } from "@abhimanyu/contracts"
import { generateText } from "ai"

import { system_prompt } from "./prompts"

class AIService {
  private readonly SYSTEM_PROMPT = system_prompt
  private readonly REVIEW_MODEL = "openrouter/free"

  private buildRepoContext(repoContext: string[]): string {
    if (!repoContext) return ""
    return `
    Related code from the repository (for context only, not part of the change):
    ${repoContext.join("\n\n--\n\n")}
    `
  }

  private getPrompt(input: ReviewInput): string {
    return `Repository: ${input.repoFullName}
    Pull request title: ${input.title}
    CodeChanges: 
      ${input.prContext.join("\n\n--\n\n")}
      ${this.buildRepoContext(input.codebaseContext)}
    `
  }

  public async generateReview(input: ReviewInput): Promise<string> {
    const { text } = await generateText({
      model: this.REVIEW_MODEL,
      system: this.SYSTEM_PROMPT,
      prompt: this.getPrompt(input),
    })

    return text
  }
}

export const aiService = new AIService()
