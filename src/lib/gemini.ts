import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

// Check if Gemini is configured
const isGeminiConfigured = !!process.env.GOOGLE_GEMINI_API_KEY;

// Initialize Gemini client (lazy to avoid errors during build)
function getGoogleAI() {
  if (!isGeminiConfigured) {
    console.warn("Gemini API key not configured. AI review features disabled.");
    return null;
  }

  return createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
  });
}

// Interface for code review results
export interface CodeReviewResult {
  filePath: string;
  lineNumber: number;
  endLine?: number;
  type: "error" | "warning" | "suggestion" | "info";
  message: string;
  suggestion?: string;
  codeSnippet?: string;
}

// System prompt for code review
const CODE_REVIEW_SYSTEM_PROMPT = `You are an expert code reviewer. Analyze the provided code and identify:
1. Bugs and potential errors
2. Security vulnerabilities
3. Performance issues
4. Code quality and best practices violations
5. Readability and maintainability concerns

For each issue found, provide:
- The exact line number(s)
- Issue type (error, warning, suggestion, info)
- A clear explanation of the problem
- A specific suggestion for how to fix it

Be specific and actionable in your feedback. Focus on significant issues, not minor style preferences.

Respond in JSON format with an array of issues.`;

// Review a single file
export async function reviewFile(
  filePath: string,
  content: string,
  customGuidelines?: string
): Promise<CodeReviewResult[]> {
  const google = getGoogleAI();

  // If Gemini is not configured, return empty results
  if (!google) {
    return [];
  }

  const systemPrompt = customGuidelines
    ? `${CODE_REVIEW_SYSTEM_PROMPT}\n\nAdditional guidelines to consider:\n${customGuidelines}`
    : CODE_REVIEW_SYSTEM_PROMPT;

  const userPrompt = `Review the following code file:

File: ${filePath}

\`\`\`
${content}
\`\`\`

Analyze this code and return issues in the following JSON format:
{
  "issues": [
    {
      "lineNumber": <number>,
      "endLine": <number or null>,
      "type": "error" | "warning" | "suggestion" | "info",
      "message": "<clear explanation>",
      "suggestion": "<specific fix>",
      "codeSnippet": "<relevant code>"
    }
  ]
}

If no significant issues are found, return: { "issues": [] }`;

  try {
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: systemPrompt,
      prompt: userPrompt,
    });

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("Failed to parse AI response:", text);
      return [];
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const issues = parsed.issues || [];

    return issues.map((issue: Record<string, unknown>) => ({
      filePath,
      lineNumber: issue.lineNumber as number,
      endLine: (issue.endLine as number) || undefined,
      type: (issue.type as CodeReviewResult["type"]) || "info",
      message: issue.message as string,
      suggestion: issue.suggestion as string | undefined,
      codeSnippet: issue.codeSnippet as string | undefined,
    }));
  } catch (error) {
    console.error("Error reviewing file:", filePath, error);
    return [];
  }
}

// Review multiple files
export async function reviewFiles(
  files: Array<{ path: string; content: string }>,
  customGuidelines?: string
): Promise<CodeReviewResult[]> {
  const allResults: CodeReviewResult[] = [];

  // Process files in batches to avoid rate limits
  const batchSize = 5;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);

    const batchResults = await Promise.all(
      batch.map((file) => reviewFile(file.path, file.content, customGuidelines))
    );

    allResults.push(...batchResults.flat());
  }

  return allResults;
}

// Generate a summary of the review
export async function generateReviewSummary(
  issues: CodeReviewResult[],
  filesReviewed: number
): Promise<string> {
  if (issues.length === 0) {
    return `Reviewed ${filesReviewed} files. No significant issues found. Great job!`;
  }

  const errorCount = issues.filter((i) => i.type === "error").length;
  const warningCount = issues.filter((i) => i.type === "warning").length;
  const suggestionCount = issues.filter((i) => i.type === "suggestion").length;
  const infoCount = issues.filter((i) => i.type === "info").length;

  const parts = [];
  if (errorCount > 0)
    parts.push(`${errorCount} error${errorCount > 1 ? "s" : ""}`);
  if (warningCount > 0)
    parts.push(`${warningCount} warning${warningCount > 1 ? "s" : ""}`);
  if (suggestionCount > 0)
    parts.push(
      `${suggestionCount} suggestion${suggestionCount > 1 ? "s" : ""}`
    );
  if (infoCount > 0)
    parts.push(`${infoCount} info item${infoCount > 1 ? "s" : ""}`);

  return `Reviewed ${filesReviewed} files. Found ${parts.join(", ")}.`;
}
