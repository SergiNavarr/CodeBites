import { apiClient } from "../api-client";
import { 
  UserResponse, 
  AuthResponse, 
  LoginCredentials, 
  RegisterCredentials,
  UserProfile
} from "../types";

export const UserService = {
  /**
   * Obtiene la información del usuario actual mediante el token JWT.
   * Espejo de: GET /api/Users/me
   */
  getMe: async (): Promise<UserResponse> => {
    return await apiClient.get<UserResponse>("/Users/me");
  },

  /**
   * Realiza el inicio de sesión.
   * Espejo de: POST /api/Users/login
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/Users/login", credentials);
    // Almacenamos el token en el motor de red para futuras peticiones
    apiClient.setToken(response.token);
    return response;
  },

  /**
   * Registra un nuevo usuario en el sistema.
   * Espejo de: POST /api/Users/register
   */
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/Users/register", credentials);
    // Almacenamos el token automáticamente tras el registro exitoso
    apiClient.setToken(response.token);
    return response;
  },

  /**
   * Realiza el "Soft Delete" de la cuenta.
   * Espejo de: POST /api/Users/deactivate
   */
  deactivate: async (): Promise<void> => {
    await apiClient.post("/Users/deactivate");
    // Limpiamos la sesión localmente tras la desactivación
    apiClient.removeToken();
  },

  /**
   * Cierra la sesión del usuario.
   */
  logout: () => {
    apiClient.removeToken();
  },

  /**
   * Obtiene el perfil completo enriquecido con logros y actividad.
   * Espejo de: GET /api/users/profile
   */
  getProfile: async (): Promise<UserProfile> => {
    return await apiClient.get<UserProfile>("/users/profile");
  },
};