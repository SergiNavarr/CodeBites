/**
 * Representa al usuario autenticado en el sistema.
 */
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  totalPoints: number;
  currentStreak: number;
}

/**
 * Respuesta del servidor tras un Login o Registro exitoso.
 */
export interface AuthResponse {
  token: string;
  user: UserResponse;
}

/**
 * Credenciales necesarias para el inicio de sesión.
 */
export interface LoginCredentials {
  email: string;
  password?: string;
}

/**
 * Datos necesarios para registrar un nuevo usuario.
 */
export interface RegisterCredentials {
  username: string;
  email: string;
  password?: string;
}

/**
 * Representa una categoría de aprendizaje (Tecnología).
 */
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  lessonsCount: number;
  completedLessons: number;
  isFollowing: boolean;
  progressPercentage: number;
}

/**
 * Representa una lección individual dentro de una categoría.
 */
export interface Lesson {
  id: string;
  title: string;
  content: string;
  order: number;
  categoryId: string;
  isCompleted: boolean;
}