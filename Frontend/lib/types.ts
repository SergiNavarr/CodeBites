// User model interface matching .NET backend
export interface User {
  id: string
  username: string
  email: string
  token: string
  totalPoints: number
  currentStreak: number
}

export interface Category {
  id: string
  name: string
  icon: string
  description: string
  lessonsCount: number
  completedLessons: number
  color: string
  isFollowing: boolean
  progressPercentage: number
}

export interface Lesson {
  id: string
  categoryId: string
  title: string
  content: string
  codeExample?: string
  order: number
  points: number
  isCompleted: boolean
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ApiError {
  message: string
  statusCode: number
}
