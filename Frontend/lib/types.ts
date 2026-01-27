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

/**
 * Representa el detalle de un Quiz para ser realizado.
 */
export interface QuizDetail {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
}

/**
 * Estructura para enviar las respuestas al servidor.
 */
export interface QuizSubmission {
  quizId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
}

/**
 * Respuesta del servidor tras validar un quiz.
 */
export interface QuizResult {
  success: boolean;
  pointsEarned: number;
  correctAnswersCount: number;
  totalQuestions: number;
  message: string;
}

export interface UserAchievement {
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt: string;
}

export interface RecentActivity {
  title: string;
  date: string;
  pointsGained: number;
}

export interface UserProfile {
  username: string;
  email: string;
  createdAt: string;
  totalPoints: number;
  currentStreak: number;
  activeCategoriesCount: number;
  completedLessonsCount: number;
  achievements: UserAchievement[];
  recentActivities: RecentActivity[];
}