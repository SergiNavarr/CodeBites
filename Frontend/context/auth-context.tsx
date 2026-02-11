"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserService } from '@/lib/services/userService'
import { UserResponse } from '@/lib/types'
import { useRouter, usePathname } from 'next/navigation'

interface AuthContextType {
  user: UserResponse | null
  loading: boolean
  refreshUser: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()
  const pathname = usePathname()

  /**
   * Sincroniza el estado del usuario con el Backend.
   */
  const refreshUser = async () => {
    try {
      const data = await UserService.getMe()
      setUser(data)
    } catch (error) {
      setUser(null)
      localStorage.removeItem('auth_token') // Limpiar token si expiró o es inválido
    } finally {
      setLoading(false)
    }
  }

  /**
   * Función global para cerrar sesión.
   */
  const logout = () => {
    UserService.logout()
    setUser(null)
    router.push("/")
  }

  // Verificación inicial de sesión al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      refreshUser()
    } else {
      setLoading(false)
    }
  }, [])

  // Control de Rutas (Route Guarding)
  useEffect(() => {
    if (!loading) {
      const publicPaths = ['/', '/login', '/register']
      const isPublicPath = publicPaths.includes(pathname)

      if (user && isPublicPath) {
        router.replace('/dashboard')
      } else if (!user && !isPublicPath) {
        router.replace('/')
      }
    }
  }, [user, loading, pathname, router])

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)