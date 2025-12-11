import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getRepoBranches } from "@/lib/github";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// GET /api/github/branches?repo=owner/repo - List branches for a repository
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const repo = searchParams.get("repo");

    if (!repo) {
      return NextResponse.json(
        { error: "Repository is required" },
        { status: 400 }
      );
    }

    const [owner, repoName] = repo.split("/");
    if (!owner || !repoName) {
      return NextResponse.json(
        { error: "Invalid repository format. Use owner/repo" },
        { status: 400 }
      );
    }

    // Get user's access token
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user?.accessToken) {
      return NextResponse.json(
        { error: "GitHub not connected. Please reconnect your account." },
        { status: 400 }
      );
    }

    const branches = await getRepoBranches(user.accessToken, owner, repoName);
    return NextResponse.json(branches);
  } catch (error) {
    console.error("Error fetching branches:", error);
    return NextResponse.json(
      { error: "Failed to fetch branches" },
      { status: 500 }
    );
  }
}
