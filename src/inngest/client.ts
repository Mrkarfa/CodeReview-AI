import { Inngest } from "inngest";

// Create Inngest client
export const inngest = new Inngest({
  id: "codereview-ai",
  eventKey: process.env.INNGEST_EVENT_KEY,
});

// Event types
export interface ReviewRequestedEvent {
  name: "review/requested";
  data: {
    reviewId: string;
    userId: string;
    repository: string;
    branch: string;
    accessToken: string;
  };
}

export interface ReviewCompletedEvent {
  name: "review/completed";
  data: {
    reviewId: string;
    userId: string;
    issuesCount: number;
    filesReviewed: number;
  };
}

export type Events = ReviewRequestedEvent | ReviewCompletedEvent;
