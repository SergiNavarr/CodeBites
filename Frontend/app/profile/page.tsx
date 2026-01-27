"use client"

import { useState, useEffect } from "react"
import { GlobalNavbar } from "@/components/global-navbar"
import { ProgressCard } from "@/components/dashboard/progress-card"
import { UserService } from "@/lib/services/userService"
import { UserProfile } from "@/lib/types"
import { Trophy, Zap, Target, Calendar, Loader2, Award, History } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await UserService.getProfile()
        setProfile(data)
      } catch (error) {
        console.error(error)
        toast.error("Error al cargar el perfil")
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) return null

  const memberSince = new Date(profile.createdAt).toLocaleDateString("es-ES", {
    month: "long",
    year: "numeric"
  })

  return (
    <div className="min-h-screen bg-background">
      <GlobalNavbar />
      
      <main className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-12">
          
          {/* COLUMNA IZQUIERDA: Identidad */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-border/50 bg-card/50 shadow-lg">
              <CardContent className="pt-10 flex flex-col items-center text-center pb-10">
                <Avatar className="h-32 w-32 border-4 border-primary/20 mb-4 shadow-xl">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback className="text-4xl font-black bg-primary/10 text-primary">
                    {profile.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-3xl font-black tracking-tighter">{profile.username}</h2>
                <p className="text-muted-foreground font-medium mb-4">{profile.email}</p>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  <Calendar className="h-4 w-4" />
                  <span>Miembro desde {memberSince}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actividad Reciente */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <History className="h-5 w-5 text-primary" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.recentActivities.length > 0 ? (
                  profile.recentActivities.map((activity, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-emerald-500">+{activity.pointsGained} XP</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No hay actividad reciente.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* COLUMNA DERECHA: Stats y Logros */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* STATS */}
            <section>
              <h3 className="mb-4 text-xl font-black tracking-tight">Estadísticas</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <ProgressCard 
                  title="Puntos Totales"
                  value={profile.totalPoints}
                  subtitle="Experiencia (XP)"
                  icon={Trophy}
                  color="achievement"
                />
                <ProgressCard 
                  title="Racha Actual"
                  value={`${profile.currentStreak} días`}
                  subtitle="Consistencia"
                  icon={Zap}
                  color="success"
                />
                <ProgressCard 
                  title="Lecciones"
                  value={profile.completedLessonsCount}
                  subtitle="Completadas"
                  icon={Target}
                  color="progress"
                />
              </div>
            </section>

            {/* LOGROS / MEDALLAS */}
            <section>
              <h3 className="mb-4 text-xl font-black tracking-tight flex items-center gap-2">
                <Award className="h-6 w-6 text-yellow-500" />
                Medallas y Logros
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profile.achievements.length > 0 ? (
                  profile.achievements.map((achievement, i) => (
                    <Card key={i} className="border-border/50 bg-gradient-to-br from-card to-muted/20 hover:scale-105 transition-transform cursor-default">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full">
                        <div className="h-16 w-16 mb-4 rounded-full bg-yellow-500/10 flex items-center justify-center">
                          <Trophy className="h-8 w-8 text-yellow-600" />
                        </div>
                        <h4 className="font-bold text-sm mb-1">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{achievement.description}</p>
                        <span className="text-[10px] text-muted-foreground mt-3 bg-muted px-2 py-0.5 rounded-full">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  // Estado vacío
                  <Card className="col-span-full border-dashed border-2">
                    <CardContent className="flex flex-col items-center py-12 text-center text-muted-foreground">
                      <Trophy className="h-12 w-12 mb-4 opacity-20" />
                      <p className="font-medium">Aún no tienes medallas.</p>
                      <p className="text-sm">¡Completa lecciones y mantén tu racha para desbloquearlas!</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  )
}