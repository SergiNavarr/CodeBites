"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code2, User, LogOut, Trophy, Flame } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface GlobalNavbarProps {
  username?: string
  totalPoints?: number
  currentStreak?: number
}

export function GlobalNavbar({ username = "DevUser", totalPoints = 0, currentStreak = 0 }: GlobalNavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Code2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">CodeBites</span>
        </Link>

        {/* Gamification Stats & User Menu */}
        <div className="flex items-center gap-4">
          {/* Points */}
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 transition-colors hover:bg-amber-500/20">
            <Trophy className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">{totalPoints.toLocaleString()}</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5 transition-colors hover:bg-orange-500/20">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-semibold text-orange-400">{currentStreak}</span>
          </div>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden text-sm font-medium md:inline">{username}</span>
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
                <Link href="/" className="flex items-center text-destructive">
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
