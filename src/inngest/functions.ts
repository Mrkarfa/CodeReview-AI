import { inngest } from "./client";
import { prisma } from "@/lib/prisma";
import { getAllCodeFiles } from "@/lib/github";
import { reviewFiles, generateReviewSummary } from "@/lib/gemini";
import { getRelevantGuidelines } from "@/lib/pinecone";

// Process code review function
export const processReview = inngest.createFunction(
  {
    id: "process-code-review",
    retries: 3,
  },
  { event: "review/requested" },
  async ({ event, step }) => {
    const { reviewId, userId, repository, branch, accessToken } = event.data;

    // Step 1: Update review status to processing
    await step.run("update-status-processing", async () => {
      await prisma.review.update({
        where: { id: reviewId },
        data: {
          status: "processing",
          startedAt: new Date(),
        },
      });
    });

    // Step 2: Fetch files from GitHub
    const files = await step.run("fetch-files", async () => {
      const [owner, repo] = repository.split("/");
      const codeFiles = await getAllCodeFiles(accessToken, owner, repo, branch);
      return codeFiles;
    });

    // Step 3: Get relevant guidelines
    const guidelines = await step.run("get-guidelines", async () => {
      // Use first few files as context
      const sampleCode = files
        .slice(0, 3)
        .map((f) => f.content)
        .join("\n")
        .slice(0, 2000);
      const relevantGuidelines = await getRelevantGuidelines(
        userId,
        sampleCode
      );
      return relevantGuidelines;
    });

    // Step 4: Review files with Gemini AI
    const reviewResults = await step.run("review-files", async () => {
      const results = await reviewFiles(files, guidelines || undefined);
      return results;
    });

    // Step 5: Store results in database
    await step.run("store-results", async () => {
      // Create review results
      if (reviewResults.length > 0) {
        await prisma.reviewResult.createMany({
          data: reviewResults.map((result) => ({
            reviewId,
            filePath: result.filePath,
            lineNumber: result.lineNumber,
            endLine: result.endLine,
            type: result.type,
            message: result.message,
            suggestion: result.suggestion,
            codeSnippet: result.codeSnippet,
          })),
        });
      }

      // Update review status
      await prisma.review.update({
        where: { id: reviewId },
        data: {
          status: "completed",
          filesReviewed: files.length,
          issuesFound: reviewResults.length,
          completedAt: new Date(),
        },
      });
    });

    // Step 6: Send completion event
    await step.sendEvent("send-completion", {
      name: "review/completed",
      data: {
        reviewId,
        userId,
        issuesCount: reviewResults.length,
        filesReviewed: files.length,
      },
    });

    const summary = await generateReviewSummary(reviewResults, files.length);

    return {
      success: true,
      filesReviewed: files.length,
      issuesFound: reviewResults.length,
      summary,
    };
  }
);

// Handle failed reviews
export const handleFailedReview = inngest.createFunction(
  { id: "handle-failed-review" },
  { event: "inngest/function.failed" },
  async ({ event }) => {
    const originalEvent = event.data.event;

    if (originalEvent.name === "review/requested") {
      const { reviewId } = originalEvent.data;

      // Update review status to failed
      await prisma.review.update({
        where: { id: reviewId },
        data: {
          status: "failed",
          completedAt: new Date(),
        },
      });
    }
  }
);
