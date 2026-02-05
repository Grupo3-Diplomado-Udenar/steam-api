/**
 * Estado de entidades del sistema
 */
export enum EntityStatus {
    ACTIVE = 'ACTIVA',
    INACTIVE = 'INACTIVA',
    SUSPENDED = 'SUSPENDIDA',
    PENDING = 'PENDIENTE',
}

/**
 * Estado de postulaciones
 */
export enum ApplicationStatus {
    PENDING = 'PENDIENTE',
    ACCEPTED = 'ACEPTADA',
    REJECTED = 'RECHAZADA',
    IN_REVIEW = 'EN_REVISION',
    WITHDRAWN = 'RETIRADA',
}

/**
 * Tipos de identificación
 */
export enum IdentificationType {
    CC = 'CC', // Cédula de Ciudadanía
    TI = 'TI', // Tarjeta de Identidad
    CE = 'CE', // Cédula de Extranjería
    PASSPORT = 'PASAPORTE',
    NIT = 'NIT', // Número de Identificación Tributaria
}

/**
 * Niveles académicos
 */
export enum AcademicLevel {
    TECHNICAL = 'Técnico',
    TECHNOLOGICAL = 'Tecnológico',
    UNDERGRADUATE = 'Pregrado',
    SPECIALIZATION = 'Especialización',
    MASTERS = 'Maestría',
    DOCTORATE = 'Doctorado',
}

/**
 * Estado de estudiante-carrera
 */
export enum StudentCareerStatus {
    ACTIVE = 'ACTIVO',
    GRADUATED = 'GRADUADO',
    WITHDRAWN = 'RETIRADO',
    SUSPENDED = 'SUSPENDIDO',
    ON_LEAVE = 'EN_PAUSA',
}
