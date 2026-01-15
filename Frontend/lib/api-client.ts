"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7122/api"

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  // Gestión interna del Token JWT
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  }

  public setToken(token: string) {
    localStorage.setItem("auth_token", token)
  }

  public removeToken() {
    localStorage.removeItem("auth_token")
  }

  /**
   * Método privado centralizador de peticiones.
   * Maneja headers, inyección de JWT y errores globales.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const token = this.getToken()

    const headers = new Headers(options.headers)
    headers.set("Content-Type", "application/json")
    
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }

    const config: RequestInit = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)

      if (response.status === 401) {
        this.removeToken()
      }

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || data.title || "Something went wrong")
      }

      return data as T
    } catch (error) {
      console.error(`API Error [${url}]:`, error)
      throw error
    }
  }

  /**
   * MÉTODOS PÚBLICOS
   */
  
  public async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  public async post<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  public async put<T>(endpoint: string, body?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  public async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)