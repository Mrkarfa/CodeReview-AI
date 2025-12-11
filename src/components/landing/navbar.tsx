"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github, Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "https://github.com", label: "Docs", external: true },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 transition-transform duration-300 group-hover:scale-110">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              CodeReview AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                className="relative px-4 py-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground group"
              >
                {/* Background hover effect */}
                <span className="absolute inset-0 rounded-lg bg-white/0 transition-all duration-300 ease-out group-hover:bg-white/10 scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100" />
                {/* Underline animation */}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 bg-teal-400 transition-all duration-300 ease-out group-hover:w-[calc(100%-2rem)] group-hover:left-4" />
                {/* Text */}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
              asChild
            >
              <Link href="/login">
                <Github className="mr-2 h-4 w-4" />
                Get Started
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 transition-transform duration-200 active:scale-90"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <Menu
                className={`h-5 w-5 absolute transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                className={`h-5 w-5 absolute transition-all duration-300 ${
                  isMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navLinks.slice(0, 3).map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/10 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                    transform: isMenuOpen
                      ? "translateX(0)"
                      : "translateX(-10px)",
                    opacity: isMenuOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </Link>
              ))}
              <div
                className="flex flex-col gap-2 pt-4 mt-2 border-t border-white/10"
                style={{
                  transitionDelay: isMenuOpen ? "150ms" : "0ms",
                  transform: isMenuOpen ? "translateY(0)" : "translateY(-10px)",
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-teal-600 to-teal-700"
                  asChild
                >
                  <Link href="/login">
                    <Github className="mr-2 h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
