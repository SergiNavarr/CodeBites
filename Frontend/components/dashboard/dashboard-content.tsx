"use client"

import { useState, useMemo, useEffect } from "react"
import { GlobalNavbar } from "@/components/global-navbar"
import { LearningPathCard } from "@/components/dashboard/learning-path-card"
import { ExploreCard } from "@/components/dashboard/explore-card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, BookOpen, Compass, Loader2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { CategoryService } from "@/lib/services/categoryService"
import type { Category } from "@/lib/types"

export function DashboardContent() {
  const { user, loading: authLoading } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setIsLoadingCategories(true)
        const data = await CategoryService.getAll()
        setCategories(data)
      } catch (error) {
        console.error("Dashboard data load failed:", error)
      } finally {
        setIsLoadingCategories(false)
      }
    }

    if (user) loadDashboardData()
  }, [user])

  // Lógica de filtrado
  const followedCategories = useMemo(() => 
    categories.filter((cat) => cat.isFollowing), 
  [categories])

  const exploreCategories = useMemo(() =>
    categories
      .filter((cat) => !cat.isFollowing)
      .filter(
        (cat) =>
          cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [categories, searchQuery]
  )

  const handleFollow = async (categoryId: string) => {
    try {
      await CategoryService.follow(categoryId)
      
      // Actualización optimista de la UI
      setCategories((prev) => 
        prev.map((cat) => (cat.id === categoryId ? { ...cat, isFollowing: true } : cat))
      )
    } catch (error) {
      console.error("Action failed:", error)
    }
  }

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent uppercase">
              {user.username}
            </span>
            !
          </h1>
          <p className="mt-2 text-muted-foreground">Ready for your next bite of knowledge?</p>
        </div>

        {/* My Learning Path */}
        <section className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">My Learning Path</h2>
          </div>

          {isLoadingCategories ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 w-full rounded-xl" />)}
            </div>
          ) : followedCategories.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {followedCategories.map((category) => (
                <LearningPathCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              You haven't started any learning paths yet.
            </div>
          )}
        </section>

        {/* Explore Categories */}
        <section>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Explore Categories</h2>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {isLoadingCategories ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => <Skeleton key={i} className="h-40 w-full rounded-xl" />)}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {exploreCategories.map((category) => (
                <ExploreCard key={category.id} category={category} onFollow={handleFollow} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}