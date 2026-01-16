"use client"

import { GlobalNavbar } from "@/components/global-navbar"
import { ProgressCard } from "@/components/dashboard/progress-card"
import { useAuth } from "@/context/auth-context"
import { Trophy, Zap, Target, User as UserIcon, Mail, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  const { user, loading } = useAuth()

  if (loading || !user) return null

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-10 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 border-4 border-primary/20">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-2xl">{user.username[0]}</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{user.username}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="mb-4 text-xl font-semibold">Resumen de Progreso</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <ProgressCard 
                  title="Puntos"
                  value={user.totalPoints}
                  subtitle="Experiencia acumulada"
                  icon={Trophy}
                  color="achievement"
                />
                <ProgressCard 
                  title="Racha"
                  value={`${user.currentStreak} días`}
                  subtitle="Consistencia"
                  icon={Zap}
                  color="success"
                />
                <ProgressCard 
                  title="Rutas"
                  value={user.activeCategoriesCount}
                  subtitle="En curso"
                  icon={Target}
                  color="progress"
                />
              </div>
            </section>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Próximos Objetivos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  Completa tu primera lección para desbloquear más estadísticas.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}