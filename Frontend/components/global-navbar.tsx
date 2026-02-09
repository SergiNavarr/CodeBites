"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { User, LogOut, Trophy, Flame } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/context/auth-context"
import { Skeleton } from "@/components/ui/skeleton"

export function GlobalNavbar() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9 rounded-lg" />
            <Skeleton className="hidden md:block h-6 w-24" />
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Skeleton className="h-7 w-12 md:h-8 md:w-16 rounded-full" />
            <Skeleton className="h-7 w-10 md:h-8 md:w-12 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </header>
    )
  }

  // ESTADO: NO LOGUEADO
  if (!user) {
    return (
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-8 w-10 -mr-2">
              <Image
                src="/logo-bites.png"
                alt="CodeBites Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="hidden md:inline text-xl font-bold tracking-tight text-white">
              Code<span className="text-[#4ade80]">Bites</span>
            </span>
          </Link>

          <Button asChild variant="default" size="sm">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </header>
    )
  }

  // ESTADO: LOGUEADO
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="relative h-8 w-10 -mr-2">
            <Image
              src="/logo-bites.png"
              alt="CodeBites Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <span className="hidden md:inline text-xl font-bold tracking-tight text-white">
            Code<span className="text-[#4ade80]">Bites</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Points*/}
          <div
            key={user.totalPoints}
            className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-1 md:gap-1.5 md:px-3 md:py-1.5 transition-all animate-in zoom-in duration-500"
          >
            <Trophy className="h-3 w-3 md:h-4 md:w-4 text-amber-400" />
            <span className="text-xs md:text-sm font-semibold text-amber-400">
              {user.totalPoints.toLocaleString()}
            </span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-1 md:gap-1.5 md:px-3 md:py-1.5 transition-colors hover:bg-orange-500/20">
            <Flame className="h-3 w-3 md:h-4 md:w-4 text-orange-400" />
            <span className="text-xs md:text-sm font-semibold text-orange-400">
              {user.currentStreak}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-1 md:px-2">
                <Avatar className="h-7 w-7 md:h-8 md:w-8">
                  <AvatarFallback className="bg-primary/10 text-primary uppercase text-xs md:text-sm">
                    {user.username.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline">{user.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/login"
                  onClick={() => localStorage.removeItem('auth_token')}
                  className="flex items-center text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}