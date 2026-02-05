import { apiClient } from "@/lib/api-client";
import { Lesson , CreateLessonDto } from "@/lib/types";


/**
 * Datos necesarios para crear una lección desde el panel de Admin
 */
/**
 * Respuesta esperada al completar una lección.
 */
interface CompleteLessonResponse {
  message: string;
  points: number;
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
   * Marca la lección como completada y suma los puntos al usuario.
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