"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserService } from '@/lib/services/userService'
import { UserResponse } from '@/lib/types'
import { useRouter } from 'next/navigation'

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

  /**
   * Sincroniza el estado del usuario con el Backend.
   */
  const refreshUser = async () => {
    try {
      const data = await UserService.getMe()
      setUser(data)
    } catch (error) {
      setUser(null)
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

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      refreshUser()
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)