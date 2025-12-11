import { Octokit } from "@octokit/rest";

// Create an authenticated GitHub client
export function createGitHubClient(accessToken: string) {
  return new Octokit({
    auth: accessToken,
  });
}

// Get user's repositories
export async function getUserRepos(accessToken: string) {
  const octokit = createGitHubClient(accessToken);

  const { data } = await octokit.repos.listForAuthenticatedUser({
    sort: "updated",
    per_page: 100,
  });

  return data.map((repo) => ({
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    private: repo.private,
    language: repo.language,
    defaultBranch: repo.default_branch,
    updatedAt: repo.updated_at,
  }));
}

// Get branches for a repository
export async function getRepoBranches(
  accessToken: string,
  owner: string,
  repo: string
) {
  const octokit = createGitHubClient(accessToken);

  const { data } = await octokit.repos.listBranches({
    owner,
    repo,
    per_page: 100,
  });

  return data.map((branch) => ({
    name: branch.name,
    protected: branch.protected,
  }));
}

// Get files from a branch
export async function getBranchFiles(
  accessToken: string,
  owner: string,
  repo: string,
  branch: string,
  path: string = ""
) {
  const octokit = createGitHubClient(accessToken);

  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    ref: branch,
    path,
  });

  if (Array.isArray(data)) {
    const files: Array<{
      name: string;
      path: string;
      type: "file" | "dir";
      size: number;
    }> = [];

    for (const item of data) {
      if (item.type === "file") {
        files.push({
          name: item.name,
          path: item.path,
          type: "file",
          size: item.size,
        });
      } else if (item.type === "dir") {
        files.push({
          name: item.name,
          path: item.path,
          type: "dir",
          size: 0,
        });
      }
    }

    return files;
  }

  return [];
}

// Get file content
export async function getFileContent(
  accessToken: string,
  owner: string,
  repo: string,
  path: string,
  branch: string
) {
  const octokit = createGitHubClient(accessToken);

  const { data } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref: branch,
  });

  if (!Array.isArray(data) && data.type === "file") {
    // Decode base64 content
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return {
      name: data.name,
      path: data.path,
      content,
      size: data.size,
      sha: data.sha,
    };
  }

  return null;
}

// Get all code files recursively
export async function getAllCodeFiles(
  accessToken: string,
  owner: string,
  repo: string,
  branch: string,
  path: string = ""
): Promise<Array<{ path: string; content: string }>> {
  const files: Array<{ path: string; content: string }> = [];

  const items = await getBranchFiles(accessToken, owner, repo, branch, path);

  // File extensions to include
  const codeExtensions = [
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".py",
    ".go",
    ".rs",
    ".java",
    ".css",
    ".scss",
    ".html",
    ".json",
    ".yaml",
    ".yml",
    ".md",
    ".mdx",
  ];

  for (const item of items) {
    if (item.type === "file") {
      const hasCodeExtension = codeExtensions.some((ext) =>
        item.path.toLowerCase().endsWith(ext)
      );

      if (hasCodeExtension && item.size < 100000) {
        // Skip files > 100KB
        const fileContent = await getFileContent(
          accessToken,
          owner,
          repo,
          item.path,
          branch
        );
        if (fileContent) {
          files.push({
            path: fileContent.path,
            content: fileContent.content,
          });
        }
      }
    } else if (
      item.type === "dir" &&
      !item.name.startsWith(".") &&
      item.name !== "node_modules" &&
      item.name !== "dist" &&
      item.name !== "build"
    ) {
      // Recursively get files from subdirectories
      const subFiles = await getAllCodeFiles(
        accessToken,
        owner,
        repo,
        branch,
        item.path
      );
      files.push(...subFiles);
    }
  }

  return files;
}
