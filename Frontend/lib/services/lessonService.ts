import { apiClient } from "@/lib/api-client";
import { Lesson, CreateLessonDto, Achievement } from "@/lib/types"; 

/**
 * Respuesta esperada al completar una lección.
 * Actualizada para incluir los logros desbloqueados.
 */
interface CompleteLessonResponse {
  message: string;
  points: number;
  newAchievements: Achievement[];
}

export const LessonService = {
  /**
   * Obtiene el contenido de la lección y los metadatos de progreso.
   * Llama a: GET /api/Lessons/{id}
   */
  getById: async (id: string): Promise<Lesson> => {
    return await apiClient.get<Lesson>(`/Lessons/${id}`);
  },

  /**
   * Marca la lección como completada, suma puntos y VERIFICA LOGROS.
   * Llama a: POST /api/Lessons/{id}/complete
   */
  complete: async (id: string): Promise<CompleteLessonResponse> => {
    return await apiClient.post<CompleteLessonResponse>(`/Lessons/${id}/complete`);
  },

  /**
   * Llama a: POST /api/admin/lessons
   */
  create: async (data: CreateLessonDto): Promise<Lesson> => {
    return await apiClient.post<Lesson>('/admin/lessons', data);
  }
};