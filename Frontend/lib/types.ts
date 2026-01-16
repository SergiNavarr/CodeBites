/**
 * Representa al usuario autenticado en el sistema.
 */
export interface UserResponse {
  id: string;
  username: string;
  email: string;
  totalPoints: number;
  currentStreak: number;
  activeCategoriesCount: number;
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
}

// Interfaz para cuando entras a ver las lecciones de una categoría
export interface CategoryDetail extends Category {
  lessons: LessonSummary[];
}

// Resumen de lección dentro de una categoría
export interface LessonSummary {
  id: string;
  title: string;
  points: number;
  order: number;
  isCompleted: boolean;
}

/**
 * Representa una lección individual dentro de una categoría.
 */
export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
  points: number;
  order: number;
  isCompleted: boolean;
  nextLessonId?: string | null;
}