"use client"

import { useState } from "react"
import Link from "next/link"
import { GlobalNavbar } from "@/components/global-navbar"
import { Button } from "@/components/ui/button"
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
import { useAuth } from "@/context/auth-context"

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const [isDeactivating, setIsDeactivating] = useState(false)

  async function handleDeactivate() {
    setIsDeactivating(true)
    // Aquí iría la llamada real a apiClient.deactivateAccount()
    await new Promise((resolve) => setTimeout(resolve, 1500))
    localStorage.removeItem('auth_token')
    window.location.href = "/"
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">No se pudo cargar el perfil.</p>
        <Button asChild>
          <Link href="/login">Ir al Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Usamos el Navbar que ya conectamos al contexto */}
      <GlobalNavbar />

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6 -ml-2">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="mx-auto max-w-2xl space-y-6">
          {/* Profile Header - Datos reales de PostgreSQL */}
          <Card className="border-border/50 bg-card">
            <CardContent className="flex flex-col items-center gap-6 p-8 sm:flex-row">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="bg-primary/10 text-2xl text-primary uppercase">
                  {user.username.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="mt-4 flex justify-center gap-6 sm:justify-start">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-400" />
                    <span className="font-semibold">{user.totalPoints.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{user.currentStreak}</span>
                    <span className="text-sm text-muted-foreground">day streak</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone - Soft Delete (Historia de Usuario 1.3) */}
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
                        This action cannot be undone. This will permanently deactivate your account,
                        all your progress will be lost.
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