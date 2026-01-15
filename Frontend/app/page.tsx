import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, Zap, Trophy, Target, ChevronRight, Terminal } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">CodeBites</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="#categories" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Categories
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="shadow-lg shadow-primary/25">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center md:py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-4 w-4" />
            <span>Micro-learning for developers</span>
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Master code in <span className="text-primary">bite-sized</span> lessons
          </h1>
          <p className="mb-10 text-pretty text-lg text-muted-foreground md:text-xl">
            Learn programming concepts in minutes, not hours. Build streaks, earn points, and level up your developer
            skills with gamified micro-learning.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="h-12 px-8 shadow-lg shadow-primary/25">
              <Link href="/register">
                Start Learning Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="h-12 px-8 bg-transparent">
              <Link href="/dashboard">Explore Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border/50 bg-card/50">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
          {[
            { value: "500+", label: "Bite-sized Lessons" },
            { value: "12", label: "Technologies" },
            { value: "50K+", label: "Developers" },
            { value: "5 min", label: "Average Lesson" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why CodeBites?</h2>
          <p className="text-muted-foreground">Built for developers who value their time</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Quick Lessons",
              description: "Each lesson takes 5 minutes or less. Perfect for coffee breaks or commutes.",
              color: "text-primary bg-primary/10",
            },
            {
              icon: Trophy,
              title: "Gamified Progress",
              description: "Earn points, maintain streaks, and unlock achievements as you learn.",
              color: "text-achievement bg-achievement/10",
            },
            {
              icon: Target,
              title: "Focused Learning",
              description: "One concept at a time. No fluff, just the essentials you need to know.",
              color: "text-progress bg-progress/10",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Preview */}
      <section id="categories" className="border-t border-border/50 bg-card/30">
        <div className="container mx-auto px-4 py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Popular Categories</h2>
            <p className="text-muted-foreground">Start with what interests you most</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "C#", lessons: 48, color: "from-[#68217A] to-[#9B4DCA]" },
              { name: "React", lessons: 56, color: "from-[#00D8FF] to-[#0097A7]" },
              { name: "SQL", lessons: 42, color: "from-[#F29111] to-[#D35400]" },
              { name: "TypeScript", lessons: 52, color: "from-[#3178C6] to-[#235A97]" },
            ].map((category) => (
              <Link
                key={category.name}
                href="/dashboard"
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 transition-opacity group-hover:opacity-10`}
                />
                <div className="relative">
                  <Terminal className="mb-3 h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                  <h3 className="mb-1 text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.lessons} lessons</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-background to-progress/10 p-12 text-center md:p-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to level up?</h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            Join thousands of developers who are learning smarter, not harder. Start your first lesson in under 30
            seconds.
          </p>
          <Button size="lg" asChild className="h-12 px-8 shadow-lg shadow-primary/25">
            <Link href="/register">
              Create Free Account
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">CodeBites</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 CodeBites. Built for developers, by developers.</p>
        </div>
      </footer>
    </div>
  )
}
