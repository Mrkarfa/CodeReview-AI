import { Pinecone } from "@pinecone-database/pinecone";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { embed } from "ai";

// Check if Pinecone is configured
const isPineconeConfigured = !!process.env.PINECONE_API_KEY;

// Initialize Pinecone client (lazy initialization)
let pineconeClient: Pinecone | null = null;

function getPinecone() {
  if (!isPineconeConfigured) {
    console.warn("Pinecone API key not configured. RAG features disabled.");
    return null;
  }

  if (!pineconeClient) {
    pineconeClient = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  return pineconeClient;
}

// Initialize Gemini for embeddings
const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY || "dummy-key-for-build",
});

const INDEX_NAME = "codereview-guidelines";

// Get or create index
export async function getIndex() {
  const pinecone = getPinecone();
  if (!pinecone) return null;

  const indexes = await pinecone.listIndexes();
  const exists = indexes.indexes?.some((idx) => idx.name === INDEX_NAME);

  if (!exists) {
    // Create index if it doesn't exist
    await pinecone.createIndex({
      name: INDEX_NAME,
      dimension: 768, // Gemini embedding dimension
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
  }

  return pinecone.Index(INDEX_NAME);
}

// Generate embedding for text
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!process.env.GOOGLE_GEMINI_API_KEY) {
    return new Array(768).fill(0);
  }

  const { embedding } = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: text,
  });

  return embedding;
}

// Store a guideline in Pinecone
export async function storeGuideline(
  id: string,
  userId: string,
  title: string,
  content: string
): Promise<string> {
  const index = await getIndex();
  if (!index) return id;

  // Combine title and content for embedding
  const textToEmbed = `${title}: ${content}`;
  const embedding = await generateEmbedding(textToEmbed);

  // Upsert to Pinecone
  await index.upsert([
    {
      id,
      values: embedding,
      metadata: {
        userId,
        title,
        content,
      },
    },
  ]);

  return id;
}

// Delete a guideline from Pinecone
export async function deleteGuideline(id: string): Promise<void> {
  const index = await getIndex();
  if (!index) return;

  await index.deleteOne(id);
}

// Query relevant guidelines for a code review
export async function queryGuidelines(
  userId: string,
  codeContext: string,
  topK: number = 5
): Promise<Array<{ title: string; content: string; score: number }>> {
  const index = await getIndex();
  if (!index) return [];

  // Generate embedding for the code context
  const queryEmbedding = await generateEmbedding(codeContext);

  // Query Pinecone
  const results = await index.query({
    vector: queryEmbedding,
    topK,
    filter: {
      userId: { $eq: userId },
    },
    includeMetadata: true,
  });

  return results.matches.map((match) => ({
    title: (match.metadata?.title as string) || "",
    content: (match.metadata?.content as string) || "",
    score: match.score || 0,
  }));
}

// Get relevant guidelines as a formatted string for the AI
export async function getRelevantGuidelines(
  userId: string,
  codeContext: string
): Promise<string> {
  const guidelines = await queryGuidelines(userId, codeContext);

  if (guidelines.length === 0) {
    return "";
  }

  return guidelines.map((g) => `- ${g.title}: ${g.content}`).join("\n");
}
