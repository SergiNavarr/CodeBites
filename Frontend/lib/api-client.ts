import type { User, AuthResponse, Category, Lesson, ApiError } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

class ApiClient {
  private token: string | null = null

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("auth_token", token)
      } else {
        localStorage.removeItem("auth_token")
      }
    }
  }

  getToken(): string | null {
    if (this.token) return this.token
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token")
    }
    return null
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const token = this.getToken()

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        message: "An error occurred",
        statusCode: response.status,
      }))
      throw error
    }

    return response.json()
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    this.setToken(response.token)
    return response
  }

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    })
    this.setToken(response.token)
    return response
  }

  async logout(): Promise<void> {
    this.setToken(null)
  }

  // User endpoints
  async getCurrentUser(): Promise<User> {
    return this.request<User>("/users/me")
  }

  async updateUser(data: Partial<User>): Promise<User> {
    return this.request<User>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deactivateAccount(): Promise<void> {
    await this.request("/users/me/deactivate", {
      method: "POST",
    })
    this.setToken(null)
  }

  // Categories endpoints
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>("/categories")
  }

  async getCategory(id: string): Promise<Category> {
    return this.request<Category>(`/categories/${id}`)
  }

  // Lessons endpoints
  async getLessons(categoryId: string): Promise<Lesson[]> {
    return this.request<Lesson[]>(`/categories/${categoryId}/lessons`)
  }

  async getLesson(categoryId: string, lessonId: string): Promise<Lesson> {
    return this.request<Lesson>(`/categories/${categoryId}/lessons/${lessonId}`)
  }

  async completeLesson(categoryId: string, lessonId: string): Promise<{ points: number; newStreak: number }> {
    return this.request(`/categories/${categoryId}/lessons/${lessonId}/complete`, {
      method: "POST",
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient
