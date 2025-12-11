import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserRepos } from "@/lib/github";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

// GET /api/github/repos - List user's GitHub repositories
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const repos = await getUserRepos(user.accessToken);
    return NextResponse.json(repos);
  } catch (error) {
    console.error("Error fetching repos:", error);
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
