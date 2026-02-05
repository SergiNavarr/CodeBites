"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LessonService } from "@/lib/services/lessonService"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { CreateLessonDto } from "@/lib/types"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Save, FileText, Layout, ArrowLeft, Database } from "lucide-react"

export default function CreateLessonPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState<CreateLessonDto>({
    title: "",
    categoryId: "", 
    content: "# Nueva Lección\n\nEscribe tu contenido aquí usando **Markdown**...",
    order: 1,
    pointsReward: 100,
    difficulty: 1,
  })

  const handleSave = async () => {
    if (!formData.title || !formData.categoryId || !formData.content) {
      toast.error("Faltan datos", {
        description: "El título, la categoría y el contenido son obligatorios."
      })
      return
    }

    try {
      setLoading(true)

      await LessonService.create(formData)
      
      toast.success("¡Lección creada!", {
        description: "La lección se ha guardado en la base de datos."
      })
      
      setFormData(prev => ({ 
        ...prev, 
        title: "", 
        content: "# Siguiente Lección\n\n...",
        order: prev.order + 1 
      }))

    } catch (err: any) {
      console.error(err)
      toast.error("Error al guardar", {
        description: "Verifica que el ID de la Categoría sea válido y tengas permisos de Admin."
      })
    } finally {
      setLoading(false)
    }
  }

  const setNumField = (field: keyof CreateLessonDto, value: string) => {
    const num = parseInt(value)
    setFormData(prev => ({ ...prev, [field]: isNaN(num) ? 0 : num }))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] container mx-auto p-4 gap-4 max-w-7xl">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border/50 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Creador de Lecciones
            </h1>
            <p className="text-xs text-muted-foreground font-mono">CodeBites Admin Panel</p>
          </div>
        </div>

        <Button onClick={handleSave} disabled={loading} size="lg" className="font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Publicar Lección
        </Button>
      </div>

      {/* --- CONFIGURACIÓN (METADATA) --- */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Columna Principal: Título y Categoría */}
        <Card className="md:col-span-8 p-5 flex flex-col gap-4 border-border/50 shadow-sm">
          <div className="grid gap-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Título</label>
            <Input 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Ej: Introducción a los Hooks" 
              className="text-lg font-bold h-12"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
              <Database className="w-3 h-3" /> ID de Categoría (UUID)
            </label>
            <Input 
              value={formData.categoryId} 
              onChange={e => setFormData({...formData, categoryId: e.target.value})}
              placeholder="Pega el UUID aquí (ej: 8440b8a0-2f...)" 
              className="font-mono text-xs bg-muted/30 border-dashed"
            />
          </div>
        </Card>

        {/* Columna Lateral: Números */}
        <Card className="md:col-span-4 p-5 grid grid-cols-2 gap-4 border-border/50 shadow-sm">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Dificultad</label>
            <Select 
              value={formData.difficulty.toString()} 
              onValueChange={(val) => setNumField('difficulty', val)}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="1">🟢 Fácil</SelectItem>
                <SelectItem value="2">🟡 Medio</SelectItem>
                <SelectItem value="3">🔴 Difícil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Puntos (XP)</label>
            <Input 
              type="number" 
              value={formData.pointsReward} 
              onChange={e => setNumField('pointsReward', e.target.value)}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <label className="text-xs font-bold uppercase text-muted-foreground">Orden (#)</label>
            <Input 
              type="number" 
              value={formData.order} 
              onChange={e => setNumField('order', e.target.value)}
              placeholder="Ej: 1"
            />
          </div>
        </Card>
      </div>

      {/* --- EDITOR SPLIT SCREEN --- */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
        
        {/* IZQUIERDA: EDITOR RAW */}
        <div className="flex flex-col gap-2 h-full">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
              <Layout className="w-3 h-3" /> Editor Markdown
            </label>
          </div>
          <Textarea 
            className="flex-1 resize-none font-mono text-sm leading-relaxed p-6 bg-card hover:bg-card/80 focus:bg-card transition-colors border-border/50 shadow-inner rounded-xl"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
            placeholder="# Empieza a escribir..."
          />
        </div>

        {/* DERECHA: PREVIEW EN VIVO */}
        <div className="flex flex-col gap-2 h-full hidden md:flex">
          <div className="flex items-center justify-between px-1">
            <label className="text-xs font-bold uppercase text-muted-foreground">Vista Previa</label>
          </div>
          <div className="flex-1 border border-border/50 rounded-xl bg-card overflow-y-auto p-8 shadow-sm">
            <div className="max-w-prose mx-auto">
              <MarkdownRenderer content={formData.content} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}