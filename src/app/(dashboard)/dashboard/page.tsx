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
  FileSearch,
  GitBranch,
  History,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

const stats = [
  {
    name: "Total Reviews",
    value: "148",
    change: "+12%",
    changeType: "positive",
    icon: FileSearch,
  },
  {
    name: "Connected Repos",
    value: "12",
    change: "+2",
    changeType: "positive",
    icon: GitBranch,
  },
  {
    name: "This Month",
    value: "34",
    change: "+8%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    name: "Avg. Review Time",
    value: "24s",
    change: "-15%",
    changeType: "positive",
    icon: Clock,
  },
];

const recentReviews = [
  {
    id: "1",
    repo: "frontend-app",
    branch: "feature/auth",
    status: "completed",
    issues: 3,
    reviewedAt: "2 hours ago",
  },
  {
    id: "2",
    repo: "api-service",
    branch: "main",
    status: "completed",
    issues: 0,
    reviewedAt: "5 hours ago",
  },
  {
    id: "3",
    repo: "mobile-app",
    branch: "develop",
    status: "in-progress",
    issues: null,
    reviewedAt: "Just now",
  },
  {
    id: "4",
    repo: "shared-utils",
    branch: "fix/validation",
    status: "completed",
    issues: 1,
    reviewedAt: "1 day ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      <Header title="Dashboard" description="Overview of your code reviews" />

      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="border-white/10 bg-white/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/20">
                    <stat.icon className="h-5 w-5 text-teal-400" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.name}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions & Recent Reviews */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common tasks to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-between bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                asChild
              >
                <Link href="/review">
                  Start New Review
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between border-white/10"
                asChild
              >
                <Link href="/history">
                  View History
                  <History className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between border-white/10"
                asChild
              >
                <Link href="/guidelines">
                  Manage Guidelines
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="border-white/10 bg-white/5 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Reviews</CardTitle>
                <CardDescription>
                  Your latest code review activity
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">View all</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <GitBranch className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{review.repo}</p>
                        <p className="text-sm text-muted-foreground">
                          {review.branch}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {review.status === "completed" ? (
                          <div className="flex items-center gap-2">
                            {review.issues === 0 ? (
                              <span className="flex items-center gap-1 text-sm text-green-400">
                                <CheckCircle className="h-4 w-4" />
                                No issues
                              </span>
                            ) : (
                              <span className="flex items-center gap-1 text-sm text-yellow-400">
                                <AlertCircle className="h-4 w-4" />
                                {review.issues} issues
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="flex items-center gap-1 text-sm text-teal-400">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
                            In progress
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {review.reviewedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
