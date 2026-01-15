"use client"

import { useState, useMemo } from "react"
import { GlobalNavbar } from "@/components/global-navbar"
import { LearningPathCard } from "@/components/dashboard/learning-path-card"
import { ExploreCard } from "@/components/dashboard/explore-card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Compass } from "lucide-react"
import type { Category } from "@/lib/types"

// Mock data - replace with API calls
const initialCategories: Category[] = [
  {
    id: "csharp",
    name: "C#",
    icon: "terminal",
    description: "Master the fundamentals of C# programming, from variables to LINQ.",
    lessonsCount: 48,
    completedLessons: 12,
    color: "#68217A",
    isFollowing: true,
    progressPercentage: 25,
  },
  {
    id: "react",
    name: "React",
    icon: "terminal",
    description: "Build modern UIs with React hooks, components, and state management.",
    lessonsCount: 56,
    completedLessons: 28,
    color: "#00D8FF",
    isFollowing: true,
    progressPercentage: 50,
  },
  {
    id: "sql",
    name: "SQL",
    icon: "terminal",
    description: "Write efficient queries, joins, and optimize database performance.",
    lessonsCount: 42,
    completedLessons: 42,
    color: "#F29111",
    isFollowing: true,
    progressPercentage: 100,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "terminal",
    description: "Add type safety to your JavaScript with TypeScript essentials.",
    lessonsCount: 52,
    completedLessons: 8,
    color: "#3178C6",
    isFollowing: false,
    progressPercentage: 0,
  },
  {
    id: "python",
    name: "Python",
    icon: "terminal",
    description: "Learn Python basics, data structures, and popular libraries.",
    lessonsCount: 60,
    completedLessons: 0,
    color: "#3776AB",
    isFollowing: false,
    progressPercentage: 0,
  },
  {
    id: "git",
    name: "Git",
    icon: "terminal",
    description: "Version control essentials, branching strategies, and collaboration.",
    lessonsCount: 30,
    completedLessons: 15,
    color: "#F05032",
    isFollowing: false,
    progressPercentage: 0,
  },
]

export function DashboardContent() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock user data - replace with API call
  const totalPoints = 2450
  const currentStreak = 7
  const username = "DevMaster"

  // Separate followed and unfollowed categories
  const followedCategories = useMemo(() => categories.filter((cat) => cat.isFollowing), [categories])

  const exploreCategories = useMemo(
    () =>
      categories
        .filter((cat) => !cat.isFollowing)
        .filter(
          (cat) =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    [categories, searchQuery],
  )

  // Handle follow action
  const handleFollow = (categoryId: string) => {
    setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, isFollowing: true } : cat)))
  }

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]">
      <GlobalNavbar username={username} totalPoints={totalPoints} currentStreak={currentStreak} />

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {username}
            </span>
            !
          </h1>
          <p className="mt-2 text-muted-foreground">Ready for your next bite of knowledge?</p>
        </div>

        {/* My Learning Path Section */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">My Learning Path</h2>
            <span className="ml-2 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {followedCategories.length} active
            </span>
          </div>

          {followedCategories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {followedCategories.map((category) => (
                <LearningPathCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border/50 bg-card/30 p-8 text-center">
              <p className="text-muted-foreground">
                You haven't started any learning paths yet. Explore categories below to begin!
              </p>
            </div>
          )}
        </section>

        {/* Explore Categories Section */}
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Explore Categories</h2>
              <span className="ml-2 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {exploreCategories.length} available
              </span>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {exploreCategories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exploreCategories.map((category) => (
                <ExploreCard key={category.id} category={category} onFollow={handleFollow} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border/50 bg-card/30 p-8 text-center">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No categories found matching your search."
                  : "You're following all available categories!"}
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
