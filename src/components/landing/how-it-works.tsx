import { GitBranch, Zap, FileCheck, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: GitBranch,
    title: "Connect Your Repository",
    description:
      "Sign in with GitHub and select the repositories you want to review. We only request read access to your code.",
  },
  {
    step: "02",
    icon: Zap,
    title: "Start a Review",
    description:
      "Choose a branch and click review. Our AI analyzes your code changes and compares them against best practices.",
  },
  {
    step: "03",
    icon: FileCheck,
    title: "Get Actionable Feedback",
    description:
      "Receive detailed comments on specific lines of code with suggestions for improvements and fixes.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm text-teal-300">
            How it works
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Get started in minutes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Three simple steps to supercharge your code review workflow.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-px bg-gradient-to-r from-teal-500/50 to-transparent -translate-x-1/2" />
              )}

              <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Step Number */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <span className="text-5xl font-bold text-white/10 lg:hidden">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-6">
                  <div className="flex items-center gap-3">
                    <span className="hidden lg:block text-sm font-medium text-teal-400">
                      Step {item.step}
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Preview */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-muted-foreground">
                CodeReview AI - Demo
              </span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-500/20">
                <Zap className="h-5 w-5 text-teal-400" />
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="font-medium">AI Review</span>
                  <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                    Completed
                  </span>
                </div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 p-3">
                    <div className="flex items-start gap-2">
                      <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-xs text-yellow-400">
                        Warning
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Line 45: Consider using{" "}
                        <code className="rounded bg-white/10 px-1">
                          useMemo
                        </code>{" "}
                        to prevent unnecessary re-renders.
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-3">
                    <div className="flex items-start gap-2">
                      <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-xs text-blue-400">
                        Suggestion
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Line 78: This async function could benefit from proper
                        error handling with try/catch.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
