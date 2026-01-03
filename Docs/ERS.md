# 1. Introducción

## 1.1 Introducción
Este documento detalla los requerimientos para el desarrollo de **CodeBites**, una plataforma web orientada al micro-aprendizaje de conceptos de desarrollo de software. El proyecto surge como una iniciativa personal para integrar conocimientos de ingeniería de software, arquitectura de sistemas y desarrollo fullstack (.NET + React).

## 1.2 Alcance del Proyecto
El proyecto **CodeBites** consiste en el diseño y desarrollo de una plataforma web multiplataforma orientada al micro-aprendizaje (micro-learning) de conceptos de desarrollo de software. La solución busca optimizar la retención de conocimientos técnicos mediante lecciones atómicas y evaluaciones interactivas, facilitando la formación continua del perfil desarrollador.

### Funcionalidades Incluidas (MVP)
- **Gestión de Contenido Educativo:** Catálogo de lecciones técnicas organizadas por módulos temáticos.
- **Evaluación y Feedback:** Sistema de quizzes con validación automática de respuestas en tiempo real.
- **Gamificación y Progreso:** Registro de avance del usuario y sistema de puntuación acumulativa.
- **Seguridad y Persistencia:** Autenticación mediante JWT y persistencia en base de datos relacional.

### Límites y Exclusiones
- El sistema no funcionará como un IDE; no se realizará compilación ni ejecución de código en el navegador.
- La carga de contenido queda reservada exclusivamente para el rol **Administrador** en esta fase.
- El sistema no emite certificaciones con validez institucional en esta versión inicial.

# 2. Descripción General

## 2.1 Perspectiva del Producto
**CodeBites** se concibe como una aplicación web moderna. Técnicamente, se estructura en un monorepo que contiene:

- **Backend:** Web API desarrollada en ASP.NET Core 8 siguiendo los principios de Clean Architecture.
- **Frontend:** Aplicación SPA construida con React y Next.js, utilizando Tailwind CSS para el diseño.
- **Base de Datos:** Motor relacional PostgreSQL.

## 2.2 Características de los Usuarios

| Tipo de Usuario      | Habilidades                       | Actividades                                                         |
|----------------------|-----------------------------------|----------------------------------------------------------------------|
| Estudiante / Dev     | Conocimientos básicos de IT       | Visualizar lecciones, realizar quizzes y consultar progreso personal |
| Administrador        | Conocimientos técnicos avanzados  | Gestionar lecciones, preguntas y supervisar el sistema               |

# 3. Requerimientos Específicos

## 3.1 Requerimientos Funcionales (RF)

| ID     | Descripción del Requisito                                                                 |
|--------|---------------------------------------------------------------------------------------------|
| RF#01  | El sistema debe permitir el registro y login de usuarios mediante credenciales seguras.    |
| RF#02  | El sistema debe listar categorías y lecciones disponibles según el stack tecnológico.      |
| RF#03  | El sistema debe permitir visualizar el contenido de una lección y desplegar el quiz asociado. |
| RF#04  | El sistema debe validar respuestas de opción múltiple de forma instantánea.                |
| RF#05  | El sistema debe asignar puntos al perfil del usuario tras completar lecciones exitosamente.|
| RF#06  | El sistema debe permitir al Administrador realizar el ABM de lecciones y preguntas.        |

## 3.2 Requerimientos No Funcionales (RNF)

| ID     | Descripción del Requisito                                                                 | Clasificación   |
|--------|---------------------------------------------------------------------------------------------|-----------------|
| RNF#01 | La arquitectura backend debe implementar Clean Architecture.                               | Mantenibilidad  |
| RNF#02 | El sistema debe implementar seguridad basada en JWT para la autorización de endpoints.     | Seguridad       |
| RNF#03 | La interfaz debe ser responsive para móviles y escritorio.                                 | Portabilidad    |
| RNF#04 | La validación de quizzes no debe superar los 2 segundos.                                    | Eficiencia      |

# 4. Metodología y Planificación
Se adopta un ciclo de vida incremental con enfoque ágil. El desarrollo se dividirá en módulos (Análisis, Backend Core, Frontend, Integración y Deploy), permitiendo entregas funcionales constantes y documentación técnica actualizada en cada etapa.

# 5. Apendices

## 5.1 DER Conceptual

![DER_conceptual](DER-conceptual.png)