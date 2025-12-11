import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { storeGuideline, deleteGuideline } from "@/lib/pinecone";
import { headers } from "next/headers";

// GET /api/guidelines - List user's guidelines
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const guidelines = await prisma.guideline.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(guidelines);
  } catch (error) {
    console.error("Error fetching guidelines:", error);
    return NextResponse.json(
      { error: "Failed to fetch guidelines" },
      { status: 500 }
    );
  }
}

// POST /api/guidelines - Create a new guideline
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // Create guideline in database
    const guideline = await prisma.guideline.create({
      data: {
        userId: session.user.id,
        title,
        content,
      },
    });

    // Store in Pinecone for RAG (non-blocking)
    try {
      await storeGuideline(guideline.id, session.user.id, title, content);
      await prisma.guideline.update({
        where: { id: guideline.id },
        data: { embeddingId: guideline.id },
      });
    } catch (pineconeError) {
      console.error("Error storing in Pinecone:", pineconeError);
      // Continue without Pinecone storage
    }

    return NextResponse.json(guideline, { status: 201 });
  } catch (error) {
    console.error("Error creating guideline:", error);
    return NextResponse.json(
      { error: "Failed to create guideline" },
      { status: 500 }
    );
  }
}

// DELETE /api/guidelines - Delete a guideline
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Guideline ID is required" },
        { status: 400 }
      );
    }

    // Verify ownership
    const guideline = await prisma.guideline.findUnique({
      where: { id },
    });

    if (!guideline || guideline.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Guideline not found" },
        { status: 404 }
      );
    }

    // Delete from Pinecone
    if (guideline.embeddingId) {
      try {
        await deleteGuideline(guideline.embeddingId);
      } catch (pineconeError) {
        console.error("Error deleting from Pinecone:", pineconeError);
      }
    }

    // Delete from database
    await prisma.guideline.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting guideline:", error);
    return NextResponse.json(
      { error: "Failed to delete guideline" },
      { status: 500 }
    );
  }
}
