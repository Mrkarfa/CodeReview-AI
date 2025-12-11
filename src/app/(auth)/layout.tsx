import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - CodeReview AI",
  description: "Sign in to your CodeReview AI account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 via-background to-teal-900/30" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-teal-600/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-teal-700/10 blur-3xl" />
      </div>
      {children}
    </div>
  );
}
