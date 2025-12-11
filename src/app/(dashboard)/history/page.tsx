import { Header } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GitBranch,
  CheckCircle,
  AlertCircle,
  Clock,
  ExternalLink,
  Filter,
} from "lucide-react";
import Link from "next/link";

const reviews = [
  {
    id: "review-1",
    repo: "frontend-app",
    branch: "feature/auth",
    status: "completed",
    issuesCount: 3,
    filesReviewed: 12,
    reviewedAt: "2024-12-11T10:30:00",
  },
  {
    id: "review-2",
    repo: "api-service",
    branch: "main",
    status: "completed",
    issuesCount: 0,
    filesReviewed: 8,
    reviewedAt: "2024-12-11T08:15:00",
  },
  {
    id: "review-3",
    repo: "frontend-app",
    branch: "develop",
    status: "completed",
    issuesCount: 7,
    filesReviewed: 24,
    reviewedAt: "2024-12-10T16:45:00",
  },
  {
    id: "review-4",
    repo: "mobile-app",
    branch: "feature/dashboard",
    status: "completed",
    issuesCount: 2,
    filesReviewed: 6,
    reviewedAt: "2024-12-10T14:20:00",
  },
  {
    id: "review-5",
    repo: "shared-utils",
    branch: "fix/validation",
    status: "completed",
    issuesCount: 1,
    filesReviewed: 3,
    reviewedAt: "2024-12-09T11:00:00",
  },
  {
    id: "review-6",
    repo: "api-service",
    branch: "feature/payments",
    status: "failed",
    issuesCount: 0,
    filesReviewed: 0,
    reviewedAt: "2024-12-09T09:30:00",
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusBadge(status: string, issuesCount: number) {
  if (status === "failed") {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertCircle className="h-3 w-3" />
        Failed
      </Badge>
    );
  }
  if (issuesCount === 0) {
    return (
      <Badge className="gap-1 bg-green-500/20 text-green-400 hover:bg-green-500/30">
        <CheckCircle className="h-3 w-3" />
        No issues
      </Badge>
    );
  }
  return (
    <Badge className="gap-1 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">
      <AlertCircle className="h-3 w-3" />
      {issuesCount} issues
    </Badge>
  );
}

export default function HistoryPage() {
  return (
    <div className="flex flex-col h-full">
      <Header
        title="Review History"
        description="View all your past code reviews"
      />

      <div className="flex-1 p-6 overflow-auto">
        <Card className="border-white/10 bg-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">All Reviews</CardTitle>
            <Button variant="outline" size="sm" className="border-white/10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Repository</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Files</TableHead>
                  <TableHead>Reviewed At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow
                    key={review.id}
                    className="border-white/10 hover:bg-white/5"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{review.repo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="rounded bg-white/10 px-2 py-1 text-sm">
                        {review.branch}
                      </code>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(review.status, review.issuesCount)}
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground">
                        {review.filesReviewed} files
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {formatDate(review.reviewedAt)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/history/${review.id}`}>
                          View
                          <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
