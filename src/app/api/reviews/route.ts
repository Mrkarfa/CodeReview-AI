import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inngest } from "@/inngest/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/reviews - List user's reviews
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reviews = await prisma.review.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { results: true },
        },
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

// POST /api/reviews - Create a new review
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { repository, branch } = body;

    if (!repository || !branch) {
      return NextResponse.json(
        { error: "Repository and branch are required" },
        { status: 400 }
      );
    }

    // Get user's access token
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.accessToken) {
      return NextResponse.json(
        {
          error:
            "GitHub access token not found. Please reconnect your account.",
        },
        { status: 400 }
      );
    }

    // Create review in database
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        repository,
        branch,
        status: "pending",
      },
    });

    // Send event to Inngest for background processing
    await inngest.send({
      name: "review/requested",
      data: {
        reviewId: review.id,
        userId: session.user.id,
        repository,
        branch,
        accessToken: user.accessToken,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
