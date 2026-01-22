import { apiClient } from "../api-client";
import { QuizDetail, QuizSubmission, QuizResult } from "../types";

/**
 * Servicio encargado de la comunicación con los endpoints de Quizzes.
 */
export const QuizService = {
  /**
   * Obtiene el quiz asociado a una lección específica.
   * @param lessonId ID de la lección
   * @returns Promesa con los detalles del quiz (preguntas y opciones)
   */
  async getByLesson(lessonId: string): Promise<QuizDetail> {
    return await apiClient.get<QuizDetail>(`/quizzes/lesson/${lessonId}`);
  },

  /**
   * Envía las respuestas del usuario para su validación en el servidor.
   * @param submission Objeto con el ID del quiz y el listado de respuestas
   * @returns Promesa con el resultado de la validación, puntos ganados y mensaj
   */
  async submit(submission: QuizSubmission): Promise<QuizResult> {
    return await apiClient.post<QuizResult>("/quizzes/submit", submission);
  }
};