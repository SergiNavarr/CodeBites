# Diccionario de Datos - CodeBites

---

## Módulo 1: Identidad y Acceso
Gestiona la autenticación, perfiles y permisos de los usuarios.

### Tabla: Roles

| Campo | Tipo   | Restricciones | Descripción |
|------|--------|---------------|-------------|
| id   | uuid   | PK            | Identificador único del rol. |
| title| varchar| NOT NULL      | Nombre del rol (ej: `admin`, `student`). |

---

### Tabla: Users

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| id | uuid | PK | Identificador único del usuario. |
| role_id | uuid | FK (Roles.id) | Referencia al rol asignado. |
| username | varchar | NOT NULL, UNIQUE | Nombre de usuario para la plataforma. |
| email | varchar | NOT NULL, UNIQUE | Correo electrónico institucional o personal. |
| password_hash | varchar | NOT NULL | Contraseña cifrada mediante hashing. |
| total_points | int | DEFAULT 0 | Acumulado de puntos por gamificación. |
| current_streak | int | DEFAULT 0 | Contador de días seguidos de estudio. |
| register_date | timestamp | DEFAULT now() | Fecha y hora de creación de la cuenta. |
| is_active | boolean | DEFAULT true | Estado para borrado lógico (Soft Delete). |

---

## Módulo 2: Contenido Educativo
Jerarquía de lecciones y categorización técnica.

### Tabla: Categories

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| id | uuid | PK | ID de la tecnología (ej: `.NET`, `React`). |
| title | varchar | NOT NULL | Nombre de la categoría. |
| is_active | boolean | DEFAULT true | Estado de la categoría. |

---

### Tabla: Lessons

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| id | uuid | PK | Identificador único de la lección. |
| category_id | uuid | FK (Categories.id) | Categoría a la que pertenece. |
| title | varchar | NOT NULL | Título de la unidad temática. |
| difficulty | enum / varchar | NOT NULL | Nivel de dificultad (Beg, Int, Adv). |
| points_reward | int | NOT NULL | Puntos otorgados al completar. |
| is_active | boolean | DEFAULT true | Estado de la lección. |

---

## Módulo 3: Evaluación (Quizzes)
Estructura jerárquica para la validación del aprendizaje.

### Tabla: Quizzes

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| lesson_id | uuid | PK, FK (Lessons.id) | Shared PK. Relación 1:1 con la lección. |
| passing_score | int | NOT NULL | Puntaje mínimo para aprobar la unidad. |

---

### Tabla: Questions

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| id | uuid | PK | Identificador único de la pregunta. |
| quiz_id | uuid | FK (Quizzes.lesson_id) | Quiz al que pertenece la pregunta. |
| text | varchar | NOT NULL | Enunciado de la pregunta. |
| explanation | varchar | — | Explicación técnica de la respuesta. |

---

### Tabla: Options

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| id | uuid | PK | Identificador de la opción de respuesta. |
| question_id | uuid | FK (Questions.id) | Pregunta asociada a la opción. |
| text | varchar | NOT NULL | Texto de la opción. |
| is_correct | boolean | DEFAULT false | Indica si es la respuesta acertada. |

---

## Módulo 4: Gamificación y Progreso
Registro de la interacción y logros de los usuarios.

### Tabla: UserProgress

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| user_id | uuid | PK, FK (Users.id) | Usuario que realiza la lección. |
| lesson_id | uuid | PK, FK (Lessons.id) | Lección cursada. |
| score | double | NOT NULL | Puntaje obtenido en la evaluación. |
| completed_at | timestamp | DEFAULT now() | Fecha y hora exacta de finalización. |

---

### Tabla: Achievements

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| id | uuid | PK | Identificador único del logro/medalla. |
| name | varchar | NOT NULL | Nombre del logro. |
| condition | varchar | NOT NULL | Lógica necesaria para desbloquearlo. |
| is_active | boolean | DEFAULT true | Estado del logro. |

---

### Tabla: UserAchievement

| Campo | Tipo | Restricciones | Descripción |
|------|------|---------------|-------------|
| user_id | uuid | PK, FK (Users.id) | Usuario que desbloqueó el logro. |
| achievement_id | uuid | PK, FK (Achievements.id) | Logro obtenido. |
| unlocked_at | timestamp | DEFAULT now() | Fecha y hora del desbloqueo. |

---

## Notas de Diseño

- **Integridad Referencial:** Todas las relaciones entre entidades débiles  
  (`Quiz → Question → Option`) implementan `ON DELETE CASCADE`.
- **Seguridad:** Se utilizan identificadores `uuid` para evitar la enumeración de recursos en la capa de API.
- **Precisión:** Se emplea `timestamp` en todos los registros de eventos para permitir auditorías y cálculos de rachas precisos.