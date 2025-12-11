"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Building2, Rocket } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    description: "Perfect for trying out CodeReview AI",
    price: "$0",
    period: "forever",
    icon: Zap,
    features: [
      "5 reviews per month",
      "1 connected repository",
      "Basic AI analysis",
      "Community support",
      "7-day history",
    ],
    cta: "Get Started",
    href: "/login",
    popular: false,
  },
  {
    name: "Pro",
    description: "For developers who ship fast",
    price: "$19",
    period: "per month",
    icon: Rocket,
    features: [
      "Unlimited reviews",
      "Unlimited repositories",
      "Advanced AI analysis",
      "Custom guidelines (RAG)",
      "Priority support",
      "30-day history",
      "Team collaboration",
    ],
    cta: "Start Free Trial",
    href: "/login",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For teams with advanced needs",
    price: "Custom",
    period: "contact us",
    icon: Building2,
    features: [
      "Everything in Pro",
      "Self-hosted option",
      "SSO & SAML",
      "Audit logs",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    href: "/login",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/20 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-teal-500/50 text-teal-400"
          >
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Simple, transparent{" "}
            <span className="bg-gradient-to-r from-teal-400 to-teal-300 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include a 14-day
            free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg hover:shadow-teal-500/10 ${
                plan.popular
                  ? "border-teal-500/50 scale-105 md:scale-110"
                  : ""
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-teal-600 to-teal-700 text-white border-0 px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8 pt-8">
                <div className="flex justify-center mb-4">
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                      plan.popular
                        ? "bg-gradient-to-br from-teal-600 to-teal-700"
                        : "bg-white/10"
                    }`}
                  >
                    <plan.icon
                      className={`h-6 w-6 ${
                        plan.popular ? "text-white" : "text-teal-400"
                      }`}
                    />
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">
                    /{plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features list */}
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-teal-400" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
                      : "bg-white/10 hover:bg-white/20"
                  }`}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Have questions?{" "}
            <Link
              href="#"
              className="text-teal-400 hover:text-teal-300 underline underline-offset-4"
            >
              Check our FAQ
            </Link>{" "}
            or{" "}
            <Link
              href="#"
              className="text-teal-400 hover:text-teal-300 underline underline-offset-4"
            >
              contact us
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
