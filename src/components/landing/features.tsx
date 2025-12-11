import {
  Zap,
  GitBranch,
  Shield,
  Clock,
  FileCode,
  Users,
  CheckCircle2,
  Bot,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Analysis",
    description:
      "Advanced Gemini AI analyzes your code for bugs, security issues, and best practices.",
  },
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description:
      "Seamlessly connect your repositories and review any branch with one click.",
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "Identify potential security vulnerabilities before they reach production.",
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description:
      "Get comprehensive code reviews in under 30 seconds, not hours.",
  },
  {
    icon: FileCode,
    title: "Multi-Language Support",
    description:
      "Support for JavaScript, TypeScript, Python, Go, Rust, and more.",
  },
  {
    icon: Settings,
    title: "Custom Guidelines",
    description:
      "Define your own coding standards and let AI enforce them consistently.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-1.5 text-sm text-teal-400">
            <Zap className="h-4 w-4" />
            Features
          </div>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for better code
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Our AI-powered platform provides comprehensive code analysis to help
            you ship quality code faster.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-teal-500/30 hover:bg-white/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-600/20 to-teal-700/20 ring-1 ring-white/10">
                <feature.icon className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>No credit card required</span>
            <span className="mx-2">•</span>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Free tier available</span>
            <span className="mx-2">•</span>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
