"use client";

import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  GitBranch,
  Clock,
  FileCode,
  AlertTriangle,
  Info,
  Lightbulb,
  CheckCircle,
  Copy,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock review data
const reviewData = {
  id: "review-123",
  repo: "frontend-app",
  branch: "feature/auth",
  status: "completed",
  filesReviewed: 5,
  totalIssues: 4,
  reviewedAt: "2024-12-11T10:30:00",
  files: [
    {
      name: "src/components/LoginForm.tsx",
      issues: [
        {
          id: 1,
          type: "warning",
          line: 45,
          message:
            "Consider using `useMemo` here to prevent unnecessary re-renders when the form state changes.",
          suggestion:
            "Wrap the computed value with useMemo(() => computeValue(), [dependencies])",
        },
        {
          id: 2,
          type: "suggestion",
          line: 67,
          message:
            "This async function lacks proper error handling. Consider adding a try/catch block.",
          suggestion:
            "try { await loginUser() } catch (error) { handleError(error) }",
        },
      ],
      code: `const handleSubmit = async (data: FormData) => {
  setLoading(true);
  const result = await loginUser(data);
  if (result.success) {
    router.push('/dashboard');
  }
  setLoading(false);
};`,
    },
    {
      name: "src/lib/auth.ts",
      issues: [
        {
          id: 3,
          type: "error",
          line: 23,
          message:
            "Potential security vulnerability: storing tokens in localStorage is not recommended for sensitive applications.",
          suggestion:
            "Consider using httpOnly cookies for token storage instead.",
        },
      ],
      code: `export function saveToken(token: string) {
  localStorage.setItem('auth_token', token);
}`,
    },
    {
      name: "src/utils/validation.ts",
      issues: [
        {
          id: 4,
          type: "info",
          line: 12,
          message:
            "This regex could be simplified using a named character class.",
          suggestion: "Use /^[\\p{L}]+$/u for Unicode letter matching",
        },
      ],
      code: `const nameRegex = /^[a-zA-Z]+$/;`,
    },
    {
      name: "src/hooks/useAuth.ts",
      issues: [],
      code: "",
    },
    {
      name: "src/types/auth.ts",
      issues: [],
      code: "",
    },
  ],
};

function getIssueIcon(type: string) {
  switch (type) {
    case "error":
      return <AlertTriangle className="h-4 w-4 text-red-400" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
    case "suggestion":
      return <Lightbulb className="h-4 w-4 text-blue-400" />;
    case "info":
      return <Info className="h-4 w-4 text-muted-foreground" />;
    default:
      return <Info className="h-4 w-4" />;
  }
}

function getIssueBadge(type: string) {
  switch (type) {
    case "error":
      return <Badge variant="destructive">Error</Badge>;
    case "warning":
      return (
        <Badge className="bg-yellow-500/20 text-yellow-400">Warning</Badge>
      );
    case "suggestion":
      return <Badge className="bg-blue-500/20 text-blue-400">Suggestion</Badge>;
    case "info":
      return <Badge variant="outline">Info</Badge>;
    default:
      return <Badge variant="outline">{type}</Badge>;
  }
}

export default function ReviewDetailPage() {
  const [expandedFiles, setExpandedFiles] = useState<string[]>(
    reviewData.files.filter((f) => f.issues.length > 0).map((f) => f.name)
  );

  const toggleFile = (fileName: string) => {
    setExpandedFiles((prev) =>
      prev.includes(fileName)
        ? prev.filter((f) => f !== fileName)
        : [...prev, fileName]
    );
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Review Results"
        description={`${reviewData.repo} / ${reviewData.branch}`}
      />

      <div className="flex-1 p-6 overflow-auto space-y-6">
        {/* Back Button */}
        <Button variant="ghost" size="sm" asChild>
          <Link href="/history">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to History
          </Link>
        </Button>

        {/* Summary Card */}
        <Card className="border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-teal-400" />
                <div>
                  <p className="font-medium">{reviewData.repo}</p>
                  <p className="text-sm text-muted-foreground">
                    {reviewData.branch}
                  </p>
                </div>
              </div>
              <Separator
                orientation="vertical"
                className="h-10 bg-white/10 hidden sm:block"
              />
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {reviewData.filesReviewed} files reviewed
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-10 bg-white/10 hidden sm:block"
              />
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span className="text-sm">
                  {reviewData.totalIssues} issues found
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="h-10 bg-white/10 hidden sm:block"
              />
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {new Date(reviewData.reviewedAt).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files with Issues */}
        <div className="space-y-4">
          {reviewData.files.map((file) => (
            <Card
              key={file.name}
              className="border-white/10 bg-white/5 overflow-hidden"
            >
              <button
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors"
                onClick={() => toggleFile(file.name)}
              >
                <div className="flex items-center gap-3">
                  {expandedFiles.includes(file.name) ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <FileCode className="h-4 w-4 text-teal-400" />
                  <span className="font-mono text-sm">{file.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {file.issues.length === 0 ? (
                    <Badge className="bg-green-500/20 text-green-400">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      No issues
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-500/20 text-yellow-400">
                      {file.issues.length} issues
                    </Badge>
                  )}
                </div>
              </button>

              {expandedFiles.includes(file.name) && file.issues.length > 0 && (
                <div className="border-t border-white/10">
                  {file.issues.map((issue, idx) => (
                    <div key={issue.id}>
                      {idx > 0 && <Separator className="bg-white/10" />}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-3">
                            {getIssueIcon(issue.type)}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                {getIssueBadge(issue.type)}
                                <span className="text-xs text-muted-foreground">
                                  Line {issue.line}
                                </span>
                              </div>
                              <p className="text-sm">{issue.message}</p>
                            </div>
                          </div>
                        </div>

                        {issue.suggestion && (
                          <div className="ml-7 rounded-lg bg-white/5 p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-medium text-muted-foreground">
                                Suggested fix
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2"
                              >
                                <Copy className="h-3 w-3 mr-1" />
                                Copy
                              </Button>
                            </div>
                            <code className="text-xs text-teal-300 block whitespace-pre-wrap">
                              {issue.suggestion}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
