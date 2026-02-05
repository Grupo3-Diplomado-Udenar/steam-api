/**
 * Mensajes de error comunes
 */
export const ErrorMessages = {
    NOT_FOUND: (entity: string, id: string | number) => `${entity} con ID ${id} no encontrado`,
    ALREADY_EXISTS: (entity: string, field: string) => `${entity} con ${field} ya existe`,
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    UNAUTHORIZED: 'No autorizado',
    FORBIDDEN: 'Acceso denegado',
    VALIDATION_ERROR: 'Error de validación',
} as const;

/**
 * Mensajes de éxito comunes
 */
export const SuccessMessages = {
    CREATED: (entity: string) => `${entity} creado exitosamente`,
    UPDATED: (entity: string) => `${entity} actualizado exitosamente`,
    DELETED: (entity: string) => `${entity} eliminado exitosamente`,
} as const;

/**
 * Configuración de validación
 */
export const ValidationConfig = {
    PASSWORD_MIN_LENGTH: 6,
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 255,
    PHONE_MAX_LENGTH: 20,
    DESCRIPTION_MAX_LENGTH: 500,
    URL_MAX_LENGTH: 255,
} as const;
