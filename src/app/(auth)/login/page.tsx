"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Zap, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    // Simulate login - in production this would call Better Auth
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="w-full max-w-md px-4">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600 to-teal-700">
              <Zap className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription className="text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Button
            className="w-full h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-foreground"
            onClick={handleGitHubLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                <span>Connecting...</span>
              </div>
            ) : (
              <>
                <Github className="mr-2 h-5 w-5" />
                Continue with GitHub
              </>
            )}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link href="#" className="underline hover:text-foreground">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline hover:text-foreground">
                Privacy Policy
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Features reminder */}
      <div className="mt-8 flex flex-col gap-3">
        {[
          "AI-powered code reviews in seconds",
          "Seamless GitHub integration",
          "Custom coding guidelines",
        ].map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
