import { apiClient } from "../api-client";
import { Category } from "../types";

export const CategoryService = {
  /**
   * Obtiene todas las categorías disponibles y el estado de progreso del usuario.
   * GET /api/Categories
   */
  getAll: async (): Promise<Category[]> => {
    return await apiClient.get<Category[]>("/Categories");
  },

  /**
   * Registra que el usuario quiere empezar a aprender esta categoría.
   * POST /api/Categories/{id}/follow
   */
  follow: async (id: string): Promise<void> => {
    await apiClient.post(`/Categories/${id}/follow`);
  },

  /**
   * Permite al usuario dejar de seguir una categoría (opcional).
   * POST /api/Categories/{id}/unfollow
   */
  unfollow: async (id: string): Promise<void> => {
    await apiClient.post(`/Categories/${id}/unfollow`);
  }
};
