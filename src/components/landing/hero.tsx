import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 via-background to-teal-900/30" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-teal-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-teal-700/20 blur-3xl" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-teal-400" />
          <span className="text-muted-foreground">Powered by Gemini AI</span>
        </div>

        {/* Main Heading */}
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Ship faster with</span>
          <span className="block bg-gradient-to-r from-teal-400 via-teal-300 to-teal-400 bg-clip-text text-transparent">
            AI-powered code reviews
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Automate code reviews and merge with confidence. Get intelligent
          feedback on your pull requests, catch bugs early, and ship quality
          code faster.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 min-w-[200px] bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-base"
            asChild
          >
            <Link href="/login">
              <Github className="mr-2 h-5 w-5" />
              Connect GitHub
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 min-w-[200px] border-white/20 text-base hover:bg-white/5"
            asChild
          >
            <Link href="#how-it-works">
              See how it works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "50K+", label: "Reviews completed" },
            { value: "2.5K+", label: "Active users" },
            { value: "99.9%", label: "Uptime" },
            { value: "<30s", label: "Avg review time" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <span className="text-3xl font-bold text-foreground sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
