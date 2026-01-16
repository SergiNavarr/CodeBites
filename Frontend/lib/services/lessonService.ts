import { apiClient } from "@/lib/api-client";
import { Lesson } from "@/lib/types";

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
    // Usamos el método .get<T> de tu ApiClient
    return await apiClient.get<Lesson>(`/Lessons/${id}`);
  },

  /**
   * Marca la lección como completada y suma los puntos al usuario.
   * Llama a: POST /api/Lessons/{id}/complete
   */
  complete: async (id: string): Promise<CompleteLessonResponse> => {
    // Usamos el método .post<T> de tu ApiClient
    return await apiClient.post<CompleteLessonResponse>(`/Lessons/${id}/complete`);
  }
};