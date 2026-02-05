"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:7122/api"

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "")
  }

  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  }

  public setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  public removeToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  /**
   * Método privado centralizador de peticiones.
   * Maneja headers, inyección de JWT y errores globales.
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    const url = `${this.baseUrl}${normalizedEndpoint}`
    
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

      if (response.status === 204) {
        return {} as T
      }

      let data: any
      const contentType = response.headers.get("content-type")
      
      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json()
        } catch (error) {
          data = null 
        }
      } else {
        data = await response.text() 
      }

      if (!response.ok) {
        const errorMessage = data?.message || data?.title || response.statusText || "Error desconocido"
        throw new Error(errorMessage)
      }

      return data as T
      
    } catch (error: any) {
      console.error(`API Error [${url}]:`, error.message)
      throw error
    }
  }


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