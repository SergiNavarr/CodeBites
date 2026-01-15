"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ArrowLeft, Trophy, Flame, Loader2, AlertTriangle } from "lucide-react"

// Mock user data
const mockUser = {
  id: "1",
  username: "DevMaster",
  email: "devmaster@example.com",
  totalPoints: 2450,
  currentStreak: 7,
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  async function handleDeactivate() {
    setIsDeactivating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Redirect to home after deactivation
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader username={mockUser.username} />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Profile Header */}
          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col items-center gap-6 p-8 sm:flex-row">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                  {mockUser.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{mockUser.username}</h1>
                <p className="text-muted-foreground">{mockUser.email}</p>
                <div className="mt-4 flex justify-center gap-6 sm:justify-start">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-achievement" />
                    <span className="font-semibold">{mockUser.totalPoints.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-success" />
                    <span className="font-semibold">{mockUser.currentStreak}</span>
                    <span className="text-sm text-muted-foreground">day streak</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile */}
          <Card className="border-border/50 bg-card">
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue={mockUser.username} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockUser.email} />
                </div>
                <Button type="submit" disabled={isLoading} className="shadow-lg shadow-primary/25">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/30 bg-card">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions for your account</CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="mb-4" />
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h4 className="font-medium">Deactivate Account</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">Deactivate Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account, all your progress, and
                        remove your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeactivate}
                        disabled={isDeactivating}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {isDeactivating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Deactivating...
                          </>
                        ) : (
                          "Yes, deactivate my account"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
