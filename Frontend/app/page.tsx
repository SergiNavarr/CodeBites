import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobalNavbar } from "@/components/global-navbar"
import { 
  Terminal, 
  Cpu, 
  Database, 
  Zap, 
  Trophy, 
  Flame, 
  ArrowRight, 
  Code2, 
  Check, 
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col w-full overflow-x-hidden">
      
      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-primary/20 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20" />
      </div>
      <GlobalNavbar /> 

      {/* --- HERO SECTION --- */}
      <main className="flex-1 w-full">
        <section className="container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center space-y-8">
          
          {/* Badge de "Beta" */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Nuevo Módulo: Fundamentos C# Pro
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-balance max-w-4xl mx-auto">
            Aprende a programar <br className="hidden md:block"/>
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-primary animate-gradient">
              un bocado a la vez.
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-balance">
            Olvídate de los cursos de 40 horas. CodeBites te ofrece lecciones interactivas de 
            <strong> 5 minutos</strong> diseñadas para mantener tu racha y tu motivación.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center pt-4">
            <Button size="lg" className="h-12 px-8 text-base group" asChild>
              <Link href="/register">
                Crear Cuenta
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
              <Link href="/dashboard">Ver Rutas de Aprendizaje</Link>
            </Button>
          </div>

          {/* CODE DEMO VISUAL */}
          <div className="mt-16 w-full max-w-3xl perspective-1000 mx-auto">
            <div className="relative rounded-xl border bg-card shadow-2xl overflow-hidden transform rotate-x-12 transition-transform hover:rotate-0 duration-700">
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-muted/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs font-mono text-muted-foreground">Lección_01.cs</div>
              </div>
              <div className="p-6 text-left font-mono text-sm overflow-x-auto bg-[#09090b]">
                <p className="text-gray-500 mb-2">// Tu código en CodeBites se ve así:</p>
                <p className="text-purple-400">using <span className="text-foreground">System;</span></p>
                <br />
                <p className="text-blue-400">public class <span className="text-yellow-300">Program</span></p>
                <p className="text-foreground">{"{"}</p>
                <p className="pl-4 text-blue-400">public static void <span className="text-yellow-300">Main</span>()</p>
                <p className="pl-4 text-foreground">{"{"}</p>
                <p className="pl-8 text-foreground">Console.WriteLine(<span className="text-green-400">"¡Hola, CodeBites!"</span>);</p>
                <p className="pl-8 text-gray-500">// Ganas +100 XP al completar esto</p>
                <p className="pl-4 text-foreground">{"}"}</p>
                <p className="text-foreground">{"}"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CURRICULUM REAL --- */}
        <section className="w-full border-t border-border/50">
            <div className="container mx-auto px-4 py-24">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Rutas Oficiales</h2>
                <p className="text-muted-foreground">Contenido estructurado desde la base de datos hasta tu pantalla.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* CARD 1: C# */}
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all hover:border-primary/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                      <Terminal className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded">Backend</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">C# Fundamentos Pro</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Domina la sintaxis, tipos de datos, control de flujo y POO en .NET 8.
                  </p>
                  <ul className="text-sm space-y-2 mb-6 text-muted-foreground">
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Variables y Tipos</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Control de Flujo</li>
                    <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Métodos y Funciones</li>
                  </ul>
                </div>

                {/* CARD 2: React */}
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all hover:border-cyan-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-500">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded">Frontend</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">React Moderno</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Crea interfaces dinámicas con Hooks, componentes funcionales y Tailwind.
                  </p>
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">Próximamente disponible</p>
                  </div>
                </div>

                {/* CARD 3: SQL */}
                <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-lg transition-all hover:border-orange-500/50">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-orange-500/10 rounded-lg text-orange-500">
                      <Database className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono bg-muted px-2 py-1 rounded">Data</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">SQL & Bases de Datos</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Aprende a diseñar esquemas, consultas complejas y optimización con PostgreSQL.
                  </p>
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground">Próximamente disponible</p>
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* --- GAMIFICATION --- */}
        <section className="border-y border-border/50 bg-muted/20 w-full">
          <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-sm font-medium text-yellow-500">
                <Trophy className="mr-2 h-4 w-4" />
                Sistema de Progreso
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Aprender es adictivo cuando ganas recompensas.
              </h2>
              <p className="text-lg text-muted-foreground">
                Implementamos un sistema real de experiencia (XP) y rachas diarias para que no pierdas el hábito.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Rachas (Streaks)</h4>
                    <p className="text-sm text-muted-foreground">No rompas la cadena. Tu consistencia se guarda en la base de datos.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">XP y Niveles</h4>
                    <p className="text-sm text-muted-foreground">Gana puntos por cada lección y quiz completado.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual Abstracto */}
            <div className="relative h-[400px] w-full bg-card border rounded-2xl shadow-xl p-8 flex flex-col justify-center items-center gap-6">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              
              <div className="w-full max-w-sm bg-background border p-4 rounded-xl shadow-sm flex items-center justify-between animate-in slide-in-from-right duration-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold">Racha Actual</p>
                    <p className="text-xs text-muted-foreground">¡Estás en llamas!</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-foreground">5 Días</span>
              </div>

              <div className="w-full max-w-sm bg-background border p-4 rounded-xl shadow-sm flex items-center justify-between animate-in slide-in-from-left duration-700 delay-150">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold">Total XP</p>
                    <p className="text-xs text-muted-foreground">Nivel Junior</p>
                  </div>
                </div>
                <span className="text-2xl font-black text-foreground">1,250 XP</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="container mx-auto px-4 py-24 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              ¿Listo para escribir tu primera línea?
            </h2>
            <p className="text-muted-foreground text-lg">
              Únete ahora y accede al módulo de C# Fundamentos completamente gratis.
              Sin tarjetas de crédito, solo código.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg shadow-2xl shadow-primary/30" asChild>
              <Link href="/register">Comenzar Ahora</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t py-12 bg-muted/20 text-center md:text-left w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold">
            <Code2 className="h-5 w-5 text-primary" />
            <span>CodeBites</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 CodeBites. Construido con .NET 8 y Next.js.
          </p>
        </div>
      </footer>

    </div>
  )
}