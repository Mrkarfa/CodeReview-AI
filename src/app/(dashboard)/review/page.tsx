"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  Zap,
  Loader2,
  CheckCircle,
  FolderGit2,
  RefreshCw,
} from "lucide-react";
import { useRouter } from "next/navigation";

const mockRepos = [
  {
    id: "1",
    name: "frontend-app",
    fullName: "user/frontend-app",
    language: "TypeScript",
  },
  {
    id: "2",
    name: "api-service",
    fullName: "user/api-service",
    language: "Python",
  },
  {
    id: "3",
    name: "mobile-app",
    fullName: "user/mobile-app",
    language: "React Native",
  },
  {
    id: "4",
    name: "shared-utils",
    fullName: "user/shared-utils",
    language: "JavaScript",
  },
];

const mockBranches = [
  { name: "main", isDefault: true },
  { name: "develop", isDefault: false },
  { name: "feature/auth", isDefault: false },
  { name: "feature/dashboard", isDefault: false },
  { name: "fix/validation", isDefault: false },
];

export default function ReviewPage() {
  const [selectedRepo, setSelectedRepo] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const router = useRouter();

  const handleStartReview = async () => {
    if (!selectedRepo || !selectedBranch) return;

    setIsReviewing(true);
    // Simulate review process
    setTimeout(() => {
      router.push("/history/review-123");
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        title="Start Review"
        description="Select a repository and branch to review"
      />

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Repository Selection */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FolderGit2 className="h-5 w-5 text-teal-400" />
                Select Repository
              </CardTitle>
              <CardDescription>
                Choose a repository from your connected GitHub account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedRepo} onValueChange={setSelectedRepo}>
                <SelectTrigger className="w-full bg-white/5 border-white/10">
                  <SelectValue placeholder="Select a repository" />
                </SelectTrigger>
                <SelectContent>
                  {mockRepos.map((repo) => (
                    <SelectItem key={repo.id} value={repo.id}>
                      <div className="flex items-center gap-3">
                        <span>{repo.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {repo.language}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Branch Selection */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GitBranch className="h-5 w-5 text-teal-400" />
                Select Branch
              </CardTitle>
              <CardDescription>
                Choose the branch you want to review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedBranch}
                onValueChange={setSelectedBranch}
                disabled={!selectedRepo}
              >
                <SelectTrigger className="w-full bg-white/5 border-white/10">
                  <SelectValue
                    placeholder={
                      selectedRepo
                        ? "Select a branch"
                        : "Select a repository first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {mockBranches.map((branch) => (
                    <SelectItem key={branch.name} value={branch.name}>
                      <div className="flex items-center gap-3">
                        <span>{branch.name}</span>
                        {branch.isDefault && (
                          <Badge className="bg-teal-500/20 text-teal-400 text-xs">
                            default
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Review Info */}
          {selectedRepo && selectedBranch && !isReviewing && (
            <Card className="border-teal-500/20 bg-teal-500/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-teal-400" />
                  <div>
                    <p className="font-medium">Ready to review</p>
                    <p className="text-sm text-muted-foreground">
                      {mockRepos.find((r) => r.id === selectedRepo)?.name} /{" "}
                      {selectedBranch}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Review Progress */}
          {isReviewing && (
            <Card className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center text-center gap-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-teal-400 animate-spin" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Analyzing your code...</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our AI is reviewing your changes. This usually takes 20-30
                      seconds.
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mt-4">
                    <span className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      Fetching files
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                      AI Analysis
                    </span>
                    <span className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-white/20" />
                      Generating report
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Start Review Button */}
          <Button
            size="lg"
            className="w-full h-14 text-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 disabled:opacity-50"
            disabled={!selectedRepo || !selectedBranch || isReviewing}
            onClick={handleStartReview}
          >
            {isReviewing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Reviewing...
              </>
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Start AI Review
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
